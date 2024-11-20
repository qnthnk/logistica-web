import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home.jsx'
import Contact from './views/Contact.jsx'
import NotFound from './views/NotFound.jsx'
import LoginRegisterView from './views/LoginRegisterView.jsx';
import injectContext from "./js/store/appContext";
import Main from './views/Main.jsx'
import SaberMas from './views/SaberMas.jsx';
import Admin from './views/Admin.jsx';
import Profile from './views/Profile.jsx'
import Estadistica from './views/Estadistica.jsx';
import Directorio from './views/Directorio.jsx';

const Layout = () => {

  const basename = process.env.BASENAME || "";

  return (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/contact" element={<Contact/>}/>
                <Route exact path="/main" element={<Main/>}/>
                <Route exact path="/loginregister" element={<LoginRegisterView/>}/>
                <Route exact path="/plus" element={<SaberMas/>}/>
                <Route exact path="/admin" element={<Admin/>}/>
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/estadistica" element={<Estadistica />}/>
                <Route exact path="/directorio" element={<Directorio />}/>
                <Route exact path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)