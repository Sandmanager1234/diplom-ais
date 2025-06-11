export const numberMask = (phoneNumber: string) => {
  const number = String(phoneNumber).replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3-$4-$5");
  return number[0] === "8" ? number.replace("8", "+7") : number;
};