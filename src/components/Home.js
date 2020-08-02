import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changeText,
  addToList,
  setStartAndEnd,
  setReceivedData,
} from "../actions/appActions";
import styled from "styled-components";
import worker from "./worker";
// import WebWorker from "./workerSetup";
import { Form, Button } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
const Web3 = require("web3");
const PROVIDER = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/6f8e7aa0b44943fd815f439b58334b67"
);
const web3 = new Web3(PROVIDER);
window.web3 = web3;

const Styles = styled.div`
  .homediv {
    margin-top: 10px;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: "",
      erc20Address: "",
      currentRunning: null,
    };
  }

  fetchDataInBackground = () => {
    this.worker.postMessage("Fetch Users");

    this.worker.addEventListener("message", (event) => {
      alert(event.data.length);
      this.setState({
        count: event.data.length,
      });
    });
  };

  componentDidMount = () => {
    this.worker = new Worker(worker);
  };

  handleChange = (event, field) => {
    event.preventDefault();
    this.setState({ [field]: event.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let latestBlock = null;
    const { appState } = this.props;
    try {
      const response = await web3.eth.getBlock("latest");
      latestBlock = response.number;
    } catch (err) {
      alert("Could not fetch latest block");
      return;
    }

    try {
      await web3.eth.getPastLogs({
        address: [this.state.erc20Address],
        topics: [
          [
            web3.utils.sha3("Transfer(address,address,uint256)"),
            // web3.utils.sha3("Transfer(address,address,uint256)"),
            web3.utils.sha3("Approval(address,address,uint256)"),
          ],
        ],
      });
    } catch (err) {
      if (err.message.indexOf("Provided address") != -1) {
        alert(err.message);
        return;
      }
    }

    try {
      this.setState({ currentlyRunning: true });
      const { storedData } = appState;
      let endingBlock = latestBlock;
      let startingBlock = latestBlock - 5000;
      if (storedData[`${this.state.userAddress}_${this.state.erc20Address}`]) {
        endingBlock =
          storedData[`${this.state.userAddress}_${this.state.erc20Address}`][
            "endingBlock"
          ];
        startingBlock =
          storedData[`${this.state.userAddress}_${this.state.erc20Address}`][
            "startingBlock"
          ];
      }
      const { setStartAndEnd, setReceivedData } = this.props;
      setStartAndEnd(
        startingBlock,
        endingBlock,
        this.state.userAddress,
        this.state.erc20Address
      );
      while (startingBlock > 1000000) {
        try {
          const response = await web3.eth.getPastLogs({
            fromBlock: startingBlock,
            toBlock: endingBlock,
            address: [this.state.erc20Address],
            topics: [
              [
                web3.utils.sha3("Transfer(address,address,uint256)"),
                // web3.utils.sha3("Transfer(address,address,uint256)"),
                web3.utils.sha3("Approval(address,address,uint256)"),
                // web3.utils.sha3("Approval(address,address,uint256)"),
              ],
            ],
          });
          // console.log(response);
          setReceivedData(
            startingBlock,
            endingBlock,
            this.state.userAddress,
            this.state.erc20Address,
            response
          );
          endingBlock = startingBlock;
          startingBlock = endingBlock - 5000;
          setStartAndEnd(
            startingBlock,
            endingBlock,
            this.state.userAddress,
            this.state.erc20Address
          );
        } catch (err) {}

        // if (
        //   storedData[this.state.userAddress] &&
        //   storedData[this.state.userAddress]["data"].length >= 5000
        // ) {
        //   break;
        // }
      }

      this.setState({ currentlyRunning: false });
    } catch (err) {
      this.setState({ currentlyRunning: false });
      console.log(err);
    }
  };

  render() {
    const { appState } = this.props;
    let startingBlock = null;
    let endingBlock = null;
    let data = [];
    let datatable = {
      columns: [
        {
          label: "Address",
          field: "address",
        },
        {
          label: "Block Hash",
          field: "blockhash",
        },
        {
          label: "Block Number",
          field: "blocknumber",
        },
      ],
      rows: [],
    };
    if (
      appState.storedData &&
      appState.storedData[
        `${this.state.userAddress}_${this.state.erc20Address}`
      ] &&
      appState.storedData[
        `${this.state.userAddress}_${this.state.erc20Address}`
      ]["startingBlock"]
    ) {
      startingBlock =
        appState.storedData[
          `${this.state.userAddress}_${this.state.erc20Address}`
        ]["startingBlock"];
      endingBlock =
        appState.storedData[
          `${this.state.userAddress}_${this.state.erc20Address}`
        ]["endingBlock"];
      data =
        appState.storedData[
          `${this.state.userAddress}_${this.state.erc20Address}`
        ]["data"];
      datatable =
        appState.datatable[
          `${this.state.userAddress}_${this.state.erc20Address}`
        ];
    }
    return (
      <Styles>
        <div className="homediv">
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>User's ETH Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter address"
                value={this.state.userAddress}
                onChange={(e) => this.handleChange(e, "userAddress")}
                disabled={this.state.currentlyRunning}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAssetAddress">
              <Form.Label>Desired ERC20 Token Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Address"
                value={this.state.erc20Address}
                onChange={(e) => this.handleChange(e, "erc20Address")}
                disabled={this.state.currentlyRunning}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={this.state.currentlyRunning}
            >
              Submit
            </Button>
          </Form>
          <br />
          {startingBlock && endingBlock && this.state.currentlyRunning && (
            <span>
              <b>{`Currently Scanning blocks: ${startingBlock}-${endingBlock}`}</b>
            </span>
          )}
          <br />
          <span>
            <b>Total Transactions Found: {data.length}</b>
          </span>
          <MDBDataTableV5
            hover
            entriesOptions={[25, 50, 100]}
            entries={25}
            data={datatable}
          />
        </div>
      </Styles>
    );
  }
}

Home.propTypes = {
  appState: PropTypes.object.isRequired,
  changeText: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
  setStartAndEnd: PropTypes.func.isRequired,
  setReceivedData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.appStateReducer,
});

export default connect(mapStateToProps, {
  addToList,
  changeText,
  setStartAndEnd,
  setReceivedData,
})(Home);
