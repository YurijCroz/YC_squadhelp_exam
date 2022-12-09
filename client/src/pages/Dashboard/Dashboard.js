import React from "react";
import { connect } from "react-redux";
import CONSTANTS from "../../constants";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashboard";
import CreatorDashboard from "../../components/CreatorDashboard/CreatorDashboard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Dashboard = (props) => {
  const { role, history } = props;
  return (
    <>
      <Header />
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : (
        <CreatorDashboard history={history} match={props.match} />
      )}
      <Footer/>
    </>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
