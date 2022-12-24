import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CONSTANTS from "../../constants";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashboard";
import CreatorDashboard from "../../components/CreatorDashboard/CreatorDashboard";
import ModeratorDashboard from "../../components/ModeratorDashboard/ModeratorDashboard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Dashboard = ({ role, history, match }) => {
  const renderDashboard = () => {
    switch (role) {
      case CONSTANTS.CUSTOMER: {
        return <CustomerDashboard history={history} match={match} />;
      }
      case CONSTANTS.CREATOR: {
        return <CreatorDashboard history={history} match={match} />;
      }
      case CONSTANTS.MODER: {
        return <ModeratorDashboard history={history} match={match} />;
      }
      default: {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <>
      <Header />
      {renderDashboard()}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
