import { CITIES, POINT_TYPES } from '../data.js';
import { getPoint } from '../mock/point.js';
import { eventStartTime, eventEndTime, createElement } from '../util.js';

const defaultCard = getPoint();

const makeTypeEvent = (currentType) => POINT_TYPES.map((type) => `<div class="event__type-item">
  <input id="event-type-${type}-${currentType.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"
  ${currentType.type === type ? 'checked' : ''}/>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${currentType.id}">${type[0].toUpperCase() + type.slice(1)}</label>
</div>`).join('');

const makeOffersTemplate = (offers) => offers.offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers.type}-${offer.id}" type="checkbox" name="event-offer-${offers.type}" ${offer.checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offers.type}-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`).join('');

const makeDestinationName = () => CITIES.map((dest) =>`<option value="${dest}"></option>`).join('');

const renderPictures = (dest) => dest.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createEditTripPointTemplate = (waypoint = defaultCard) => (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${waypoint.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${makeTypeEvent(waypoint)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${waypoint.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint.destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${makeDestinationName()}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime(waypoint.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime(waypoint.dateTo)}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${waypoint.basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
           ${makeOffersTemplate(waypoint.offer)}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${waypoint.destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${renderPictures(waypoint.destination)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`);

export default class EditTripPoint {
  constructor(waypoint = defaultCard) {
    this._waypoint = waypoint;
    this._element = null;
  }

  getTemplate() {
    return createEditTripPointTemplate(this._waypoint);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
