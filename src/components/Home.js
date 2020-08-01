import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeText } from "../actions/appActions";
import styled from "styled-components";
const Web3 = require("web3");
const PROVIDER = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/6f8e7aa0b44943fd815f439b58334b67"
);
const web3 = new Web3(PROVIDER);

const Styles = styled.div`
  .homediv {
    margin-top: 10px;
  }
`;

const Home = ({ appState, changeText }) => {
  const changeWithReducer = async () => {
    const response = await web3.eth.getPastLogs({
      fromBlock: "latest",
      toBlock: "latest",
      address: ["0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"],
      topics: [
        "0xbcfc1ebc0df4a33c12c52256d42b59221c8eaf52c6d6382c4fba6914a556938f",
      ],
    });
    console.log(response);
  };
  return (
    <Styles>
      <div className="homediv">
        {appState.text}
        <br />
        <br />
        <div className="btn btn-success" onClick={changeWithReducer}>
          Fetch Data
        </div>
      </div>
    </Styles>
  );
};

Home.propTypes = {
  appState: PropTypes.object.isRequired,
  changeText: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.appStateReducer,
});

export default connect(mapStateToProps, { changeText })(Home);
