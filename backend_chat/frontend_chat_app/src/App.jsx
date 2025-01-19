import Left from "./home/left/Left";
import Right from "./home/right/Right";
import LeftLogout from "./home/left_logout/LeftLogout";
import Signup from "./components/shared/signup";
import Login from "./components/shared/Login";
import { useAuth } from "./context/AuthProvider.jsx";
import {Routes, Route, Navigate} from "react-router-dom"
import { Toaster } from 'react-hot-toast';

function App() {
  const [authUser] = useAuth();
  return ( 
<>


<Routes>
  <Route path="/" element={
    authUser ?
    (<div className="flex h-screen">
    <LeftLogout></LeftLogout>
    <Left></Left>
    <Right></Right>
    </div>):(<Navigate to={"/login"}/>)
  }>

    </Route>

    <Route path="/login" element={authUser?<Navigate to={"/"}/>: <Login/>}></Route>
    <Route path="/signup" element={authUser?<Navigate to={"/"}/>: <Signup/>}></Route>
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
