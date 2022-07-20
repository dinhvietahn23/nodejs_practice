import {takeLatest, call, put} from "redux-saga/effects"
import * as actions from '../actions'
import * as api from '../../api'

function* fetchPostSaga(action) {
    try {
        console.log("Start get pos in saga 1")
        const posts = yield call(api.fetchPosts);
        console.log("Start get pos in saga 2")
        console.log('[posts]', posts)
        yield put(actions.getPosts.getPostSuccess(posts.data))
    } catch (error) {
        console.log("Error fetch posts saga:", error)
        yield put(actions.createPost.getPostFailure(error));
    }
    
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload)
        console.log('[Create post]', post)
        yield put(actions.createPost.createPostSuccess(post.data))
    } catch (error) {
        console.log("Error create post saga:", error) 
        yield put(actions.createPost.createPostFailure(error));
    }
}

function* updatePostSaga(action) {
    try {
        console.log(action.payload)
        console.log("Start")
        const post = yield call(api.updatePost, action.payload)
        console.log('[Update post]', post)
        yield put(actions.updatePost.updatePostSuccess(post.data))
    } catch (error) {
        console.log("Error create update saga:", error) 
        yield put(actions.updatePost.updatePostFailure(error));
    }
}

function* mySaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga)
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga)
}

export default mySaga