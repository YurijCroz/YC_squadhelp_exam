import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserAction } from "../../actions/actionCreator";
import Spinner from "../Spinner/Spinner";

const PrivateHoc = (Component, props) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  const Hoc = ({ data, isFetching, getUser, history, match }) => {
    useEffect(() => {
      if (!data) {
        getUser(history.replace);
      }
    }, []);

    if (isFetching) {
      return <Spinner />;
    }

    return data ? (
      <Component history={history} match={match} {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
