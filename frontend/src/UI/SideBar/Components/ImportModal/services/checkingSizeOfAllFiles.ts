import { SizeValidtion } from '../data/models'

const MAX_SIXE_OF_ALL_FILES = 10 * 1024 * 1024

export const checkingSizeOfAllFiles = (allFiles: File[]) => {
  const sum = allFiles.reduce((sum, item) => sum + item.size, 0)

  if (sum > MAX_SIXE_OF_ALL_FILES) return SizeValidtion.ExceededSize
  else return SizeValidtion.AcceptableSize
}
