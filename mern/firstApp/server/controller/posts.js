import { response } from "express";
import { PostModel } from "../models/postModel.js";

export const getPosts = async (request, response) => {
    try {
        // const post = new PostModel({
        //     title:'test',
        //     content: 'tests'
        // })
        // // post.save()
        const posts = await PostModel.find()
        console.log('posts', posts)
        response.status(200).json(posts)
    } catch (error) {
        response.status(400).json({error: error})
    }
};

export const createPost = async (request, response) => {
    // response.send("CREATE SUCCESS")
    try {

        const newPost = request.body
        console.log("This is new post of server:" , newPost)
        const post = new PostModel(newPost)
        await post.save()
        response.status(200).json(post);
    } catch (error) {
        response.status(400).json({error: error})
    }
};

// export const updatePost = async (request, response) => {
//     response.send("Update")
//     // console.log(request.body)
//     // try {
//     //     const updatePost = request.body
//     //     console.log(updatePost)
//     //     const post = PostModel.findOneAndUpdate({_id: updatePost._id}, updatePost,{new: true})
//     //     response.status(200).json(post)

//     // } catch (error) {
//     //     console.log("400 update")
//     //     response.status(400).json({error: error})
//     // }
// }
export const updatePost = async (request, response) => {
    // response.send("CREATE SUCCESS")
    const updatePost = request.body
    console.log("This is update post of server:" , updatePost)

    try {
        const updatePost = request.body
        console.log(updatePost)
        const post = await PostModel.findOneAndUpdate({_id: updatePost._id}, updatePost,{new: true})
        console.log("Is update:", post)
        response.status(200).json(post)

    } catch (error) {
        console.log("400 update")
        response.status(400).json({error: error})
    }
};