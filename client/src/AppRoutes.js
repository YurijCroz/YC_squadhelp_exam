import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AuthRoleHoc from "./hoc/AuthRoleHoc";
import OnlyNotAuthorizedUserHoc from "./hoc/OnlyNotAuthorizedUserHoc";
import Spinner from "./components/Spinner/Spinner";
import CONSTANTS from "./constants";

const {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  CUSTOMER,
  CREATOR,
  MODER,
} = CONSTANTS;

const Home = lazy(() => import("./pages/Home/Home"));
const EventPage = lazy(() => import("./pages/EventPage/EventPage"));
const HowItWorks = lazy(() => import("./pages/HowItWorks/HowItWorks"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const StartContestPage = lazy(() =>
  import("./pages/StartContestPage/StartContestPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const ContCreatPage = lazy(() =>
  import("./pages/ContestCreation/ContestCreationPage")
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ContestPage = lazy(() => import("./pages/ContestPage/ContestPage"));
const ContestForModer = lazy(() =>
  import("./pages/ContestPage/ContestPageForModerator")
);
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="appSpinner">
          <Spinner />
        </div>
      }
    >
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
          component={AuthRoleHoc(ContCreatPage, [CUSTOMER], {
            contestType: NAME_CONTEST,
            title: "Company Name",
          })}
        />
        <Route
          exact
          path="/startContest/taglineContest"
          component={AuthRoleHoc(ContCreatPage, [CUSTOMER], {
            contestType: TAGLINE_CONTEST,
            title: "TAGLINE",
          })}
        />
        <Route
          exact
          path="/startContest/logoContest"
          component={AuthRoleHoc(ContCreatPage, [CUSTOMER], {
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
          component={AuthRoleHoc(ContestForModer, [MODER])}
        />
        <Route
          exact
          path="/account"
          component={AuthRoleHoc(UserProfile, [CUSTOMER, CREATOR, MODER])}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
