import VacancyCard from "./components/VacancyCard/VacancyCard"

const propsList = {
  id: 0,
  title: 'Программист Java',
  jobTitle: 'Java-разработчик',
  branches: [{}],
  grades: [{}],
  isOpen: true,
  employmentType: 'Частичная занятость',
  formatOfWork: 'Удаленно',
  scheduleType: '5/2'
}

const Vacancies = () => {
  return (
    <>
    <VacancyCard vacancyData={propsList} />
    </>
  )
}

export default Vacancies