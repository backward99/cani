import { dbService, storageService } from "myBase";
import React, { useState, useEffect } from "react";
import LookJson from "components/LookJson";
import Home from "routes/Home";

const Ican = ({ IcanObj, isOwner, Index }) => {
    const [Editing, setEditing] = useState(false);
    const [NewIcan, setNewIcan] = useState(IcanObj.text);
    const [ViewJson, setViewJson] = useState([]);
    const [JsonToggle, setJsonToggle] = useState(false);


    useEffect(() => {
        if (IcanObj.data !== "undefined" && IcanObj.data !== undefined) {

            try {
                const readJson = Object.entries(IcanObj.data[0].attribute.last_analysis_results);
                setViewJson(readJson);
            } catch (error) {
                const readJson = Object.entries(IcanObj.data.attribute.last_analysis_results);
                setViewJson(readJson);
            }
        }

        return () => {

        }
    }, [])

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
    const toggleEditing = () => { 
        setEditing((prev) => !prev); 
        // Home.toggleJson();        
    }
    const toggleJson = () => { setJsonToggle((prev) => !prev); }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewIcan(value)
    }

    return (
        <div>
            <h1>스크린 샷 내용 중 naver.com부분 출력될 곳 : {IcanObj.id}</h1>
            {/* {Editing ? (
                <>
                    <button onClick={toggleEditing}>
                        Hide Json
                    </button>
                </>
            ) :
            
                            <button onClick={toggleEditing}>View Json</button>
                
            } */}
            {/* {<div style={{ position: "fixed", top: 0, right: 0, left: 0, bottom: 0, margin: "auto", width: "50vw", height: "50vh", background: "#4C6793", boxShadow: "2px 2px 10px gray" }}>
                {ViewJson && (
                    <>
                        {ViewJson.map((json, index) => (
                            <LookJson key={index} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                        ))}
                    </>
                )}
                뭐야 나랑 장난해?
            </div>} */}
        </div>
        // <div>
        //     {Editing ? (
        //         <>
        //             {/* <form onSubmit={onSubmit}>
        //                 <input onChange={onChange} value={NewIcan} placeholder="Edit your text" required />
        //                 <input type="submit" value="Update" />
        //             </form> */}
        //             <button onClick={toggleEditing}>
        //                 View Json
        //             </button>
        //         </>
        //     ) :
        //         (
        //             <div style={{ display: "flex" }}>
        //                 <div style={{ flex: "1", background: "green" }}>
        //                     <h1>스크린 샷 내용 중 naver.com부분 출력될 곳 : {IcanObj.id}</h1>
        //                     {JsonToggle ?
        //                         <>
        //                             <button onClick={onDeleteClick}>View JSON</button>

        //                         </>
        //                         :
        //                         <button onClick={toggleEditing}>Hide Json</button>
        //                     }
        //                     {ViewJson && (
        //                         <>
        //                             {ViewJson.map((json) => (
        //                                 <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
        //                             ))}
        //                         </>
        //                     )}

        //                 </div>
        //                 <div style={{ flex: "1", background: "#F5E9CF" }}>
        //                     {/* <h2>{IcanObj.title}</h2>
        //                 <h4>{IcanObj.text}</h4> */}
        //                     {/* {ViewJson && (
        //                         <>
        //                             {ViewJson.map((json) => (
        //                                 <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
        //                             ))}
        //                         </>
        //                     )} */}
        //                 </div>
        //             </div>
        //         )
        //     }

        //     {/* {<div style={{ position: "fixed", top: 0, right: 0, left: 0, bottom: 0, margin: "auto", width: "50vw", height: "50vh", background: "#4C6793", boxShadow: "2px 2px 10px gray" }}>
        //         {ViewJson && (
        //                         <>
        //                             {ViewJson.map((json) => (
        //                                 <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
        //                             ))}
        //                         </>
        //                     )}
        //         asdas
        //          오버플로우 스크롤 샤용
        //     </div>} */}
        // </div>
    )
}

export default Ican;