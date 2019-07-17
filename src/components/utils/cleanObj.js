export const cleanObj = function(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => (newObj[key] === undefined || newObj[key] === null) && delete newObj[key]);
  return newObj
};
