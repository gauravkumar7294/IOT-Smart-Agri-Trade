import React from 'react';
// Importing a wider range of icons for a more complete footer
import { FaHome, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
    // A centralized style object for a clean and maintainable component
    const styles = {
        footerContainer: {
            backgroundColor: '#1a202c', // A deep charcoal color
            color: '#a0aec0', // A soft gray for text
            padding: '3rem 2rem',
        },
        contentWrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        columnTitle: {
            color: '#ffffff',
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '1rem',
            borderBottom: '2px solid #2563eb', // Accent color
            paddingBottom: '0.5rem',
            display: 'inline-block',
        },
        description: {
            lineHeight: '1.6',
        },
        link: {
            color: '#a0aec0',
            textDecoration: 'none',
            marginBottom: '0.75rem',
            transition: 'color 0.3s ease',
        },
        addressItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.75rem',
        },
        icon: {
            marginRight: '10px',
            color: '#2563eb', // Accent color
        },
        bottomBar: {
            borderTop: '1px solid #2d3748',
            marginTop: '3rem',
            paddingTop: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        socialIconsContainer: {
            display: 'flex',
            gap: '1rem',
        },
        socialIconLink: {
            color: '#a0aec0',
            fontSize: '1.5rem',
            transition: 'color 0.3s ease',
        }
    };

    // Hover effect for links
    const handleLinkHover = (e, enter) => {
        e.target.style.color = enter ? '#ffffff' : '#a0aec0';
    };
    
    // Hover effect for social icons
    const handleSocialHover = (e, enter) => {
        e.target.style.color = enter ? '#2563eb' : '#a0aec0';
    };

    return (
        <footer style={styles.footerContainer}>
            <div style={styles.contentWrapper}>
                {/* Column 1: Company Info */}
                <div style={styles.column}>
                    <h4 style={styles.columnTitle}>🌿 AgroTech</h4>
                    <p style={styles.description}>
                        Pioneering the future of agriculture with data-driven insights to help farmers increase yield and sustainability.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div style={styles.column}>
                    <h4 style={styles.columnTitle}>Quick Links</h4>
                    <a href="/about_us" style={styles.link} onMouseEnter={(e) => handleLinkHover(e, true)} onMouseLeave={(e) => handleLinkHover(e, false)}>About Us</a>
                    <a href="/trade_center" style={styles.link} onMouseEnter={(e) => handleLinkHover(e, true)} onMouseLeave={(e) => handleLinkHover(e, false)}>Trade Center</a>
                    <a href="/know_your_crops" style={styles.link} onMouseEnter={(e) => handleLinkHover(e, true)} onMouseLeave={(e) => handleLinkHover(e, false)}>Crop Monitoring</a>
                    <a href="/contact" style={styles.link} onMouseEnter={(e) => handleLinkHover(e, true)} onMouseLeave={(e) => handleLinkHover(e, false)}>Contact</a>
                </div>

                {/* Column 3: Contact Info */}
                <div style={styles.column}>
                    <h4 style={styles.columnTitle}>Contact Us</h4>
                    <div style={styles.addressItem}>
                        <FaHome style={styles.icon} />
                        <span>Raipur, Chhattisgarh, India</span>
                    </div>
                    <div style={styles.addressItem}>
                        <FaPhoneAlt style={styles.icon} />
                        <span>+91 90263 52537</span>
                    </div>
                    <div style={styles.addressItem}>
                        <FaEnvelope style={styles.icon} />
                        <span>contact@agrotech.com</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar with Copyright and Social Media */}
            <div style={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} AgroTech. All Rights Reserved.</p>
                <div style={styles.socialIconsContainer}>
                    <a href="#" style={styles.socialIconLink} onMouseEnter={(e) => handleSocialHover(e, true)} onMouseLeave={(e) => handleSocialHover(e, false)}><FaTwitter /></a>
                    <a href="#" style={styles.socialIconLink} onMouseEnter={(e) => handleSocialHover(e, true)} onMouseLeave={(e) => handleSocialHover(e, false)}><FaFacebook /></a>
                    <a href="#" style={styles.socialIconLink} onMouseEnter={(e) => handleSocialHover(e, true)} onMouseLeave={(e) => handleSocialHover(e, false)}><FaLinkedin /></a>
                    <a href="#" style={styles.socialIconLink} onMouseEnter={(e) => handleSocialHover(e, true)} onMouseLeave={(e) => handleSocialHover(e, false)}><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;