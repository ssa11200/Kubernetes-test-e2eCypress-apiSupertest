export const formatEnum = (input: string) => {
  const array = input.split("_");

  const capitalised = array.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalised.join(" ");
};
