import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import AudienceForm from './components/AudienceForm';
import CampaignForm from './components/CampaignForm';
import './index.css'; 

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/customers">Add Customer</Link></li>
                        <li><Link to="/orders">Add Order</Link></li>
                        <li><Link to="/audiences">Create Audience</Link></li>
                        <li><Link to="/campaigns">Send Campaign</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Mini CRM</h1>} />
                    <Route path="/customers" element={<CustomerForm />} />
                    <Route path="/orders" element={<OrderForm />} />
                    <Route path="/audiences" element={<AudienceForm />} />
                    <Route path="/campaigns" element={<CampaignForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
