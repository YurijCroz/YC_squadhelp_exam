import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { controller } from "../../api/ws/socketController";

function NotificationConnect({ data }) {
  useEffect(() => {
    controller.subscribe(data.id);
    return () => {
      controller.unsubscribe(data.id);
    };
  }, []);

  return (
    data && (
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    )
  );
}

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(NotificationConnect);
