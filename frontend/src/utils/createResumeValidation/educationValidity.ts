export function educationValidity(education){
  if (education.educationType === "secondary_specialized" || education.educationType === "secondary") {
    if ((education.universityName?.trim() != null && education.universityName != "") ? education.universityName?.trim() === "" : false) {
      return true;
    }
    if ((education.faculty?.trim() != null && education.faculty != "") ? education.faculty?.trim() === "" : false) {
      return true;
    }
    if ((education.specialization?.trim() != null && education.faculty != "") ? education.faculty?.trim() === "" : false) {
      return true;
    }
    return false;
  } else {
    if ((education.educationType !== "" && education.educationType != null) || (education.universityName !== "" && education.universityName != null)
      || (education.faculty != null && education.faculty !== "") || (education.endYear !== "" && education.endYear != null)) {
      if (education.universityName?.trim() === "") {
        return true;
      }
      if ((education.faculty?.trim() != null && education.faculty != "") ? education.faculty?.trim() === "" : false) {
        return true;
      }
      if ((education.specialization?.trim() != null && education.faculty != "") ? education.faculty?.trim() === "" : false) {
        return true;
      }
      return !(education.educationType !== "" && education.universityName !== "" && education.endYear != null
        && education.educationType != null && education.universityName != null);
    } else {
      return false;
    }
  }
}