import { combineReducers } from "redux";
import posts from './post'
import modal from './modal'
export default combineReducers({
    posts,
    modal
})