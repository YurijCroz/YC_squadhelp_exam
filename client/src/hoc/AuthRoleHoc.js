import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserAction } from "../actions/actionCreator";
import Spinner from "../components/Spinner/Spinner";

const AuthRoleHoc = (Component, allowedRoles = [], props = {}) => {
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

    if (!data) {
      return <Redirect to="/login" />;
    }

    if (allowedRoles.includes(data?.role)) {
      return <Component history={history} match={match} {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default AuthRoleHoc;
