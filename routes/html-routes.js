import path from "path";

export default function (app) {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/assets/index.html"));
  });

  app.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/assets/notes.html"));
  });
}