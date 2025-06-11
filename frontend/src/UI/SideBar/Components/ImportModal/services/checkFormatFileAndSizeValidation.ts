import { FILE_FORMATS } from '../data/constants'
import { SizeValidtion } from '../data/models'

export const checkFormatFileAndSizeValidation = (file: File, sizeValidation: SizeValidtion) => {
  const conditionForUploading =
    FILE_FORMATS.includes(
      file.name.substring(file.name.lastIndexOf('.') + 1)
    ) && sizeValidation === SizeValidtion.AcceptableSize

  return conditionForUploading
}
