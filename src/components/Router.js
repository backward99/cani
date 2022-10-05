import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import YaraLog from "routes/YaraLog";
import WebSource from "routes/WebSource";

const AppRouter = ({ refreshUser, IsLoggedin, UserObj }) => {

    return (
        <Router>
            {IsLoggedin && <Navigation refreshUser={refreshUser} UserObj={UserObj} />}
            <Switch>
                {IsLoggedin ?
                    <>
                        <Route exact path="/">
                            <Home UserObj={UserObj} />
                        </Route>
                        <Route path="/profile">
                            <Profile refreshUser={refreshUser} UserObj={UserObj} />
                        </Route>
                        <Route path="/yaraLog">
                            <YaraLog />
                        </Route>
                        <Route path="/webSource">
                            <WebSource  />
                        </Route>
                        <Redirect from="*" to="/" />
                    </> :
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;