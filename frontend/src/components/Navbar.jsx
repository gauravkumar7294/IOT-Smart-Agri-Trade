import React from 'react';
// Import NavLink to handle active link styling
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import apiClient from '../api/apiClient'; // The apiClient is now used
// Import assets
import daylight from '../assets/daylight.png';
import farmer from '../assets/farmer.jpg';
import sunnyday from '../assets/sunnyday.png';
import search_dark from '../assets/search_dark.png';
import search_day from '../assets/search_day.png';

const Navbar = ({ theme, setTheme }) => {
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const toggle_mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    const handleLogout = async () => {
        try {
            // --- THIS IS THE CHANGE ---
            // Replaced the multi-line fetch with a single apiClient call.
            await apiClient('/api/auth/logout', { method: 'POST' });
            
            setAuthUser(null);
            navigate("/login");
        } catch (error) {
            // The catch block will now handle errors from the apiClient
            console.error(error.message);
        }
    };

    // Style objects for a clean, modern look
    const styles = {
        navbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 2rem',
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: 0,
            width: 'calc(100% - 4rem)', // Adjusts for padding
            zIndex: 1000,
            borderBottom: '1px solid var(--search-border)',
        },
        logo: {
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
        },
        navLinks: {
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0,
        },
        searchBox: {
            display: 'flex',
            alignItems: 'center',
            background: 'var(--search-bg)',
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1px solid var(--search-border)',
        },
        searchInput: {
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--nav-text)',
            marginRight: '8px',
        },
        searchIcon: {
            width: '16px',
            height: '16px',
        },
        actionsContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        userName: {
            color: 'var(--nav-text)',
            fontWeight: '600',
        },
        logoutButton: {
            padding: '8px 16px',
            cursor: 'pointer',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
        },
        toggleIcon: {
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
        }
    };

    // Separate style for NavLink's active state
    const activeLinkStyle = {
        fontWeight: 'bold',
        color: 'var(--nav-link-hover)',
        textDecoration: 'none',
        paddingBottom: '5px',
        borderBottom: '2px solid var(--nav-link-hover)',
    };
    
    const defaultLinkStyle = {
        textDecoration: 'none',
        color: 'var(--nav-text)',
        fontWeight: '500',
        paddingBottom: '5px',
        borderBottom: '2px solid transparent',
        transition: 'color 0.2s, border-bottom-color 0.2s',
    };

    return (
        <div style={styles.navbar}>
            <NavLink to="/">
                <img src={farmer} alt="Farm Logo" style={styles.logo} />
            </NavLink>

            <ul style={styles.navLinks}>
                <li><NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : defaultLinkStyle}>Home</NavLink></li>
                <li><NavLink to="/trade_center" style={({ isActive }) => isActive ? activeLinkStyle : defaultLinkStyle}>Trade Center</NavLink></li>
                <li><NavLink to="/know_your_crops" style={({ isActive }) => isActive ? activeLinkStyle : defaultLinkStyle}>Know Your Crops</NavLink></li>
                <li><NavLink to="/about_us" style={({ isActive }) => isActive ? activeLinkStyle : defaultLinkStyle}>About Us</NavLink></li>
            </ul>

            <div style={styles.searchBox}>
                <input type="text" placeholder="Search..." style={styles.searchInput} />
                <img src={theme === 'light' ? search_day : search_dark} alt="Search" style={styles.searchIcon} />
            </div>

            <div style={styles.actionsContainer}>
                {authUser ? (
                    <>
                        <span style={styles.userName}>Hi, {authUser.fullName}</span>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </>
                ) : (
                         <NavLink to="/login" style={defaultLinkStyle}>Login</NavLink>
                )}
                <img onClick={toggle_mode} src={theme === 'light' ? sunnyday : daylight} alt="Toggle theme" style={styles.toggleIcon} />
            </div>
        </div>
    );
};

export default Navbar;