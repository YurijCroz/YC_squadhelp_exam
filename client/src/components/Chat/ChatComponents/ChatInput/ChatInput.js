import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { sendMessageAction } from "../../../../actions/actionCreator";
import styles from "./ChatInput.module.sass";
import CONSTANTS from "../../../../constants";
import FormInput from "../../../FormInput/FormInput";
import Schems from "../../../../validators/validationSchems";

const ChatInput = () => {
  const interlocutor = useSelector((state) => state.chatStore.interlocutor);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      sendMessageAction({
        messageBody: values.message,
        recipient: interlocutor.id,
        interlocutor: interlocutor,
      })
    );
    resetForm();
  };

  const containerClasses = {
    container: styles.container,
    input: styles.input,
    notValid: styles.notValid,
  };

  const sendIconSrc = `${CONSTANTS.STATIC_IMAGES_PATH}send.png`;

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ message: "" }}
        validationSchema={Schems.MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            placeholder="Type your message here..."
            classes={containerClasses}
          />
          <button type="submit">
            <img src={sendIconSrc} alt="send Message" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;
