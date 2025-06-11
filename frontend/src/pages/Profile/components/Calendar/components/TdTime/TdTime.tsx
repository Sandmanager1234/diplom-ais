import React from "react";
import styles from "./TdTime.module.css";

interface ITdTime {
  countMeeting: number;
}

export const TdTime: React.FC<ITdTime> = ({ countMeeting }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.countEvents}>
        {countMeeting} <br />
        событий
      </div>
      <div className={styles.rowText}><span>9:00</span></div>
      <div className={styles.rowText}><span>10:00</span></div>
      <div className={styles.rowText}><span>11:00</span></div>
      <div className={styles.rowText}><span>12:00</span></div>
      <div className={styles.rowText}><span>13:00</span></div>
      <div className={styles.rowText}><span>14:00</span></div>
      <div className={styles.rowText}><span>15:00</span></div>
      <div className={styles.rowText}><span>16:00</span></div>
      <div className={styles.rowText}><span>17:00</span></div>
      <div className={styles.rowText}><span>18:00</span></div>
    </div>
  );
};
