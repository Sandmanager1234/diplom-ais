import { APIWithToken } from '../api'
import {ITask} from "./models";


export const taskApi = {
  async getTasks(params: string) {
    return await APIWithToken.get(`/tasks?${params}`).then(res => res)
  },
  async addTask(body: ITask) {
    return await APIWithToken.put('/tasks', body)
  },
  async editTaskStatus(taskId: string, status: string) {
    return await APIWithToken.put(`/tasks/${taskId}/to-${status}`)
  },
    async deleteTask(taskId: string) {
      return await APIWithToken.delete(`/tasks/${taskId}`)
    }
}
