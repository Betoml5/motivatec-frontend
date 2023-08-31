import { ADVICES } from "../utils/consts";
export const getRandomAdvice = () => {
  const randomIndex = Math.floor(Math.random() * ADVICES.length);
  return ADVICES[randomIndex];
};
