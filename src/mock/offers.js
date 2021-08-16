import { getRandomInteger, getRandomLengthArray } from '../util.js';
import { PRICE_MIN, PRICE_MAX } from '../data.js';


const makeOffer = (title, id) => ({
  id: id,
  title: title,
  price: getRandomInteger(PRICE_MIN, PRICE_MAX),
  checked: Boolean(getRandomInteger(0, 1)),
});

const makeOffers = (titles) => {

  const offersArr = new Array;
  let countId = 0;
  for(const title of titles) {
    countId += 1;
    const offer = makeOffer(title, countId);
    offersArr.push(offer);
  }
  const offers = getRandomLengthArray(offersArr);
  return offers;
};

const getMainOffer = (type, titles) => ({type: type, offers: makeOffers(titles)});


export {getMainOffer};
