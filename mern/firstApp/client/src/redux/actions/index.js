import {createActions} from 'redux-actions'

export const getType = (reduxAction) => {
    return reduxAction().type
}

export const getPosts = createActions({
    getPostsRequest: undefined,
    getPostSuccess: (payload) => payload,
    getPostFailure:(err) => err
})

/*
    getType(getPosts.getPostsRequest)
    {
        type: 'getPostsRequest',

    }
*/

// export const showModal = createActions('SHOW_CREATE_POST_MODAL')
export const showModal = createActions({
    showModal: (payload) => payload,
})

export const hideModal = createActions({
    hideModal: (payload) => payload
})

// export const hideModal = createActions('HIDE_CREATE_POST_MODAL')
export const createPost = createActions({
    createPostRequest: (payload)=> payload,
    createPostSuccess: (payload) => payload,
    createPostFailure:(err) => err
})

export const updatePost = createActions({
    updatePostRequest: (payload)=> payload,
    updatePostSuccess: (payload) => payload,
    updatePostFailure:(err) => err
})