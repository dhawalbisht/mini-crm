import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [totalSpends, setTotalSpends] = useState(0);
    const [visits, setVisits] = useState(0);
    const [lastVisit, setLastVisit] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customer = { name, email, total_spends: totalSpends, visits, last_visit: lastVisit };
        await axios.post('http://localhost:3000/customers', customer);
        alert('Customer added');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Total Spends" value={totalSpends} onChange={(e) => setTotalSpends(e.target.value)} />
            <input type="number" placeholder="Visits" value={visits} onChange={(e) => setVisits(e.target.value)} />
            <input type="date" placeholder="Last Visit" value={lastVisit} onChange={(e) => setLastVisit(e.target.value)} />
            <button type="submit">Add Customer</button>
        </form>
    );
};


export default CustomerForm;
