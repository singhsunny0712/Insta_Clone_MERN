import React, { useEffect, createContext, useReducer , useContext } from 'react';
import './App.css';
import NAVBAR from "./components/Navbar.js"
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import HOME from "./components/screens/Home"
import SIGNIN from "./components/screens/Signin"
import PROFILE from "./components/screens/Profil"
import SIGNUP from "./components/screens/Signup"
import CREATEPOST from "./components/screens/CreatePost"
import USERPROFILE from "./components/screens/UserProfile"
import SUBSCRIBESUSERPOSTS from './components/screens/SubscribesUserPosts'
import { reducer, initialState } from "./Reducers/userReducer"

export const UserContext = createContext();

const Routing = () => {
   const history = useHistory();
   const {state,dispatch}=useContext(UserContext);
   useEffect(()=>{
      const user =JSON.parse( localStorage.getItem("user"));
      if(user){
         dispatch({type:"USER",payload:user})
         // history.push('/');
      }else{
         history.push('/signin');

      }
   },[])

   return (

      <Switch>
         <Route exact path="/">
            <HOME />
         </Route>
         <Route path="/signin">
            <SIGNIN />
         </Route>
         <Route exact path="/profile">
            <PROFILE />
         </Route>
         <Route path="/signup">
            <SIGNUP />
         </Route>
         <Route path="/createpost">
            <CREATEPOST />
         </Route>
         <Route path="/profile/:userid">
            <USERPROFILE />
         </Route>
         <Route path="/myfollowerspost">
            <SUBSCRIBESUSERPOSTS />
         </Route>
      </Switch>


   )
}


function App() {
   const [state, dispatch] = useReducer(reducer, initialState);
   return (
      <UserContext.Provider value={{state,dispatch}}>

         <BrowserRouter>
            <NAVBAR />
            <Routing />
         </BrowserRouter>

      </UserContext.Provider>
   );
}

export default App;
