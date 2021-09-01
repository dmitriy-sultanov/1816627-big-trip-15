import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-point.js';
import { render, RenderPosition, replace, remove } from '../view/utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointContainer, changeData, changeMode) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._closeFormHandler = this._closeFormHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripPointView(waypoint);
    this._pointEditComponent = new EditTripPointView(waypoint);

    this._pointComponent.setEditClickHandler(this._editClickHandler);
    this._pointComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._pointEditComponent.setSubmitHandler(this._submitHandler);
    this._pointEditComponent.setCloseFormHandler(this._closeFormHandler);

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if(this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _editClickHandler() {
    this._replacePointToForm();
  }

  _favoriteClickHandler() {
    this._changeData(
      Object.assign(
        {},
        this._waypoint,
        {
          isFavorite: !this._waypoint.isFavorite,
        },
      ),
    );
  }

  _submitHandler(waypoint) {
    this._changeData(waypoint);
    this._replaceFormToPoint();
  }

  _closeFormHandler() {
    this._replaceFormToPoint();
  }
}
