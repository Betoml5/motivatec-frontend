//format number to phone number

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  }
  if (phoneNumber.length === 10) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`;
  } else {
    return phoneNumber;
  }
};
