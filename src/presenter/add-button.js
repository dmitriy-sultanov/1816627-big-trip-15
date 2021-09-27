import AddButtonView from '../view/add-button.js';
import {ToastMessage} from '../data.js';
import {isOnline} from '../utils/common.js';
import {remove, render, replace} from '../utils/render.js';
import {toast} from '../utils/toast.js';

export default class AddButton {
  constructor(container) {
    this._container = container;

    this._addButtonComponent = null;
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
  }

  init(disabled = false) {
    this._renderButton(disabled);
  }

  setAddButtonClickHandler(callback) {
    this._addButtonClickHandler = callback;
  }

  _handleAddButtonClick() {
    if (!isOnline()) {
      return toast(ToastMessage.ADD);
    }

    this._addButtonClickHandler();
  }

  _renderButton(disabled) {
    const prevButtonComponent = this._addButtonComponent;
    this._addButtonComponent = new AddButtonView(disabled);
    this._addButtonComponent.setButtonClickHandler(this._handleAddButtonClick);

    if (prevButtonComponent === null) {
      return render(this._container, this._addButtonComponent);
    }

    replace(this._addButtonComponent, prevButtonComponent);
    remove(prevButtonComponent);
  }
}
