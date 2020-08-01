import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeText } from "../actions/appActions";
import styled from "styled-components";

const Styles = styled.div`
  .homediv {
    margin-top: 10px;
  }
`;

const Home = ({ appState, changeText }) => {
  const changeWithReducer = () => {
    changeText();
  };
  return (
    <Styles>
      <div className="homediv">
        {appState.text}
        <br />
        <br />
        <div className="btn btn-success" onClick={changeWithReducer}>
          Change Text
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
