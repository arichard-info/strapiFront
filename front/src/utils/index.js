export const getDeep = (obj, path, defaultValue) =>
  path.split(".").reduce((acc, currentPath) => {
    if (acc && acc[currentPath]) return acc[currentPath];
    else return false;
  }, obj) || defaultValue;
