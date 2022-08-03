import { useState } from "react";
import AppRouter from "components/Router";
import {authService} from "myBase";

function App() {
  const [IsLoggedin, setIsLoggedin] = useState(authService.currentUser);
  return (
    <><AppRouter IsLoggedin={IsLoggedin}/>
    <footer>&copy; ican {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
