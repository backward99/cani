import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import UrlResult from "../routes/UrlResult";
import Navigation from "./Navigation";
import FileResult from "routes/FileResult";
import YaraLog from "routes/YaraLog";

const AppRouter = ({ refreshUser, IsLoggedin, UserObj }) => {

    return (
        <Router>
            {IsLoggedin && <Navigation refreshUser={refreshUser} UserObj={UserObj} />}
            <Switch>
                {IsLoggedin ?
                    <>
                        <Route exact path="/">
                            <UrlResult UserObj={UserObj} />
                        </Route>
                        <Route path="/fileResult">
                            <FileResult refreshUser={refreshUser} UserObj={UserObj} />
                        </Route>
                        <Route path="/yaraLog">
                            <YaraLog />
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