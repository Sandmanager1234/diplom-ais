import { APIWithToken } from '../api'

export const importResumeApi = {
  async importApplicant(type: string, body: FormData, doubleSummary: boolean) {
    return await APIWithToken.post(
      `/applicants/import/${type}?doubleSummary=${doubleSummary}`,
      body,
      { withCredentials: true }
    )
  },
}
