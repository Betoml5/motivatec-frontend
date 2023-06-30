import { DateTime } from "luxon";

const calculateTimeSinceCreation = (date) => {
  if (!date) {
    return "No hay fecha";
  }
  if (date === "Invalid DateTime") {
    return "No hay fecha";
  }

  const currentDate = DateTime.now();
  const dateFormatted = DateTime.fromFormat(date, "dd-MM-yyyy HH:mm:ss");

  const diff = currentDate.diff(dateFormatted);

  if (diff.as("minutes") < 60) {
    return Math.floor(diff.as("minutes")) + " minutos";
  } else if (diff.as("hours") < 24) {
    if (diff.as("hours") < 2) {
      return Math.floor(diff.as("hours")) + " hora";
    }
    return Math.floor(diff.as("hours")) + " horas";
  } else if (diff.as("days") < 30) {
    return Math.floor(diff.as("days")) + " días";
  } else if (diff.as("months") < 12) {
    return Math.floor(diff.as("months")) + " meses";
  } else {
    return Math.floor(diff.as("years")) + " años";
  }
};

export { calculateTimeSinceCreation };
