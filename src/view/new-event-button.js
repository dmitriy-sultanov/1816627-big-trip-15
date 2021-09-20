import AbstractView from './abstract.js';
import {MenuItem} from '../data.js';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButton extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNewEventButtonTemplate();
  }

  setDisabledState(isDisabled) {
    this.getElement().disabled = isDisabled;
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(MenuItem.ADD_NEW_EVENT);
  }
}
