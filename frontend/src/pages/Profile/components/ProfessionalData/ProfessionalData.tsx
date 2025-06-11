import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useClickOutside } from "hooks";

import { Icon } from "UI";

import { Tasks } from "../Tasks";
import { Calendar } from "../Calendar";

import styles from "./ProfessionalData.module.css";

export const ProfessionalData: React.FC = () => {

  const navigationLinkList = [
    { src: "/profile/calendar", title: "Календарь" },
    { src: "/profile/tasks", title: "Задачи" }
  ];

  const location = useLocation();

  const[showNotification,setShowNotification]=useState(false)

  const ref=useRef<HTMLDivElement>(null)

  const onChangeVisibilityOfNotification=(flag:boolean)=>()=>setShowNotification(flag)

  useClickOutside(ref,onChangeVisibilityOfNotification(false))

  return (
    <div className={styles.wrap}>
      <div className={styles.navigation}>
        <div className={styles.links}>
          {navigationLinkList.map((navigationLink, index) =>
            <NavLink
              key={index}
              to={`${navigationLink.src}`}
              className={({ isActive }) => (isActive ? styles.activeLink : styles.defaultLink)}
            >
              {navigationLink.title}
            </NavLink>
          )}
        </div>
        <button
          className={styles.notifications}
          onClick={onChangeVisibilityOfNotification(true)}
        >
        </button>
        {showNotification ?
          <div ref={ref} className={styles.notificationWrap}>
            <div className={styles.title}>Напоминание</div>
            <div className={styles.subTitle}>Интервью с аналитиком</div>
            <div className={styles.infoBlock}><Icon.ClockNotification />10:30 - 12:00, чт 13.10.2022</div>
            <div className={styles.infoBlock}><Icon.MapPin />Telegram</div>
            <div className={styles.controlBlock}>
              <button className={styles.btnRead}>Прочитано</button>
              <div>
                <button className={styles.btnArrow}><Icon.ArrowRight/></button>
                <button className={styles.btnArrow}><Icon.ArrowRight/></button>
              </div>
            </div>
          </div>
          : null
        }
      </div>
      <div className={styles.page}>
        {location.pathname == "/profile/calendar" && <Calendar />}
        {location.pathname == "/profile/tasks" && <Tasks />}
      </div>
    </div>
  );
};