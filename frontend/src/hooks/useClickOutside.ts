import { MutableRefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null> ,
  callBack: (e:MouseEvent) => void,
  eventType:'click' | 'mousedown' = 'click' 
) => {
  useEffect(() => {
    const eventHandler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callBack(e)
      }
    }

    document.addEventListener(eventType, eventHandler)

    return () => {
      document.removeEventListener(eventType, eventHandler)
    }
  }, [callBack,ref])
}
