import React from 'react';
import './Admin.css';

import { Routes, Route } from 'react-router-dom';
import AddGame from '../../Components/AddGame/AddGame';
import GameList from '../../Components/GameList/GameList';
import LoginSignup from '../LoginSignup/LoginSignup'
import AdminHome from '../../Components/AdminHome/AdminHome';

const Admin = () => {
  return (
    <div className='admin'>
      
      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/addgame' element={<AddGame />} />
        <Route path='/gamelist' element={<GameList />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
    </div>
  );
}

export default Admin;
