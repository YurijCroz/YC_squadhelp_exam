import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCatalogList,
  removeChatFromCatalog,
} from "../../../../actions/actionCreator";
import CatalogList from "../CatalogList/CatalogList";
import DialogList from "../../DialogComponents/DialogList/DialogList";

const CatalogListContainer = ({
  chatStore,
  userStore,
  getCatalogList,
  removeChatFromCatalog,
}) => {
  useEffect(() => {
    getCatalogList();
  }, []);

  const handleRemoveChatFromCatalog = (event, chatId) => {
    const { id } = chatStore.currentCatalog;
    removeChatFromCatalog({ chatId, catalogId: id });
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = chatStore;
    const { chats } = currentCatalog;
    const dialogsInCatalog = messagesPreview.filter((preview) =>
      chats.includes(preview.id)
    );
    return dialogsInCatalog;
  };

  const { catalogList, isShowChatsInCatalog } = chatStore;
  const { id } = userStore.data;

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={handleRemoveChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  chatStore: state.chatStore,
  userStore: state.userStore,
});

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
