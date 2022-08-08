import { authService, dbService } from "myBase";
import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, UserObj }) => {
    const history = useHistory();
    const [NewName, setNewName] = useState(UserObj.displayName);
    const onLogOutClick = () => {
        authService.signOut(); 
        history.push("/");
        refreshUser();
    } 
    
    const getMyIcan = async () => {
        const ican = await dbService.collection("ican").where("creatorId", "==", UserObj.uid).orderBy("createdAt", "desc").get();
        console.log(ican.docs.map((doc) => doc.data()));
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(UserObj.displayName !== NewName){
            await UserObj.updateProfile({
                displayName : NewName,
            });
        }
    }
    const onChange = (event) =>{
        const { target: {value}} = event;
        setNewName(value);
    }

    useEffect(() => {
        getMyIcan();
        // eslint-disable-next-line
    }, [])

    

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display Name" value={NewName}/>
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}> Log Out</button>

        </>)
}

export default Profile;