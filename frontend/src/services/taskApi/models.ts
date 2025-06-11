export interface ITask {
    id: string,
    name: string,
    description: string,
    priorityValue: 'HIGH' | 'MIDDLE' | 'LOW',
    priorityDescription: string,
    emailAuthor: string,
    authorFio: string,
    emailExecutor: string,
    fioExecutor: string,
    taskStatusValue: string,
    taskStatusDescription: string,
    timeCreate: string,
    dateTask: string,
    actions: {
        canCreateTask: boolean,
        canViewTask: boolean,
        canEditTask: boolean,
        canDeleteTask: boolean,
        canStartTask: boolean,
        canCompleteTask: boolean,
        canCancelTask: boolean,
        taskId: string
    }
}