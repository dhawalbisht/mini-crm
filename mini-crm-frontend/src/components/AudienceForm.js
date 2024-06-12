import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = () => {
    const [name, setName] = useState('');
    const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);

    const handleRuleChange = (index, key, value) => {
        const newRules = [...rules];
        newRules[index][key] = value;
        setRules(newRules);
    };

    const addRule = () => {
        setRules([...rules, { field: '', operator: '', value: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const audience = { name, rules: JSON.stringify(rules) };
        await axios.post('http://localhost:3000/audiences', audience);
        alert('Audience created');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Audience Name" value={name} onChange={(e) => setName(e.target.value)} />
            {rules.map((rule, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Field"
                        value={rule.field}
                        onChange={(e) => handleRuleChange(index, 'field', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Operator"
                        value={rule.operator}
                        onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={rule.value}
                        onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={addRule}>Add Rule</button>
            <button type="submit">Create Audience</button>
        </form>
    );
};

export default AudienceForm;
