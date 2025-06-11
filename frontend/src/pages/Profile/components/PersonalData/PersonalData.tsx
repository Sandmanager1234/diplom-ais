import React, { useEffect, useState } from 'react'

import { Icon } from 'UI'
import { IUser } from '../../../../types/user'
import { phoneFormat } from '../../../../utils/phoneFormat'
import { useAppDispatch } from 'store'
import { setProfileHRMeeting } from '../../../../store/slices/meetingSlice'
import {
  setProfileEmailHR,
  setProfileHRTask,
} from '../../../../store/slices/taskSlice'
import styles from './PersonalData.module.css'
import { getInitials } from '../../../../utils/getInitials'
import { userApi } from '../../../../services/userApi/userApi'

export const PersonalData: React.FC = () => {
  const [profile, setProfile] = useState<IUser>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    userApi.getUser().then((res) => {
      setProfile(res)
      dispatch(setProfileHRTask(res))
      dispatch(setProfileHRMeeting(res))
    })
    userApi.getHRs().then((res) => {
      dispatch(setProfileEmailHR(res))
    })
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.avatar}>
        {profile?.fio ? getInitials(profile?.fio) : ''}
      </div>
      <div className={styles.name}>{profile?.fio}</div>
      {profile?.position ? (
        <div className={styles.position}>
          <Icon.UserDefault />
          {profile?.position}
        </div>
      ) : null}
      <div className={styles.contacts}>
        {profile?.mobilePhone ? (
          <div>
            <Icon.Phone />
            {phoneFormat(profile?.mobilePhone)}
          </div>
        ) : null}
        <div>
          <Icon.Mail />
          {profile?.email}
        </div>
      </div>
    </div>
  )
}
