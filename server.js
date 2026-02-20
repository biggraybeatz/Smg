const Track = require('./models/Track');
const Royalty = require('./models/Royalty');

// Fetch Analytics for Chart.js
app.get("/api/analytics/revenue", async (req, res) => {
  // In production, this would aggregate data from the Royalty collection
  const data = [
    { month: 'Jan', total: 10200 },
    { month: 'Feb', total: 11500 },
    { month: 'Mar', total: 10800 },
    { month: 'Apr', total: 13200 },
    { month: 'May', total: 12900 },
    { month: 'Jun', total: 14290 }
  ];
  res.json(data);
});

// Post a new track (Triggered by + Upload Track button)
app.post("/api/tracks/upload", async (req, res) => {
  try {
    const newTrack = new Track(req.body);
    await newTrack.save();
    res.status(201).json({ success: true, track: newTrack });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
