export const validateSurvey = (questions) => {
  let isValid = true;

  if (questions.length < 28) {
    isValid = false;
  }

  return isValid;
};
