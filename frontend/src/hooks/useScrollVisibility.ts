import { Dispatch, SetStateAction } from 'react'

import { throttleScroll } from 'utils/throttleScroll'
import { MINIMUM_SCROLLING_VALUE } from 'data/constants'

export const useScrollVisibility = (
  setShowBtn: Dispatch<SetStateAction<boolean>>
) => {
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > MINIMUM_SCROLLING_VALUE) {
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
  }

  const onScroll = throttleScroll(toggleVisible, 200)

  window.addEventListener('scroll', onScroll)

  return () => {
    window.removeEventListener('scroll', onScroll)
  }
}
