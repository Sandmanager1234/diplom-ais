import { LoaderDots } from '../LoaderDots'

import style from './Loader.module.css'

const Loader = () => {
  return (
    <div className={style.loaderWrap}>
      <LoaderDots />
    </div>
  )
}

export default Loader
