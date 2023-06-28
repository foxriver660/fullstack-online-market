export const shortenText = (text, n) => {
  if (text.length > n) {
    return text.substring(0, n) + "...";
  } else {
    return text;
  }
};
