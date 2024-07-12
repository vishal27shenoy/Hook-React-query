import {Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Register from "./pages/Register";
import Home from "./pages/Home";
import {ReactQueryDevtools} from 'react-query/devtools';
import Create from "./pages/Create";
import History from "./pages/History";
import Edited from "./pages/Edited";
import Settings from "./pages/Settings";
import Deleted from "./pages/Deleted";
import React from "react";
import NotFound from "./pages/NotFound";
const Router = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route  element={<Home/>}>
          <Route path="/create" element={<Create/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/edited" element={<Edited/>}/>
          <Route path="/deleted" element={<Deleted/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
    </Routes>
    <ReactQueryDevtools/>
    </div>
  )
}

export default Router;