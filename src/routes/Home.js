import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myBase";
import React, { useState, useEffect, useRef } from "react";
import "style.css";

const Home = ({ UserObj }) => {
    const [Title, setTitle] = useState("");
    const [Text, setText] = useState("");
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);
    const [Ref, setRef] = useState("");
    useEffect(() => {
        dbService.collection("ican").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            const icanArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        let urlRef = "";
        if (Ref !== "") {
            const fileRef = storageService.ref().child(`${UserObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(Ref, "data_url");
            // const response = await fileRef.put(Ref);
            urlRef = await response.ref.getDownloadURL();
        }
        const ican = {
            title: Title,
            text: Text,
            createdAt: Date.now(),
            creatorId: UserObj.uid,
            ref: urlRef,
        }
        await dbService.collection("ican").add(ican);
        setText("");
        setRef("");
    }

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "title") {
            setTitle(value);
        } else if (name === "text") {
            setText(value);
        }
    }

    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        const readerRef = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { target: { result } } = finishedEvent;

                try{
                    const readJson = Object.entries(JSON.parse(result).data[0].attributes.last_analysis_results);
                    setJson(readJson);
                } catch (error){
                    const readJson = Object.entries(JSON.parse(result).data.attributes.last_analysis_results);
                    setJson(readJson);
                }                
        }
        reader.readAsText(theFile);

        readerRef.onloadend = (finishedEvent) => {
            const { target: { result } } = finishedEvent;
            setRef(result);
        }
        readerRef.readAsDataURL(theFile);
        toggleJson();

    }
    const toggleJson = () => {
        setUploading((prev) => !prev);
    }
    const fileInput = useRef();
    const onClearJson = () => {
        setJson([]);
        fileInput.current.value = null;
    }
    return (
        <div>

            <form onSubmit={onSubmit}>
                <label style={{display:"block"}} htmlFor="title">Site:</label>
                <input id="title" name="title" value={Title} onChange={onChange} type="text" placeholder="Title" maxLength={20} />
                {/* <input name="text" value={Text} onChange={onChange} type="text" placeholder="text" maxLength={120} /> */}
                <label style={{display:"block"}} htmlFor="text">Text:</label>
                <textarea style={{display:"block"}} id="text" name="text" value={Text} onChange={onChange} placeholder="text" rows="10" cols="50" />
                <input style={{display:"block"}} type="file" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="저장하기" />
            </form>
            <div>
                {Texts && Texts.map((ican) => (

                    <Ican
                        key={ican.id}
                        IcanObj={ican}
                        isOwner={ican.creatorId === UserObj.uid}
                    />
                ))}
            </div>
            <div>
                {Uploading ? (<>
                    <button onClick={toggleJson}>Hide Json</button>
                    {Json && (
                        <>
                            <button onClick={onClearJson}>Clear</button>
                            {Json.map((json) => (
                                <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                            ))}
                        </>
                    )}
                </>) : <button onClick={toggleJson}>View Json</button>}
            </div>
        </div>
    )
}


export default Home;
