import {useEffect, useState, FC, useRef} from "react";

import {Pagination, Modal, Icon} from "UI"
import { useAppDispatch, useAppSelector } from 'store'

import { CreatingTasks, TaskCard } from "./Components";
import { setContent, setFilterTask, setPagination, setSortTask } from "../../../../store/slices/taskSlice";
import {taskApi} from "../../../../services/taskApi/taskApi";
import {useClickOutside} from "hooks";

import styles from "./Tasks.module.css";

export const Tasks: FC = () => {

  const { pagination, content, activeFilterTask, sortTask } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const [isActive, setActive] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const open = () => setActive(true)

  const close = () =>  setActive(false)

  useClickOutside(ref, close, 'mousedown')

  const tasksStatus = [
    { name: "Новые", status: "FRESHLY" },
    { name: "В работе", status: "PROCESS" },
    { name: "Завершенные", status: "COMPLETED" }
  ];

  const tasksPriority = [
    { name: "По умолчанию", status: "", image: <Icon.SortDescending /> },
    { name: "По возрастанию", status: "asc", image: <Icon.SortAscending /> },
    { name: "По убыванию", status: "desc", image: <Icon.SortDescending /> }
  ];

  const [activeTaskCreationWindow, setActiveTaskCreationWindow] = useState(false);
  const [sortingValue, setSortingValue] = useState(tasksPriority[0]);

  const openActiveTaskCreationWindow = () => setActiveTaskCreationWindow(true)

  const closeActiveTaskCreationWindow = () =>  setActiveTaskCreationWindow(false)

  useEffect(() => {
    !sortingValue.status ? dispatch(setSortTask("")) : dispatch(setSortTask(`&sort=priority,${sortingValue.status}`));
  }, [sortingValue.status]);

  useEffect(() => {
    taskApi.getTasks(`page=${pagination?.number}&size=${pagination?.size || 10}&status=${activeFilterTask}${sortTask}`).then(res => {
      const { content, totalPages, totalElements, size, number } = res.data;
      dispatch(setContent(content));
      dispatch(setPagination({ totalPages, totalElements, size, number }));
    });
  }, [pagination?.number, pagination?.size, sortTask, activeFilterTask]);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        Список задач
        <span>{pagination.totalElements || "пуст"}</span>
      </div>
      <div className={styles.wrapSortFilter}>
        <div className={styles.filters}>
          {tasksStatus?.map((task, index) => (
            <button
              key={index}
              disabled={activeFilterTask == task.status}
              className={activeFilterTask == task.status ? styles.activeFilter : styles.unActiveFilter}
              onClick={() => {
                dispatch(setFilterTask(task.status));
                dispatch(setPagination({ number: 0, size: 10 }));
              }
              }
            >
              {task.name}
            </button>
          ))}
        </div>
        <button
            ref={ref}
          disabled={!pagination?.totalElements}
          onClick={open}
          className={styles.sort}
        >
          <div
            className={!sortingValue.name.includes("умолчанию") ? styles.imageActive : styles.image}
          >
            {sortingValue.image}
          </div>
          По приоритету
          {isActive &&
            <div className={styles.wrapSorting}>
              {tasksPriority.map((priority, index) => (
                <button
                  key={index}
                  className={priority.name === sortingValue.name && !sortingValue.name.includes("умолчанию") ? styles.activePriorityValue : styles.priorityValue}
                  onClick={() => setSortingValue(priority)}
                >
                  {priority.image}
                  {priority.name}
                </button>
              ))
              }
            </div>
          }
        </button>
      </div>
      <div className={styles.wrapList}>
        {content.map((item) =>
          (
            <TaskCard key={item.id} {...item} />
          )
        )}
        <button
          onClick={openActiveTaskCreationWindow}
          className={styles.btnCreateTask}
        >
          Создать задачу
        </button>
        {pagination?.totalElements ?
          <Pagination
            type={"Tasks"}
            isActiveFilter={activeFilterTask}
            size={pagination?.size}
            currentPage={pagination?.number}
            totalPages={pagination?.totalPages}
            totalElements={pagination?.totalElements}
          />
          : null
        }
      </div>
      <Modal open={activeTaskCreationWindow} closeModal={closeActiveTaskCreationWindow}>
        <CreatingTasks active={activeTaskCreationWindow} data={null} setActive={setActiveTaskCreationWindow} />
      </Modal>
    </div>
  );
};
