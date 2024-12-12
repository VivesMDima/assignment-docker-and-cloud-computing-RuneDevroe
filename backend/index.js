require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');



// Initialize Express
const app = express();

// Allow all origins (development only)
app.use(cors());

app.use(express.json());  // To parse JSON in request body

// MongoDB connection URI from the .env file
const uri = process.env.MONGO_URI; // mongodb://127.0.0.1:27017/myDatabase (local) or MongoDB Atlas URI
const dbName = 'myDatabase';  // Replace with your database name
let db;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

// Test route for checking connection
app.get('/test', (req, res) => {
  res.send('MongoDB connected and Express is running!');
});

// Route to get all units from the database
app.get('/units', async (req, res) => {
  try {
    const collection = db.collection('tauUnits');
    const units = await collection.find({}).toArray();
    res.json(units);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching units', error: err });
  }
});

// Route to add a new unit to the database
app.post('/units', async (req, res) => {
  try {
    const collection = db.collection('tauUnits');
    const newUnit = req.body;

    // Insert the unit into the database
    const result = await collection.insertOne(newUnit);

    // Create response
    const insertedUnit = {
      _id: result.insertedId,
      ...newUnit,
    };

    console.log('Response to frontend:', insertedUnit); // Log the response
    res.status(201).json(insertedUnit); // Send as JSON
  } catch (err) {
    console.error('Error creating unit:', err.message || err);
    res.status(500).json({ message: 'An error occurred', error: err.message || err });
  }
});

// Route to update a unit by its ID (PUT)
app.put('/units/:id', async (req, res) => {
  const { id } = req.params; // Extract the unit ID from URL
  const updatedUnit = req.body; // The new data for the unit

  try {
    const collection = db.collection('tauUnits');
    const result = await collection.updateOne(
      {_id: new mongoose.Types.ObjectId(id) }, // Find the unit by ID
      { $set: updatedUnit } // Update the unit with the new data
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Unit not found or no change made' });
    }

    // Send the updated unit as response
    res.status(200).json({ message: 'Unit updated successfully', updatedUnit });
  } catch (err) {
    console.error('Error updating unit:', err.message || err);
    res.status(500).json({ message: 'An error occurred', error: err.message || err });
  }
});

// Route to delete a unit by its ID (DELETE)
app.delete('/units/:id', async (req, res) => {
  const { id } = req.params; // Extract the unit ID from URL

  try {
    const collection = db.collection('tauUnits');
    const result = await collection.deleteOne({_id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (err) {
    console.error('Error deleting unit:', err.message || err);
    res.status(500).json({ message: 'An error occurred', error: err.message || err });
  }
});

// Route to get a unit by ID
app.get('/units/:id', async (req, res) => {
  const { id } = req.params;  // Extract the unit ID from the request params

  try {
    const collection = db.collection('tauUnits');
    const unit = await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });  // Query the database for the unit by _id

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    res.json(unit);  // Return the unit data if found
  } catch (err) {
    console.error('Error fetching unit by ID:', err);
    res.status(500).json({ message: 'Error fetching unit by ID', error: err.message });
  }
});


// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
  connectToDatabase();
});
