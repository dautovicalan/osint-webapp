export const formatDate = (date) => {
  const date_obj = new Date(date);
  const formated = `${date_obj.getDate()}.${date_obj.getMonth()}.${date_obj.getFullYear()}, ${date_obj.getHours()}:${date_obj.getMinutes()}:${date_obj.getSeconds()}`;
  return formated;
};
