export default duration => {
  if (!Number.isInteger(duration)) {
    return duration;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  let hoursFormat = hours.toString().padStart(2, '0');
  let minutesFormat = minutes.toString().padStart(2, '0');

  const durationFormat = `${hoursFormat}:${minutesFormat} hours`;
  return durationFormat;
};
