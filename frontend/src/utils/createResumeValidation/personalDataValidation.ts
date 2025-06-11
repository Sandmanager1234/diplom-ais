import { ApplicantCard } from "services/resumesApi/models";

export const personalDataValidation = (data: ApplicantCard) => {
  const {surname, name, patronym, city, country, region} =  data

  console.log(surname, name, patronym, country, region, city)

  const isValidSurname = surname && surname !== "" &&  /^[a-zA-Zа-яА-ЯёЁ]{2,}$/u.test(surname)
  const isValidName = name && name !== "" && /^[a-zA-Zа-яА-ЯёЁ]{2,}$/u.test(name)
  const isValidPatronym = patronym.trim() === "" || /[A-Za-zА-Яа-яЁё]{2,}/.test(patronym)
  const isValidCountry=country
  const isValidRegion=region
  const isValidCity = city

  if(isValidSurname && isValidName && isValidPatronym && isValidCountry && isValidRegion &&isValidCity){
    return true
  }
  else
  {
    return false
  }

};