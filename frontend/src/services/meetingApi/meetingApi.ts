import { APIWithToken } from '../api'
import { IMeeting, PostMeetingData, UpdateMeetingData } from '../models'

export const meetingApi = {
  async create(body: PostMeetingData) {
    return await APIWithToken.post('/meetings', body)
  },
  async getMeeting(params: string): Promise<IMeeting[]> {
    const { data } = await APIWithToken.get(`/meetings?${params}`)
    return data
  },
  async addRecipientToMeeting(meetingId: string, email: string) {
    return await APIWithToken.put(`/meetings/${meetingId}/${email}`)
  },
  async deleteRecipientToMeeting(meetingId: string, email: string) {
    return await APIWithToken.delete(`/meetings/${meetingId}/${email}`)
  },
  async deleteMeeting(meetingId: string) {
    return await APIWithToken.delete(`/meetings/${meetingId}`)
  },
  async readMessage(body: any) {
    return await APIWithToken.post('/meetings/notice-meeting', body)
  },
  async updateMeeting(body: UpdateMeetingData) {
    return await APIWithToken.post('/meetings', body)
  },
}
