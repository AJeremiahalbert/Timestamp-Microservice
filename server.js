import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Do not change code below this line

// Layer 1: Handle empty date parameter (User Stories 6 & 7)
app.get("/api", (req, res) => {
  const now = new Date();
  return res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Layer 2: Handle date parameter (User Stories 1, 2, 3, 4, & 5)
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Step A: Check if the parameter is an integer Unix timestamp
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam, 10));
  } else {
    // Step B: Treat as a standard date string
    date = new Date(dateParam);
  }

  // Step C: Check if the date is invalid
  if (date.toString() === "Invalid Date" || isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Step D: Return valid date in unix and utc format
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});