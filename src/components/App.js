import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import {authService} from "myBase";

function App() {
  const [Init, setInit] = useState(false);
  const [UserObj, setUserObj] = useState(null);
  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }
  
  useEffect(() => {
    //사용자의 로그인 상태 변경을 관찰하는 기능
    authService.onAuthStateChanged((user) => {
      if(user){
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
    {Init? <AppRouter refreshUser={refreshUser} IsLoggedin={Boolean(UserObj)} UserObj={UserObj} /> : <h1 className="roading">Initializing...</h1>}
    </>
  );
}

export default App;
