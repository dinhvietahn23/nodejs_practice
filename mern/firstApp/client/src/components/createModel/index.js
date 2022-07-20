import React, { useState } from "react";
import { Button, Modal, TextareaAutosize,TextField } from "@material-ui/core";
import FileBase64 from "react-file-base64"
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyle from "./styles"
import { hideModal } from "../../redux/actions";
import { createPost } from "../../redux/actions";

export default function CreatePostModel() {
    // const body = <p>This is body modal</p>
    const [data, setData] = useState({
        title: "",
        content: "",
        attachment:""
    })

    function handleTitleChange(event){
        setData(prevData=>{
            return {
                ... prevData,
                title: event.target.value
            }
        })
    }

    function handleContentChange(event) {
        setData(prevData=>{
            return {
                ...prevData,
                content: event.target.value
            }
        })
    }

    function hanldeAttachment ({base64}) {
        setData(prevData=>{
            return {
                ...prevData,
                attachment: base64
            }
        })
    }
    const dispatch = useDispatch();
    const {isShow} = useSelector(modalState$)

    const onClose = React.useCallback(()=>{
        dispatch(hideModal.hideModal())
        setData(prevData => {
            return {
                ...prevData,
                attachment:"",
                title:"",
                content:" "
            }
        })
    }, [dispatch])

    const onSubmit = React.useCallback(()=>{
        dispatch(createPost.createPostRequest(data))
        onClose()
        console.log({data})
    }, [data, dispatch, onClose])

    const classess = useStyle();
    const body = (
        <div className={classess.paper} id="simple-modal-title">
            <h2>Create new post</h2>
            <form noValidate autoComplete="off" className={classess.form}>
                <TextField
                    className = {classess.title}
                    required
                    label = 'Title'
                    value={data.title}
                    onChange = {handleTitleChange}
                />
                <TextareaAutosize
                    className={classess.textarea}
                    rowMin = {10}
                    rowMax = {15}
                    placeholder='Content...'
                    value = {data.content}
                    onChange = {handleContentChange}
                />
                <FileBase64 accept = 'image/*' multiple={false} type='file' value={data.attachment} onDone={hanldeAttachment}/>
                <div className={classess.footer}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component="span" 
                        fullWidth 
                        onClick={onSubmit}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    )
    return (
        <div>
            <Modal open={isShow} onClose={onClose}>{body}
            </Modal>
        </div>
    )
}