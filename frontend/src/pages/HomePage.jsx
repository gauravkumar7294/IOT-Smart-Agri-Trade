import React from 'react';
import { useNavigate } from 'react-router-dom';

// You can define these section components right in the file or import them
// For simplicity, we'll define them here.

// --- HERO SECTION ---
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '10rem 2rem 5rem 2rem' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '1rem' }}>
        Precision Agriculture, Simplified
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        Monitor your crops with real-time sensor data. Gain valuable insights to optimize growth, conserve resources, and maximize yield.
      </p>
      <button 
        style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', backgroundColor: '#2563eb', padding: '0.8rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        onClick={() => navigate('/know_your_crops')}
      >
        Start Monitoring Now
      </button>
    </div>
  );
};

// --- FEATURES SECTION ---
const FeaturesSection = () => {
  const styles = {
    section: { padding: '4rem 2rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', textAlign: 'center' },
    icon: { fontSize: '3rem', marginBottom: '1rem' },
    title: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }
  };
  return (
    <section id="features" style={styles.section}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Why Choose AgroTech?</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>📊</div>
          <h3 style={styles.title}>Real-Time Data</h3>
          <p>Instantly access live readings of temperature, humidity, and soil moisture directly from your fields to your dashboard.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>📈</div>
          <h3 style={styles.title}>Historical Analysis</h3>
          <p>Track trends and analyze historical data with intuitive charts. Understand your crop cycles better than ever before.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>🔔</div>
          <h3 style={styles.title}>Custom Alerts</h3>
          <p>Set custom thresholds and receive instant notifications on your phone when sensor readings go outside your desired range.</p>
        </div>
      </div>
    </section>
  );
};

// --- HOW IT WORKS SECTION ---
const HowItWorksSection = () => {
    // Styles similar to FeaturesSection can be used
    return (
        <section id="how-it-works" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Get Started in 3 Easy Steps</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '280px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>1. Connect</h3>
                    <p>Power up your sensor device in the field. No complex setup required.</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '280px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>2. Enter Token</h3>
                    <p>Navigate to our monitoring page and enter your unique device token.</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '280px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>3. Get Insights</h3>
                    <p>Instantly view live data and begin making smarter farming decisions.</p>
                </div>
            </div>
        </section>
    );
};

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = () => {
    // Styles similar to FeaturesSection can be used
    return(
        <section id="testimonials" style={{ padding: '4rem 2rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
             <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Trusted by Farmers</h2>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '400px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <p style={{ fontStyle: 'italic' }}>"This service changed the way I manage my farm. The real-time data is a game-changer for irrigation."</p>
                    <p style={{ fontWeight: '600', marginTop: '1rem' }}>- John D., Farm Owner</p>
                </div>
                 <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', width: '400px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
                    <p style={{ fontStyle: 'italic' }}>"The custom alerts saved my crops during an unexpected heatwave. Incredibly reliable and easy to use."</p>
                    <p style={{ fontWeight: '600', marginTop: '1rem' }}>- Maria S., Vineyard Manager</p>
                </div>
             </div>
        </section>
    )
};


// --- The Main HomePage Component ---
function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;