import React, { useContext, Fragment } from "react";
import {Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import { Navbar } from "../components/Navbar";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import { Tweets } from "../components/Tweets";
import { Homepage } from "../components/Homepage";
import { TweetEdit } from "../components/TweetEdit";

export const history = createBrowserHistory();

const AppRouter = () => {
    const { loggedIn } = useContext(AuthContext);
    
    

    return (
        <Router history={history}>
            <Navbar/>
                <Switch>
                    <Route path="/" component={Homepage} exact/>
                    {
                        loggedIn === false && <Fragment>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />    
                        </Fragment>
                    }
                    {
                        loggedIn === true && 
                            <Fragment>
                                <Route path="/tweet" component={Tweets} />
                                <Route path="/edit/:id" component={TweetEdit}/>
                            </Fragment>
                    }
                    
                </Switch>
        </Router>
)}

export default AppRouter;