import { MutableRefObject } from 'react'

const OFFSET_FROM_PARENT = 10

export const getLeftPosition = (
  parentRef: MutableRefObject<HTMLElement | null>,
  isMonth?: boolean
) => {
  const parentOffsetLeft = parentRef?.current?.parentElement?.offsetLeft!

  const parentOffsetWidth = parentRef?.current?.offsetWidth!

  if (isMonth) return parentOffsetLeft - parentOffsetWidth + OFFSET_FROM_PARENT

  return parentOffsetLeft + parentOffsetWidth  + OFFSET_FROM_PARENT
}