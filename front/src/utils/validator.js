export const isValidDomain = (domain) => {
  return domain.match(/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i);
};
