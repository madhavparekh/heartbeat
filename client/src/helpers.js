function convertDMSToDD(degrees, minutes, seconds, direction) {
  let dd = Number(degrees) + Number(minutes / 60) + Number(seconds / (60 * 60));
  if (direction === "S" || direction === "W") {
    dd *= -1;
  } // Don't do anything for N or E

  return dd;
}

export function parseDMS(input) {
  const parts = input.split(/[^\d\w\.]+/); //eslint-disable-line
  return convertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
}
