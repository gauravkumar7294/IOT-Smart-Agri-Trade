import React, { useState } from "react";

function KnowYourCropsPage() {
    // State now holds the full URL from the user.
    const [apiUrl, setApiUrl] = useState("");
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetData = async () => {
        if (!apiUrl) {
            setError("Please enter the API URL.");
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            // Clean the user's URL input to remove accidental spaces.
            const cleanApiUrl = apiUrl.trim();
        
            const response = await fetch(cleanApiUrl);
            
            // This entire error-handling block is necessary for ANY fetch call
            // where the error format is unpredictable.
            if (!response.ok) {
                const errorBodyAsText = await response.text();
                try {
                    const errorJson = JSON.parse(errorBodyAsText);
                    throw new Error(errorJson.error.message || "An error occurred.");
                } catch (parseError) {
                    throw new Error(errorBodyAsText);
                }
            }
            
            const result = await response.json();
            setData(result);

        } catch (err) {
            console.error("DEBUGGING: The final error object is:", err);
            setError(err.message || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 text-center">
            <h2 className="text-3xl font-bold mb-6">🌾 Know Your Crops</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="Enter the full API URL"
                    style={{ padding: '10px', width: '350px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleGetData}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        cursor: 'pointer',
                        opacity: loading ? 0.6 : 1,
                    }}
                >
                    {loading ? "Loading..." : "Get Data"}
                </button>
            </div>

            {/* Display Area */}
            {loading && <div className="p-5 text-center">Loading sensor data...</div>}
            {error && <p style={{ color: "red", background: 'white', padding: '1rem', borderRadius: '8px', maxWidth: '400px', margin: 'auto', wordBreak: 'break-all' }}><strong>Error:</strong> {error}</p>}
            {data && (
                <div style={{ backgroundColor: "rgba(240, 244, 247, 0.9)", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: "400px", margin: "auto", textAlign: "left" }}>
                    <h3 className="text-2xl font-semibold mb-4">📊 Live Sensor Data</h3>
                    <p className="text-lg">🌡️ <strong>Temperature:</strong> {data.v5 !== undefined ? `${data.v5} °C` : "N/A"}</p>
                    <p className="text-lg">💧 <strong>Humidity:</strong> {data.v6 !== undefined ? `${data.v6} %` : "N/A"}</p>
                </div>
            )}
        </div>
    );
}

export default KnowYourCropsPage;