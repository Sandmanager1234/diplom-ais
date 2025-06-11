export enum CURRENT_ACTION {
  DELETE = 'delete',
  EXIT = 'exit',
}

export const contentDependingOnAction = {
  [CURRENT_ACTION.DELETE]: {
    title: 'Удалить событие?',
    description:
      'Вы уверены, что хотите удалить событие? Все данные будут утеряны.',
  },
  [CURRENT_ACTION.EXIT]: {
    title: 'Выйти без сохранения?',
    description:
      'Вы уверены, что хотите выйти? Внесённые изменения не будут сохранены.',
  },
}
