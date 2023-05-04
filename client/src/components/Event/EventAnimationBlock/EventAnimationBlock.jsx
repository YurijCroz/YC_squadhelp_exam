import React, { useEffect } from "react";
import { format } from "date-fns";
import moment from "moment";
import { getDiffInSec } from "../../../utils/utils";
import styles from "./EventAnimationBlock.module.sass";

const regFormat = "yyyy-MM-dd HH:mm";

function EventAnimationBlock({ event, nowDate, setRebuild, deleteEvent }) {
  const totalSeconds = getDiffInSec(event.deadLine, new Date(event.startDate));

  const getTimeFormatNew = (date) =>
    moment.duration(moment(event.deadLine).diff(moment(date)))._data;

  useEffect(() => {
    if (
      format(new Date(nowDate), regFormat) ===
      format(new Date(event.deadLine), regFormat)
    ) {
      setRebuild(true);
    }
  }, [nowDate]);

  const percentWidth =
    (100 / totalSeconds) * getDiffInSec(event.deadLine, nowDate);

  const timeDiff = getTimeFormatNew(nowDate);

  return (
    <div
      className={styles.animationBlock}
      onClick={() => deleteEvent(event.startDate, event.title)}
    >
      <div className={styles.worm} style={{ width: `${percentWidth}%` }}></div>
      <p className={styles.title}>{event.title}</p>
      <p>
        {(timeDiff.years !== 0 ? `${timeDiff.years}Y ` : "") +
          (timeDiff.months !== 0 ? `${timeDiff.months}M ` : "") +
          (timeDiff.days !== 0 ? `${timeDiff.days}d ` : "") +
          (timeDiff.hours !== 0 ? `${timeDiff.hours}h ` : "") +
          (timeDiff.minutes !== 0 ? `${timeDiff.minutes}m ` : "") +
          `${timeDiff.seconds}s`}
      </p>
    </div>
  );
}

export default EventAnimationBlock;
