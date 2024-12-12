// src/components/UnitsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnitForm from './UnitForm';

const UnitsPage = () => {
  const [units, setUnits] = useState([]);
  const [editingUnit, setEditingUnit] = useState(null);

  // Fetch units from the backend
  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/units');
      console.log(response)
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const deleteUnit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/units/${id}`);
      setUnits(units.filter((unit) => unit._id !== id));  // Remove the unit from the list in the UI
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };
  

  const handleEdit = (unit) => {
    setEditingUnit(unit);
  };

  return (
    <div>
      <h1>T'au Empire Units</h1>
      <UnitForm
        fetchUnits={fetchUnits}
        editingUnit={editingUnit}
        setEditingUnit={setEditingUnit}
      />
      <ul>
        {units.map((unit) => (
          <li key={unit._id}>
            <h3>{unit.name}</h3>
            <p>{unit.description}</p>
            <button onClick={() => handleEdit(unit)}>Edit</button>
            <button onClick={() => deleteUnit(unit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitsPage;
