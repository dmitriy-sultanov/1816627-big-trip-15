import SortingView from '../view/sorting.js';
import EventListView from '../view/trip-events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { updateItem } from '../view/utils/common.js';
import { remove, render, RenderPosition } from '../view/utils/render.js';

export default class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._pointPresenter = new Map();

    this._eventsComponent = new EventListView();
    this._sortComponent = new SortingView();
    this._noEventComponent = new NoEventView();

    this._pointChangeHandler = this._pointChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();

    render(this._eventsContainer, this._eventsComponent, RenderPosition.BEFOREEND);

    this._renderEventsList();
  }

  _modeChangeHandler() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _pointChangeHandler(updatedPoint) {
    this._points = updateItem(this._waypoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._eventsComponent, this._pointChangeHandler, this._modeChangeHandler);
    pointPresenter.init(waypoint);
    this._pointPresenter.set(waypoint.id, pointPresenter);
  }

  _clearPoints() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    remove(this._sortComponent);
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    this._waypoints.forEach((waypoint) => this._renderPoint(waypoint));
  }

  _renderEventsList() {
    if(this._waypoints.length === 0) {
      this._renderNoEvents();
      return;
    }
    this._renderSort();
    this._renderPoints();
  }
}
