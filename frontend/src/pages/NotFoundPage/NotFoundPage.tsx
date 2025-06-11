import BugCatcher from 'components/BugCatcher'

import { ERROR_VARIANT } from 'components/BugCatcher/data/models'

const NotFoundPage = () => {
  return (
    <>
      <BugCatcher errorVariant={ERROR_VARIANT.NOT_FOUND} />
    </>
  )
}

export default NotFoundPage
