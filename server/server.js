//server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UserData = require('./models/UserData');
const cors = require('cors');
const { ObjectId } = require('mongodb');


mongoose.connect('mongodb://localhost:27017/calendarApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    });

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 요청 처리
app.use(express.static(path.join(__dirname, '../client', 'dist')));

// 이벤트 저장
app.post('/api/events', async (req, res) => {
    const { id, title, start, end, color, allDay, category } = req.body;
    try {
        const newEvent = new UserData({ id, title, allDay, start, end, color, category });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: 'Event could not be saved.' });
    }
});

// 이벤트 가져오기
app.get('/api/events', async (req, res) => {
    try {
        const events = await UserData.find({});
        console.log(events)
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: 'Events could not be retrieved.' });
    }
});

// 이벤트 삭제
app.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserData.findOneAndDelete({ _id: new ObjectId(id) }); // Use _id and convert to ObjectId
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(400).json({ error: 'Event could not be deleted.' });
    }
});

// 이벤트 수정
app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedEvent = await UserData.findOneAndUpdate(
            { _id: new ObjectId(id) },  // Use _id and convert to ObjectId
            updatedData,
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' }); // Ensure a valid response
          }
          res.status(200).json(updatedEvent); // Valid JSON response
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ error: 'Event could not be updated.' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.
click here http://localhost:${PORT}/`);
});
