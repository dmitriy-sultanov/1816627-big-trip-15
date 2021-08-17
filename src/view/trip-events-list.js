import { createElement } from '../util.js';

const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`);

export default class EventList {
  constructor() {
    this._element;
  }

  getTemeplate() {
    return createTripEventsListTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemeplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
