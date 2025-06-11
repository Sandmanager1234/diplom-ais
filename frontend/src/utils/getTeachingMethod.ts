import { Education } from 'services/models'
import { Glossary } from 'types'

export const getTeachingMethod = (
  teaching: Education,
  glossary: Glossary
): string => {
  switch (teaching.method) {
    case 'education':
      return glossary['education-type'][teaching.educationType]
    case 'course':
      return 'Повышение квалификации, курсы'
    default:
      return 'Электронные сертификаты'
  }
}
