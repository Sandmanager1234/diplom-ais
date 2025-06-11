import { CSSProperties, FC } from 'react'

type Props = {
  color: CSSProperties['color']
}

export const DotStatus: FC<Props> = ({ color }) => {
  return (
    <div
      style={{
        backgroundColor: `${color}`,
        width: `8px`,
        height: `8px`,
        borderRadius: `50px`,
      }}
    ></div>
  )
}
