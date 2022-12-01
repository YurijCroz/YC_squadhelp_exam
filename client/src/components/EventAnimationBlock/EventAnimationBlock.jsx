import React, { useEffect, useState } from "react";
import { format, addSeconds, differenceInSeconds } from "date-fns";
import styles from "./EventAnimationBlock.module.sass";

function EventAnimationBlock({ event, setIsFetching }) {
  const [totalSeconds, setTotalSeconds] = useState(
    differenceInSeconds(new Date(event.deadLine), new Date(event.startDate))
  );
  const [nowDate, setNowDate] = useState(new Date());
  const [isRun, setIsRun] = useState(false);

  const regFormat = "yyyy-MM-dd HH:mm";
  const regFormatDis = "yyyy MM dd HH mm ss";

  const reset = () => {
    setIsFetching(true);
    setIsRun(false);
  };

  const getTimeFormat = (time) => {
    const nominal = ["2000", "1", "1", "0", "0", "0"];
    const timeArr = format(new Date(2000, 0, 1, 0, 0, time), regFormatDis)
      .split(" ")
      .map((el, i) => el - nominal[i]);
    return timeArr;
  };

  useEffect(() => {
    let interval;
    if (isRun) {
      interval = setInterval(() => {
        setNowDate(addSeconds(nowDate, 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    format(new Date(nowDate), regFormat) ===
    format(new Date(event.deadLine), regFormat)
      ? reset()
      : setIsRun(true);
  });

  const percentWidth =
    (100 / totalSeconds) *
    differenceInSeconds(new Date(event.deadLine), nowDate);

  const timeArr = getTimeFormat(
    differenceInSeconds(new Date(event.deadLine), nowDate)
  );

  return (
    <div className={styles.animationBlock}>
      <div className={styles.worm} style={{ width: `${percentWidth}%` }}></div>
      <p className={styles.title}>{event.title}</p>
      <p>
        {(timeArr[0] !== 0 ? `${timeArr[0]}year ` : "") +
          (timeArr[1] !== 0 ? `${timeArr[1]}month ` : "") +
          (timeArr[2] !== 0 ? `${timeArr[2]}d ` : "") +
          (timeArr[3] !== 0 ? `${timeArr[3]}h ` : "") +
          (timeArr[4] !== 0 ? `${timeArr[4]}m ` : "") +
          `${timeArr[5]}s`}
      </p>
    </div>
  );
}

export default EventAnimationBlock;
