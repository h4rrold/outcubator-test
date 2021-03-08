export function checkIfCardNumIsValid(value) {
  if (!value) {
    return false;
  }

  // The Luhn Algorithm
  let nCheck = 0,
    bEven = false;

  value = String(value);

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}

export const checkIfDateIsPast = (value) => {
  if (!value) {
    return false;
  }

  const today = new Date();
  const monthToday = today.getMonth() + 1;
  const yearToday = today.getFullYear().toString().substr(-2);

  const [expMonth, expYear] = value.split('/');

  if (Number(expYear) < Number(yearToday)) {
    return false;
  } else if (Number(expMonth) < monthToday && Number(expYear) <= Number(yearToday)) {
    return false;
  }

  return true;
};

export const checkIfMonthIsCorrect = (value) => {
  if (!value) {
    return false;
  }

  const [expMonth] = value.split('/');

  if (Number(expMonth) > 12) {
    return false;
  }

  return true;
};

export const expDateMask = [/\d/, /\d/, '/', /\d/, /\d/];
export const cardNumberMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' '
];
