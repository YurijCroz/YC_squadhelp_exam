import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CONSTANTS from "../../constants";
import CustomerDashboard from "../../components/DashboardComponents/CustomerDashboard/CustomerDashboard";
import CreatorDashboard from "../../components/DashboardComponents/CreatorDashboard/CreatorDashboard";
import ModeratorDashboard from "../../components/DashboardComponents/ModeratorDashboard/ModeratorDashboard";

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
      {renderDashboard()}
    </>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
