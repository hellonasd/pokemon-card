export const acronym = (name: string): string => {
  const str = name.split("-");
  let s = "";

  if (str.length >= 2) {
    for (let i = 0; i < str.length; i++) {
      if (i < 1) {
        s += str[i][0];
      } else {
        s +=
          str[i][str[i].length - 1] === str[i][1]
            ? str[i][0] + str[i][1] + str[i][2]
            : str[i][0] + str[i][1] + str[i][str[i].length - 1];
      }
    }
    return s;
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i].length > 2) {
      s +=
        str[i][1] !== str[i][str[i].length - 1]
          ? str[i][0] + str[i][1] + str[i][str[i].length - 1]
          : str[i][0] + str[i][1] + str[i][2];
    } else {
      return str[i];
    }
  }
  return s;
};
