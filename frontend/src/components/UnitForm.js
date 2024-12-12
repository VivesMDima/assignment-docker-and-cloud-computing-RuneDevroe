import React, { useState } from 'react';

//const API_URL = process.env.REACT_APP_API_URL;

async function addUnit(unit) {
  const response = await fetch(`http://localhost:5000/units`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(unit),
  });
  const data = await response.json();
  return data;
}


function AddUnitForm() {
  const [unit, setUnit] = useState({
    name: '',
    description: '',
    attack: 0,
    defense: 0,
    health: 0,
  });

  const [message] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit({ ...unit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addUnit(unit);
    console.log(response)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="number" name="attack" placeholder="Attack" onChange={handleChange} />
      <input type="number" name="defense" placeholder="Defense" onChange={handleChange} />
      <input type="number" name="health" placeholder="Health" onChange={handleChange} />
      <button type="submit">Add Unit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddUnitForm;
