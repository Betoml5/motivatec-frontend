import { REGEX_CONTROL_NUMBER } from "./consts";

export const validateSurvey = (questions) => {
  let isValid = true;

  if (questions.length < 28) {
    isValid = false;
  }

  return isValid;
};

const regex = new RegExp(REGEX_CONTROL_NUMBER);

export const validateStudentControlNumber = (controlNumber) => {
  if (!controlNumber || controlNumber.length !== 8) {
    return false;
  }
  return regex.test(controlNumber);
};

export const validateTeacherControlNumber = (controlNumber) => {
  if (!controlNumber || controlNumber.length !== 6) {
    return false;
  }
  return regex.test(controlNumber);
}
