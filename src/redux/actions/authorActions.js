import { CREATE_AUTHOR, LOAD_AUTHORS_SUCCESS } from '../constants';
import * as authorApi from '../../api/authorApi';
export function createAuthor(author){
    return { type: CREATE_AUTHOR, author };
}

export function loadAuthorsSuccess(authors){
    return { type: LOAD_AUTHORS_SUCCESS , authors };
}

export function loadAuthors(){
    return function(dispatch){
        return authorApi.getAuthors().then((authors)=>{
            dispatch(loadAuthorsSuccess(authors));
        })
        .catch((error)=>{
            throw error;
        })
    }
}