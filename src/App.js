import React, { useEffect } from "react";
import "./App.css";
import Homescreen from "./Screens/Homescreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loginscreen from "./Screens/Loginscreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Screens/ProfileScreen";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth){
        //Logged in
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        //Logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Loginscreen />
        ) : (
          <Switch>
            <Route path='/profile'>
              <ProfileScreen/>
            </Route>
            <Route exact path="/">
              <Homescreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
