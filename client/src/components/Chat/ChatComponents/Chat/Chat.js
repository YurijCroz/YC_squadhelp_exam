import React from "react";
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

class Chat extends React.Component {
  componentDidMount() {
    chatController.subscribeChat(this.props.userStore.data.id);
    this.props.getPreviewChat();
  }

  componentWillUnmount() {
    chatController.unsubscribeChat(this.props.userStore.data.id);
  }

  renderDialogList = () => {
    const { setChatPreviewMode } = this.props;
    const { chatMode, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    const {
      NORMAL_PREVIEW_CHAT_MODE,
      FAVORITE_PREVIEW_CHAT_MODE,
      BLOCKED_PREVIEW_CHAT_MODE,
      CATALOG_PREVIEW_CHAT_MODE,
    } = CONSTANTS;
    return (
      <>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <section className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </section>
        )}
        {!isShowChatsInCatalog && (
          <section className={styles.buttonsContainer}>
            <button
              onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
              })}
            >
              Normal
            </button>
            <button
              onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE,
              })}
            >
              Favorite
            </button>
            <button
              onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
              })}
            >
              Blocked
            </button>
            <button
              onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
              })}
            >
              Catalog
            </button>
          </section>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </>
    );
  };

  render() {
    const { isExpanded, isShow, isShowCatalogCreation, error } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { changeShow, getPreviewChat } = this.props;
    return (
      <aside
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChat} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <button className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? "Hide Chat" : "Show Chat"}
        </button>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
