import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import { Icon } from "UI";

import { CreateResumeStep } from '../../data/models';

import styles from "./Header.module.css";

interface IHeader {
  activeStep: CreateResumeStep[];
  setActiveStep: React.Dispatch<CreateResumeStep[]>;
  currentRef: any;
}

export const Header: React.FC<IHeader> = (props) => {
  const { activeStep, setActiveStep, currentRef } = props;

  let activePage = 1;

  activeStep.map((item) => (item.isActive ? (activePage = item.id + 1) : null));


  const fillingSteps = [
    { id: 1, name: "Личные данные", component: "personalDataId", isActive: true },
    { id: 2, name: "Контакты", component: "contactId", isActive: false },
    { id: 3, name: "Специальность", component: "specialityId", isActive: false },
    { id: 4, name: "Опыт работы", component: "workExperienceId", isActive: false },
    { id: 5, name: "Образование", component: "educationId", isActive: false },
    { id: 6, name: "Владение языками", component: "languageId", isActive: false },
    { id: 7, name: "Другая информация", component: "", isActive: false },
    { id: 8, name: "Документы", component: "", isActive: false }
  ];

  const handlerActiveComponent = (id: number) => {
    if (activeStep[id - 1].isVisited && !activeStep[id - 1].isActive && (activePage < 7 ? currentRef.current.checkValidity() : true)) {
      setActiveStep(
        activeStep.map((step, index) =>
          index === id - 1
            ? { ...step, isActive: true }
            : {
              ...step,
              isActive: false
            }
        )
      );
    }
  };

  const location = useLocation();

  const { id } = useParams();

  return (
    <div className={styles.wrapHeader}>
      {location.pathname === "/new-resume" ?
        <div className={styles.pageDemo}>
          <NavLink className={styles.linkStyle} to={"/"}>Главная</NavLink> <Icon.ArrowChewronRight />
          <div className={styles.currentPage}>Создать резюме</div>
        </div>
        :
        <div className={styles.pageDemo}>
          <NavLink className={styles.linkStyle} to={"/"}>Главная</NavLink> <Icon.ArrowChewronRight />
          <NavLink className={styles.linkStyle} to={`/applicant/${id}`}>Резюме</NavLink> <Icon.ArrowChewronRight />
          <div className={styles.currentPage}>Редактировать резюме</div>
        </div>
      }
      <h1>{location.pathname === "/new-resume" ? "Создать резюме" : "Редактировать резюме"}</h1>
      <div className={styles.fillingSteps}>
        {fillingSteps.map((step) => (
          <button
            type={"submit"}
            className={step.id === activePage ? styles.stepWrapActive : styles.stepWrap}
            onClick={() => handlerActiveComponent(step.id)}
            key={step.id}
          >
            <div
              className={
              activeStep[step.id - 1].isError ? styles.ellipseError :
                step.id - 1 < activePage
                  ? styles.ellipseNumberActive
                  : styles.ellipseNumber
              }
            >
              {step.id}
            </div>
            <div className={step.id === activePage ? styles.activeStep : styles.nameStep}>
              {step.name}
            </div>
            {step.id !== 8 && <Icon.ArrowChewronRight />}
          </button>
        ))}
      </div>
    </div>
  );
};
