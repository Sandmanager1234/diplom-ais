export function courseValidity(course){
  if ((course.organization !== "" && course.organization != null) || (course.universityName !== "" && course.universityName != null) || (course.endYear != null && course.endYear !== "")) {
    if (course.universityName?.trim() === "") {
      return true;
    }
    if (course.organization?.trim() === "") {
      return true;
    }
    return !((course.organization !== "" && course.organization != null) && (course.universityName !== "" && course.universityName != null) && (course.endYear != null && course.endYear !== ""));
  } else {
    return false;
  }
}