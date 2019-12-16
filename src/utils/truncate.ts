const truncate = (str: string, maxCharacters: number, useWordBoundary: boolean): string => {
  if (!str) {
    return '';
  }
  if (str.length <= maxCharacters) {
    return str;
  }
  const subString = str.substr(0, maxCharacters - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + `...`;
};
// usage
truncate('not very long', 11, true); // => not very...

export default truncate;
