import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import moment from "moment";
import { getDiffInSec } from "../../../utils/utils";
import styles from "./EventAnimationBlock.module.sass";

const regFormat = "yyyy-MM-dd HH:mm";

function EventAnimationBlock({ event, setRebuild, deleteEvent }) {
  const [nowDate, setNowDate] = useState(new Date());
  const [isRun, setIsRun] = useState(true);

  const totalSeconds = getDiffInSec(event.deadLine, new Date(event.startDate));

  const stop = () => {
    setRebuild(true);
    setIsRun(false);
  };

  const getTimeFormatNew = (date) =>
    moment.duration(moment(event.deadLine).diff(moment(date)))._data;

  useEffect(() => {
    let interval;
    if (isRun) {
      interval = setInterval(() => {
        setNowDate(new Date());
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      setIsRun(false);
    };
  }, []);

  useEffect(() => {
    format(new Date(nowDate), regFormat) ===
    format(new Date(event.deadLine), regFormat)
      ? stop()
      : setIsRun(true);
  });

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
