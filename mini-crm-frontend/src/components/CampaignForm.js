import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignForm = () => {
    const [audienceId, setAudienceId] = useState('');
    const [message, setMessage] = useState('');
    const [audiences, setAudiences] = useState([]);

    useEffect(() => {
        const fetchAudiences = async () => {
            const response = await axios.get('http://localhost:3000/audiences');
            setAudiences(response.data);
        };
        fetchAudiences();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaign = { audience_id: audienceId, message };
        await axios.post('http://localhost:3000/campaigns', campaign);
        alert('Campaign sent');
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={audienceId} onChange={(e) => setAudienceId(e.target.value)}>
                <option value="" disabled>Select Audience</option>
                {audiences.map(audience => (
                    <option key={audience.id} value={audience.id}>{audience.name}</option>
                ))}
            </select>
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Send Campaign</button>
        </form>
    );
};

export default CampaignForm;
