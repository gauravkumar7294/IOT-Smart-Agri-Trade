import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import farmer_background from '../assets/farmer_background.jpg'; // Make sure this path is correct

export default function MainAppLayout() {
  const [theme, setTheme] = useState(localStorage.getItem('current_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
    // Add/remove 'dark' class from the body
    document.body.className = theme;
  }, [theme]);

  return (
    <div className='min-h-screen' style={{ backgroundImage: `url(${farmer_background})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <Navbar theme={theme} setTheme={setTheme} />
        <main>
          {/* Child routes from App.jsx will render here */}
          <Outlet />
        </main>
        <Footer />
    </div>
  );
}