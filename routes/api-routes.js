import fs from "fs/promises";
const dbPath = "./db/db.json";

let data;

async function loadData() {
  try {
    const fileData = await fs.readFile(dbPath, "utf8");
    data = JSON.parse(fileData);
  } catch (err) {
    console.error("Error loading data:", err);
    data = [];
  }
}

loadData();

export default function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(data);
  });

  app.get("/api/notes/:id", (req, res) => {
    const noteId = Number(req.params.id);
    res.json(data.find((note) => note.id === noteId.toString()));
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const newNote = req.body;
      const uniqueId = data.length.toString();
      newNote.id = uniqueId;
      data.push(newNote);
      
      await fs.writeFile(dbPath, JSON.stringify(data));
      
      res.json(data);
    } catch (err) {
      console.error("Error saving new note:", err);
      res.status(500).send("Error saving new note.");
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;
    data = data.filter((note) => note.id !== noteId);

    for (let i = 0; i < data.length; i++) {
      data[i].id = i.toString();
    }

    try {
      await fs.writeFile(dbPath, JSON.stringify(data));
      res.json(data);
    } catch (err) {
      console.error("", err);
      res.status(500).send("Error");
    }
  });
}