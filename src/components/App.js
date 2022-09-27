import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import {authService} from "myBase";

function App() {
  const [Init, setInit] = useState(false);
  const [UserObj, setUserObj] = useState(null);
  const refreshUser = () =>{
    const user = authService.currentUser;
    console.log('authService.currentUser',authService.currentUser);
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        // setUserObj(user);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
    return () => {
      
    }
  }, [])
  

  return (
    <>
    {Init? <AppRouter refreshUser={refreshUser} IsLoggedin={Boolean(UserObj)} UserObj={UserObj} /> : "Initializing..."}
    </>
  );
}

export default App;
