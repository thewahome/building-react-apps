import * as types from '../constants';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action){
    switch (action.type) {
        case types.CREATE_AUTHOR:
            return [...state, {...action.author}];
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}