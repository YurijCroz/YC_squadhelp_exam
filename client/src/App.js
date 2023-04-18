import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Payment from "./pages/Payment/Payment";
import StartContestPage from "./pages/StartContestPage/StartContestPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthRoleHoc from "./hoc/AuthRoleHoc";
import NotFound from "./components/NotFound/NotFound";
import Home from "./pages/Home/Home";
import OnlyNotAuthorizedUserHoc from "./hoc/OnlyNotAuthorizedUserHoc";
import ContestPage from "./pages/ContestPage/ContestPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import ContestCreationPage from "./pages/ContestCreation/ContestCreationPage";
import CONSTANTS from "./constants";
import browserHistory from "./browserHistory";
import ChatContainer from "./components/Chat/ChatComponents/ChatContainer/ChatContainer";
import EventPage from "./pages/EventPage/EventPage";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import ContestPageForModerator from "./pages/ContestPage/ContestPageForModerator";
import NotificationContainer from "./components/Notification/NotificationContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  CUSTOMER,
  CREATOR,
  MODER,
} = CONSTANTS;

function App() {
  return (
    <Router history={browserHistory}>
      <Header />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          component={OnlyNotAuthorizedUserHoc(LoginPage)}
        />
        <Route
          exact
          path="/registration"
          component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
        />
        <Route
          exact
          path="/payment"
          component={AuthRoleHoc(Payment, [CUSTOMER])}
        />
        <Route
          exact
          path="/startContest"
          component={AuthRoleHoc(StartContestPage, [CUSTOMER])}
        />
        <Route
          exact
          path="/events"
          component={AuthRoleHoc(EventPage, [CUSTOMER])}
        />
        <Route exact path="/how-it-works" component={HowItWorks} />
        <Route
          exact
          path="/startContest/nameContest"
          component={AuthRoleHoc(ContestCreationPage, [CUSTOMER], {
            contestType: NAME_CONTEST,
            title: "Company Name",
          })}
        />
        <Route
          exact
          path="/startContest/taglineContest"
          component={AuthRoleHoc(ContestCreationPage, [CUSTOMER], {
            contestType: TAGLINE_CONTEST,
            title: "TAGLINE",
          })}
        />
        <Route
          exact
          path="/startContest/logoContest"
          component={AuthRoleHoc(ContestCreationPage, [CUSTOMER], {
            contestType: LOGO_CONTEST,
            title: "LOGO",
          })}
        />
        <Route
          exact
          path="/dashboard"
          component={AuthRoleHoc(Dashboard, [CUSTOMER, CREATOR, MODER])}
        />
        <Route
          exact
          path="/dashboard/contest/:id"
          component={AuthRoleHoc(ContestPage, [CUSTOMER, CREATOR])}
        />
        <Route
          exact
          path="/dashboard/moderation-contest/:id"
          component={AuthRoleHoc(ContestPageForModerator, [MODER])}
        />
        <Route
          exact
          path="/account"
          component={AuthRoleHoc(UserProfile, [CUSTOMER, CREATOR, MODER])}
        />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
      <Footer />
    </Router>
  );
}

export default App;
