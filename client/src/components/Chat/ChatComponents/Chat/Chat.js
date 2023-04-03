import React, { useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import DialogListContainer from "../../DialogComponents/DialogListContainer/DialogListContainer";
import styles from "./Chat.module.sass";
import Dialog from "../../DialogComponents/Dialog/Dialog";
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from "../../../../actions/actionCreator";
import { chatController } from "../../../../api/ws/socketController";
import CONSTANTS from "../../../../constants";
import CatalogListContainer from "../../CatalogComponents/CatalogListContainer/CatalogListContainer";
import CatalogCreation from "../../CatalogComponents/CatalogCreation/CatalogCreation";
import CatalogListHeader from "../../CatalogComponents/CatalogListHeader/CatalogListHeader";
import ChatError from "../../../ChatError/ChatError";

const {
  NORMAL_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
} = CONSTANTS;

const Chat = ({
  chatStore: {
    isExpanded,
    isShow,
    isShowCatalogCreation,
    error,
    chatMode,
    isShowChatsInCatalog,
  },
  userStore: {
    data: { id },
  },
  changeShow,
  setChatPreviewMode,
  getPreviewChat,
}) => {
  useEffect(() => {
    chatController.subscribeChat(id);
    getPreviewChat();
    return () => {
      chatController.unsubscribeChat(id);
    };
  }, []);

  const renderDialogList = () => {
    const getButtonClassName = (mode) => {
      return classNames(styles.button, {
        [styles.activeButton]: chatMode === mode,
      });
    };
    const CatalogListComponent = isShowChatsInCatalog ? (
      <CatalogListHeader />
    ) : (
      <section className={styles.chatHeader}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
      </section>
    );
    const ButtonsContainerComponent = !isShowChatsInCatalog && (
      <section className={styles.buttonsContainer}>
        <button
          onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
          className={getButtonClassName(NORMAL_PREVIEW_CHAT_MODE)}
        >
          Normal
        </button>
        <button
          onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
          className={getButtonClassName(FAVORITE_PREVIEW_CHAT_MODE)}
        >
          Favorite
        </button>
        <button
          onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
          className={getButtonClassName(BLOCKED_PREVIEW_CHAT_MODE)}
        >
          Blocked
        </button>
        <button
          onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
          className={getButtonClassName(CATALOG_PREVIEW_CHAT_MODE)}
        >
          Catalog
        </button>
      </section>
    );
    const ChatListComponent =
      chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
        <CatalogListContainer />
      ) : (
        <DialogListContainer userId={id} />
      );

    return (
      <>
        {CatalogListComponent}
        {ButtonsContainerComponent}
        {ChatListComponent}
      </>
    );
  };

  return (
    <aside
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={getPreviewChat} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={id} /> : renderDialogList()}
      <button className={styles.toggleChat} onClick={changeShow}>
        {isShow ? "Hide Chat" : "Show Chat"}
      </button>
    </aside>
  );
};

const mapStateToProps = ({ chatStore, userStore }) => ({
  chatStore,
  userStore,
});

const mapDispatchToProps = {
  changeShow: changeChatShow,
  setChatPreviewMode: setPreviewChatMode,
  changeShowModeCatalog: changeShowModeCatalog,
  clearChatError: clearChatError,
  getPreviewChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
