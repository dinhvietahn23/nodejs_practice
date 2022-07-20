import React from "react";
import { Container, Fab } from "@material-ui/core";
import Header from "../components/header";
import PostList from "../components/postList";
import useStyles from "./styles"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch } from "react-redux";
import { showModal } from "../redux/actions";
import CreatePostModel from "../components/createModel";

export default function HomePage() {

    const classess = useStyles()
    const dispatch = useDispatch()
    const openCreatePostModal = React.useCallback(()=>{
        dispatch(showModal.showModal())
    },[dispatch])
    return (
        <Container maxWidth = "lg" className="">
            <Header/>
            <PostList/>
            <CreatePostModel/>
            <Fab color = "primary" className={classess.fab} onClick={openCreatePostModal}>
                <AddIcon/>
            </Fab>
        </Container>
    )
}