import { useNavigate, useRouteError } from 'react-router-dom'

import FigureUp from 'assets/images/figure_up.svg'
import FigureDown from 'assets/images/figure_down.svg'

import { errorText } from './data/constants'
import { ERROR_VARIANT } from './data/models'

import style from './BugCatcher.module.css'

type Props = {
  errorVariant?: ERROR_VARIANT
}

function BugCatcher({ errorVariant = ERROR_VARIANT.ERROR }: Props) {
  const error = useRouteError()
  console.error(error)

  const navigate = useNavigate()

  const isError = errorVariant === ERROR_VARIANT.ERROR

  const goToMain = () => {
    if (isError) {
      navigate(0)
    } else navigate(-1)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.infoWrap}>
        {!isError && <span className={style.title}>404</span>}
        <span className={style.description}>{errorText[errorVariant]}</span>
        <button onClick={goToMain} className={style.btn}>
          Вернуться назад
        </button>
      </div>
      <FigureUp className={style.figureUp} />
      <FigureDown className={style.figureDown} />
    </div>
  )
}

export default BugCatcher
