const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomLengthArray = (array) => {
  const interimArray = new Array(...array);
  const randomLengthArray = interimArray.slice(0, getRandomInteger(1, array.length));
  return randomLengthArray;
};

export {getRandomInteger, getRandomArrayElement, getRandomLengthArray};
