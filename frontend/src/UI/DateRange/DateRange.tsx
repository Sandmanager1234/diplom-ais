import React, { useState } from "react";
import styles from "./DateRange.module.css";

interface IDateRange {
  state: IState;
  setState: React.Dispatch<IState>;
}

interface IState {
  start: string | undefined;
  end: string | undefined;
}

export const DateRange: React.FC<IDateRange> = (props) => {

  const { state, setState } = props;

  const [focusDateEnd, setFocusDateEnd] = useState(false);

  return (
    <div className={styles.dateRange}>
      <span>Срок исполнения</span>
      <div className={styles.inputFields}>
        {state?.end?.length !== 0 && new Date(state?.end) < new Date() && focusDateEnd ?
          <div className={styles.error}> Срок исполнения задачи не должен быть меньше текущей даты.</div> : null}
        <input type="datetime-local" value={state?.end || ""}
               onBlur={() => setFocusDateEnd(true)}
               min={new Date(Date.now()).toString()}
               max={new Date(new Date(Date.now()).getFullYear() + 5, 1, 1).toString()}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState({
                 ...state,
                 end: e.target.value
               })} />
      </div>
    </div>
  );
};
