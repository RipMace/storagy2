export const cleanObj = function(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => !newObj[key] && delete newObj[key]);
  return newObj
};
