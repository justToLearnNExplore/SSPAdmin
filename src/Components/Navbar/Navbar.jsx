import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from '../../assets/logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [authenticated, setAuthenticated] = useState(false);

    // Selector to get auth state from Redux store
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth && auth.authData) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [auth]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <div className='navbar'>
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo} alt="logo" />
                    <p>SSP</p>
                </div>
                <div className="nav-admin">
                    <p>ADMIN PANEL</p>
                </div>
                <ul className="nav-menu">
                    <li>
                        <NavLink to="/" activeclassname="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addgame" activeclassname="active">Add Game</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gamelist" activeclassname="active">GameList</NavLink>
                    </li>
                </ul>
                <div className="nav-auth">
                    {authenticated ? (
                        <button className="logout-button" onClick={logout}>Logout</button>
                    ) : (
                        <NavLink to="/login" activeclassname="active">
                            <button className="login-button">Login</button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
