import { dbService, storageService } from "myBase";
import React, { useState } from "react";

const Ican = ({ IcanObj, isOwner }) => {
    const [Editing, setEditing] = useState(false);
    const [NewIcan, setNewIcan] = useState(IcanObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this?");
        if (ok) {
            await dbService.doc(`ican/${IcanObj.id}`).delete();
            await storageService.refFromURL(IcanObj.ref).delete();
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`ican/${IcanObj.id}`).update({
            text: NewIcan,
        });
        toggleEditing();
    }
    const toggleEditing = () => { setEditing((prev) => !prev); }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewIcan(value)
    }
    return (
        <div>
            {Editing ? <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={NewIcan} placeholder="Edit your text" required />
                    <input type="submit" value="Update" />
                </form>
                <button onClick={toggleEditing}>
                    Cancel
                </button>
            </> :
                <><h4>{IcanObj.text}</h4>
                    {isOwner &&
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    }
                </>}


        </div>
    )
}


export default Ican;