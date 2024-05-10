export const hasAdditionalProperties = (obj) => {
  let hasAdditionalProperties = false;
  Object.keys(obj).forEach((key) => {
    if (
      key != "domain" &&
      key != "start_time" &&
      key != "end_time" &&
      key != "_id" &&
      key != "sources"
    ) {
      if (obj[key].length > 0) {
        hasAdditionalProperties = true;
      }
    }
  });
  return hasAdditionalProperties;
};
