export const stringSort = function(list, key) {
  return list.sort((a, b) => {
    const nameA = a[key].toUpperCase();
    const nameB = b[key].toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export const dateSort = function(list, key) {
  return list.sort((a, b) => new Date(b[key]) - new Date(a[key])).reverse();
};

export const numberSort = function(list, key) {
  return list.sort((a, b) => b[key] - a[key]);
};

