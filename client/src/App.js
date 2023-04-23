import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import browserHistory from "./browserHistory";
import ChatContainer from "./components/Chat/ChatComponents/ChatContainer/ChatContainer";
import NotificationContainer from "./components/Notification/NotificationContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router history={browserHistory}>
      <Header />
      <NotificationContainer />
      <AppRoutes />
      <ChatContainer />
      <Footer />
    </Router>
  );
}

export default App;
