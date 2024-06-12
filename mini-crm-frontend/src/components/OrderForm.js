import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [orderAmount, setOrderAmount] = useState(0);
    const [orderDate, setOrderDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = { customer_id: customerId, order_amount: orderAmount, order_date: orderDate };
        await axios.post('http://localhost:3000/orders', order);
        alert('Order added');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            <input type="number" placeholder="Order Amount" value={orderAmount} onChange={(e) => setOrderAmount(e.target.value)} />
            <input type="date" placeholder="Order Date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            <button type="submit">Add Order</button>
        </form>
    );
};

export default OrderForm;
