import { ApplicantCard } from "services/resumesApi/models";

export const educationDataValidation = (data: ApplicantCard) => {
  if (data.education?.length) {
    return !data.education.map(item => {
        if (item?.method === "education") {
          if (item.educationType === "secondary_specialized" || item.educationType === "secondary") {
            if ((item.universityName?.trim() != null && item.universityName != "") ? item.universityName?.trim() === "" : false) {
              return true;
            }
            if ((item.faculty?.trim() != null && item.faculty != "") ? item.faculty?.trim() === "" : false) {
              return true;
            }
            if ((item.specialization?.trim() != null && item.faculty != "") ? item.faculty?.trim() === "" : false) {
              return true;
            }
            return false;
          } else {
            if ((item.educationType !== "" && item.educationType != null) || (item.universityName !== "" && item.universityName != null)
              || (item.faculty != null && item.faculty !== "") || (item.endYear !== "" && item.endYear != null)) {
              if (item.universityName?.trim() === "") {
                return true;
              }
              if ((item.faculty?.trim() != null && item.faculty != "") ? item.faculty?.trim() === "" : false) {
                return true;
              }
              if ((item.specialization?.trim() != null && item.faculty != "") ? item.faculty?.trim() === "" : false) {
                return true;
              }
              return !(item.educationType !== "" && item.universityName !== "" && item.endYear != null
                && item.educationType != null && item.universityName != null);
            } else {
              return false;
            }
          }
        } else {
          if ((item.organization !== "" && item.organization != null) || (item.universityName !== "" && item.universityName != null) || (item.endYear != null && item.endYear !== "")) {
            if (item.universityName?.trim() === "") {
              return true;
            }
            if (item.organization?.trim() === "") {
              return true;
            }
            return !((item.organization !== "" && item.organization != null) && (item.universityName !== "" && item.universityName != null) && (item.endYear != null && item.endYear !== ""));
          } else {
            return false;
          }
        }
      }
    ).includes(true);
  } else {
    return false;
  }
};