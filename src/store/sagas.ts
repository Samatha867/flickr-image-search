import {getFlickrPhotosRequest} from '../api';
import {put, takeLatest, all} from '@redux-saga/core/effects';

function* getTopPhotos({payload}: {payload: any}) {
  try {
    const res = yield getFlickrPhotosRequest(payload);
    if (res.data.photos?.photo?.length > 0) {
      yield put({
        type: 'API_SUCCESS',
        data: res.data.photos,
      });
    } else {
      yield put({type: 'API_LIST_END'});
    }
  } catch (err: any) {
    yield put({
      type: 'API_FAILURE',
      error: err.message,
    });
  }
}

function* topPhotosSaga() {
  yield takeLatest('API_REQUEST', getTopPhotos);
}

export default function* rootSaga() {
  yield all([topPhotosSaga()]);
}
