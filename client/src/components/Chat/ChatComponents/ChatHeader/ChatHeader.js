import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from "../../../../actions/actionCreator";
import styles from "./ChatHeader.module.sass";
import CONSTANTS from "../../../../constants";

const ChatHeader = ({
  interlocutor,
  backToDialogList,
  chatData,
  userId,
  changeChatFavorite,
  changeChatBlock,
}) => {
  const changeFavorite = (data, event) => {
    changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };

  const isBlocked = (chatData, userId) => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  return (
    <section className={styles.chatHeader}>
      <div className={styles.buttonContainer}>
        <i
          className="fas fa-long-arrow-alt-left"
          onClick={() => backToDialogList()}
        />
      </div>
      <section className={styles.infoContainer}>
        <section>
          <img
            src={`${CONSTANTS.PUBLIC_URL}images_avatar/${interlocutor.avatar}`}
            alt="user"
          />
          <span>{interlocutor.firstName}</span>
        </section>
        {chatData && (
          <section>
            <i
              onClick={(event) =>
                changeFavorite(
                  {
                    participants: chatData.participants,
                    favoriteFlag: !isFavorite(chatData, userId),
                  },
                  event
                )
              }
              className={classnames({
                "far fa-heart": !isFavorite(chatData, userId),
                "fas fa-heart": isFavorite(chatData, userId),
              })}
            />
            <i
              onClick={(event) =>
                changeBlackList(
                  {
                    participants: chatData.participants,
                    blackListFlag: !isBlocked(chatData, userId),
                  },
                  event
                )
              }
              className={classnames({
                "fas fa-user-lock": !isBlocked(chatData, userId),
                "fas fa-unlock": isBlocked(chatData, userId),
              })}
            />
          </section>
        )}
      </section>
    </section>
  );
};

const mapStateToProps = ({ chatStore: { interlocutor, chatData } }) => ({
  interlocutor,
  chatData,
});

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
