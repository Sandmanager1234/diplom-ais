import React from 'react'

export interface ITitleProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'
  text?: string
  className?: string
}

export declare namespace TTitle {
  type Props = React.PropsWithChildren<ITitleProps>
  type FC = React.FC<Props>
}
