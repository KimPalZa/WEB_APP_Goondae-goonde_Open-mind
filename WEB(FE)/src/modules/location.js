import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as locationsAPI from '../lib/api/locations';
import * as imagesAPI from '../lib/api/images';
import { takeLatest } from 'redux-saga/effects';

const [READ_LOCATION, READ_LOCATION_SUCCESS, READ_LOCATION_FAILURE] =
  createRequestActionTypes('location/READ_LOCATION');

const [READ_IMAGE, READ_IMAGE_SUCCESS, READ_IMAGE_FAILURE] =
  createRequestActionTypes('location/READ_IMAGE');

const UNLOAD_LOCATION = 'location/UNLOAD_LOCATION';

export const readLocation = createAction(READ_LOCATION, (placeId) => placeId);
export const readImage = createAction(READ_IMAGE, (title) => title);
export const unloadLocation = createAction(UNLOAD_LOCATION);

const readLocationSaga = createRequestSaga(
  READ_LOCATION,
  locationsAPI.readLocation
);

const readImageSaga = createRequestSaga(READ_IMAGE, imagesAPI.readImage);

export function* locationSaga() {
  yield takeLatest(READ_LOCATION, readLocationSaga);
  yield takeLatest(READ_IMAGE, readImageSaga);
}

const initialState = {
  location: null,
  image: null,
  error: null,
};

const location = handleActions(
  {
    [READ_LOCATION_SUCCESS]: (state, { payload: location }) => ({
      ...state,
      location,
    }),
    [READ_LOCATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_IMAGE_SUCCESS]: (state, { payload: image }) => ({
      ...state,
      image,
    }),
    [READ_IMAGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_LOCATION]: () => initialState,
  },
  initialState
);
export default location;
