import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, IsLoggedin, UserObj }) => {

    return (
        <Router>
            {IsLoggedin && <Navigation UserObj={UserObj} />}
            <Switch>
                {IsLoggedin ?
                    <>
                        <Route exact path="/">
                            <Home UserObj={UserObj} />
                        </Route>
                        <Route path="/profile">
                            <Profile refreshUser={refreshUser} UserObj={UserObj} />
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