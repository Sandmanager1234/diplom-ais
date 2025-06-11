import { ApplicantCard } from "services/resumesApi/models";

export const specialitylDataValidation = (data: ApplicantCard) => {
  if (data?.position && data?.position !== "") {
    return true;
  }
  return false;
};