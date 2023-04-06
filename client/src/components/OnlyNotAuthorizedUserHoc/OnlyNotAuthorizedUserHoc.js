import React, { useEffect } from "react";
import { connect } from "react-redux";
import { onlyForNotAuthorize } from "../../actions/actionCreator";
import Spinner from "../Spinner/Spinner";

const OnlyNotAuthorizedUserHoc = (Component) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (data) => dispatch(onlyForNotAuthorize(data)),
  });

  const HocForLoginSignUp = ({ checkAuth, isFetching, data, history }) => {
    useEffect(() => {
      checkAuth(history.replace);
    }, []);

    if (isFetching) {
      return <Spinner />;
    }

    if (!data) {
      return <Component history={history} />;
    }

    return null;
  };

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
