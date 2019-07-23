import * as types from '../constants';

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}