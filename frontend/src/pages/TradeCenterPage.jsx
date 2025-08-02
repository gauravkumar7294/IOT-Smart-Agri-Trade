import React, { useState, useEffect } from "react";

// --- Form Modal Component ---
// A self-contained component for the crop submission form.
const ListCropModal = ({ isOpen, onClose, onAddCrop }) => {
    const [cropName, setCropName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCrop = {
            _id: `c${Date.now()}`, // Simple unique ID
            name: cropName,
            weight: parseFloat(weight),
            price: parseInt(price, 10),
            image: preview || 'https://placehold.co/400x200/a7f3d0/14532d?text=No+Image', // Use preview or a placeholder
            seller: { fullName: 'Current Farmer' } // Replace with actual user data
        };
        onAddCrop(newCrop);
        onClose(); // Close the modal after submission
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={styles.modalTitle}>List a New Crop for Sale</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Crop Name</label>
                        <input type="text" style={styles.input} value={cropName} onChange={(e) => setCropName(e.target.value)} required />
                    </div>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Weight (tons)</label>
                            <input type="number" style={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} required />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Price per Ton (₹)</label>
                            <input type="number" style={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Upload Image</label>
                        <input type="file" accept="image/*" style={styles.fileInput} onChange={handleImageChange} />
                        {preview && <img src={preview} alt="Preview" style={styles.imagePreview} />}
                    </div>
                    <div style={styles.modalActions}>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>
                        <button type="submit" style={styles.submitButton}>List Crop</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main Page Component ---
function TradeCenterPage() {
    const [activeTab, setActiveTab] = useState('crops');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tradeData, setTradeData] = useState({ crops: [], farmers: [], traders: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTradeData = async () => {
            try {
                const data = getMockData(); 
                setTradeData(data);
            } catch (err) {
                setError(err.message || "Failed to fetch trade data.");
            } finally {
                setLoading(false);
            }
        };
        fetchTradeData();
    }, []);

    const handleAddCrop = (newCrop) => {
        setTradeData(prevData => ({
            ...prevData,
            crops: [newCrop, ...prevData.crops]
        }));
    };

    const { crops, farmers, traders } = tradeData;

    if (loading) return <div style={styles.centeredMessage}>Loading Trade Center...</div>;
    if (error) return <div style={{...styles.centeredMessage, color: '#e53e3e' }}>Error: {error}</div>;

    return (
        <div style={styles.pageContainer}>
            <ListCropModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAddCrop={handleAddCrop}
            />
            <div style={styles.tradeCenterContainer}>
                <div style={styles.headerContainer}>
                    <div>
                        <h1 style={styles.header}>🌾 Trade Center</h1>
                        <p style={styles.subtitle}>Your central hub for connecting with farmers, traders, and discovering the latest crops.</p>
                    </div>
                    <button style={styles.listCropButton} onClick={() => setIsModalOpen(true)}>
                        + List a New Crop
                    </button>
                </div>

                <div style={styles.tabContainer}>
                    <TabButton label="Crops for Sale" isActive={activeTab === 'crops'} onClick={() => setActiveTab('crops')} />
                    <TabButton label="Farmers" isActive={activeTab === 'farmers'} onClick={() => setActiveTab('farmers')} />
                    <TabButton label="Traders" isActive={activeTab === 'traders'} onClick={() => setActiveTab('traders')} />
                </div>

                <div style={styles.tabContent}>
                    {activeTab === 'crops' && <CropsGrid crops={crops} />}
                    {activeTab === 'farmers' && <EnhancedTable users={farmers} title="Registered Farmers" />}
                    {activeTab === 'traders' && <EnhancedTable users={traders} title="Verified Traders" />}
                </div>
            </div>
        </div>
    );
}

// --- Child Components (TabButton, CropsGrid, EnhancedTable) ---
// These remain the same as the previous version...
const TabButton = ({ label, isActive, onClick }) => {
    const activeStyle = { ...styles.tabButton, color: '#2563eb', borderBottom: '3px solid #2563eb' };
    return <button style={isActive ? activeStyle : styles.tabButton} onClick={onClick}>{label}</button>;
};
const CropsGrid = ({ crops }) => (
    <div style={styles.cropsGrid}>
        {crops.length > 0 ? crops.map(crop => (
            <div key={crop._id} style={styles.cropCard}>
                <img src={crop.image} alt={crop.name} style={styles.cropImage} />
                <div style={styles.cropCardContent}>
                    <h3 style={styles.cropName}>{crop.name}</h3>
                    <p style={styles.cropDetail}><b>Weight:</b> {crop.weight} tons</p>
                    <p style={styles.cropPrice}>₹{crop.price.toLocaleString()} / ton</p>
                    <p style={styles.cropSeller}><b>Seller:</b> {crop.seller.fullName}</p>
                    <button style={styles.contactButton}>Contact Seller</button>
                </div>
            </div>
        )) : <p>No crops currently listed.</p>}
    </div>
);
const EnhancedTable = ({ users, title }) => (
    <div>
        <h3 style={styles.tableTitle}>{title}</h3>
        <table style={styles.table}>
            <thead>
                <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeaderCell}>Name</th>
                    <th style={styles.tableHeaderCell}>Location</th>
                    <th style={styles.tableHeaderCell}>Email</th>
                    <th style={styles.tableHeaderCell}>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                        <td style={styles.tableCell}>{user.fullName}</td>
                        <td style={styles.tableCell}>{user.location}</td>
                        <td style={styles.tableCell}>{user.email}</td>
                        <td style={styles.tableCell}><span style={styles.statusBadge}>{user.status}</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Styles Object ---
const styles = {
    // Add new styles for modal and form here
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1e3a8a',
        marginBottom: '1.5rem',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    formRow: {
        display: 'flex',
        gap: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: '#4a5568',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
    },
    fileInput: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
    },
    imagePreview: {
        marginTop: '1rem',
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    modalActions: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        background: 'transparent',
        fontWeight: '600',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        background: '#2563eb',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
    },
    // Existing styles
    pageContainer: { padding: '2rem', minHeight: '100vh' },
    tradeCenterContainer: { maxWidth: "1200px", margin: "2rem auto", backgroundColor: "white", borderRadius: "16px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", padding: "2rem 2.5rem" },
    centeredMessage: { padding: '5rem', textAlign: 'center', fontSize: '1.2rem' },
    headerContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    header: { color: "#1e3a8a", fontSize: '2.5rem', fontWeight: 'bold', margin: 0 },
    subtitle: { color: '#4a5568', fontSize: '1.1rem', margin: 0 },
    listCropButton: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#16a34a',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    tabContainer: { display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' },
    tabButton: { padding: '1rem 1.5rem', border: 'none', background: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', color: '#4a5568', borderBottom: '3px solid transparent', transition: 'all 0.3s ease' },
    tabContent: { padding: '1rem 0' },
    cropsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    cropCard: { backgroundColor: '#f8fafc', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
    cropImage: { width: "100%", height: "200px", objectFit: "cover" },
    cropCardContent: { padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 },
    cropName: { margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#1e3a8a' },
    cropDetail: { margin: '0.25rem 0', color: '#4a5568' },
    cropPrice: { margin: '0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#166534' },
    cropSeller: { margin: '0.25rem 0', fontSize: '0.9rem', color: '#64748b', flexGrow: 1 },
    contactButton: { marginTop: '1rem', width: '100%', padding: '0.75rem', border: 'none', borderRadius: '8px', backgroundColor: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer' },
    tableTitle: { color: '#1e3a8a', marginBottom: '1rem' },
    table: { width: "100%", borderCollapse: "collapse" },
    tableHeaderRow: { backgroundColor: "#f1f5f9" },
    tableHeaderCell: { padding: "12px 15px", borderBottom: "2px solid #e2e8f0", textAlign: 'left', fontWeight: '600' },
    tableRowEven: { backgroundColor: 'white' },
    tableRowOdd: { backgroundColor: '#f8fafc' },
    tableCell: { padding: "12px 15px", borderBottom: "1px solid #e2e8f0" },
    statusBadge: { padding: '0.25rem 0.75rem', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#166534', fontWeight: '500', fontSize: '0.85rem' }
};

// Mock Data Generator
const getMockData = () => ({
    crops: [
        { _id: 'c1', name: 'Sona Masoori Rice', weight: 25, price: 45000, image: 'https://images.unsplash.com/photo-1586201375765-c12eda5741e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHwlcmljZSUyMHBhZGR5fGVufDB8fHx8MTcyMjYyNzc2N3ww&ixlib=rb-4.0.3&q=80&w=400', seller: { fullName: 'Ramesh Kumar' } },
        { _id: 'c2', name: 'Lokwan Wheat', weight: 40, price: 28000, image: 'https://images.unsplash.com/photo-1599202525542-49a1cb551e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDV8fHdoZWF0JTIwZmllbGR8ZW58MHx8fHwxNzIyNjI3Nzk2fDA&ixlib=rb-4.0.3&q=80&w=400', seller: { fullName: 'Suresh Patel' } },
        { _id: 'c3', name: 'Organic Turmeric', weight: 10, price: 85000, image: 'https://images.unsplash.com/photo-1598555762319-3c7457371557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDE0fHx0dXJtZXJpYyUyMHJvb3R8ZW58MHx8fHwxNzIyNjI3ODIzfDA&ixlib=rb-4.0.3&q=80&w=400', seller: { fullName: 'Priya Singh' } }
    ],
    farmers: [
        { _id: 'f1', fullName: 'Ramesh Kumar', email: 'ramesh.k@example.com', location: 'Raipur, Chhattisgarh', status: 'Verified ✔️' },
        { _id: 'f2', fullName: 'Suresh Patel', email: 's.patel@example.com', location: 'Bilaspur, Chhattisgarh', status: 'Verified ✔️' },
        { _id: 'f3', fullName: 'Priya Singh', email: 'priya.s@example.com', location: 'Durg, Chhattisgarh', status: 'Verified ✔️' }
    ],
    traders: [
        { _id: 't1', fullName: 'Gupta Trading Co.', email: 'contact@guptatrading.com', location: 'Raipur, Chhattisgarh', status: 'Licensed' },
        { _id: 't2', fullName: 'Global Agro Exports', email: 'exports@globalagro.com', location: 'Mumbai, Maharashtra', status: 'Licensed' }
    ]
});

export default TradeCenterPage;