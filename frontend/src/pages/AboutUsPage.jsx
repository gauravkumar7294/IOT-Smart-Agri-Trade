import React from "react";
//import Know_Your_Crops from './Components/Know_Your_Crops'

function About_Us() {
    return (
        <div className="about-us-section" style={{
            maxWidth: "900px",
            margin: "40px auto",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "40px 32px"
        }}>
            <h1 style={{ color: "#2ecc40", marginBottom: "24px" }}>About Us</h1>
            <p style={{ fontSize: "1.15rem", color: "#333", marginBottom: "18px" }}>
    We provides crop control from anywhere using <b>IoT solutions</b>, enabling farmers to monitor and manage their fields remotely for better efficiency and productivity.
</p>
            <h3 style={{ color: "#228B22", marginTop: "32px" }}>Our Mission</h3>
            <p>
                To revolutionize agriculture by integrating IoT and smart technologies, empowering farmers to monitor, control, and optimize their crops from anywhere. We aim to make advanced, data-driven solutions accessible for every farmer, enhancing productivity and sustainability.
            </p>
            <h3 style={{ color: "#228B22", marginTop: "32px" }}>What We Offer</h3>
            <ul style={{ marginLeft: "20px", color: "#333" }}>
                <li>Crop-Control</li>
                <li>Online trade center for agri-products</li>
                <li>Plant health diagnosis and solutions</li>
                <li>Community support and expert guidance</li>
            </ul>
            <h3 style={{ color: "#228B22", marginTop: "32px" }}>Contact Us</h3>
            <p>
                Have questions or suggestions? Reach out at <a href="mailto:smartAgricultureIOT@gmail.com">smartAgricultureIOT@gmail.com</a>
            </p>
        </div>
    );
}

export default About_Us;