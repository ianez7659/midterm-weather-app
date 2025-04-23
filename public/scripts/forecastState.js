let selectedDate = null;
const callbacks = [];

export function selectDay(date) {
  selectedDate = date;
  callbacks.forEach((cb) => cb(date));
}

export function onDateChange(callback) {
  callbacks.push(callback);
  if (selectedDate) callback(selectedDate);
}

export function getSelectedDate() {
  return selectedDate;
}
