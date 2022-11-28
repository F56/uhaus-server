import express from "express";
import cors from "cors";
import uploadFile from "./aws/s3";
import formidable from "formidable";
import path from "path";
import fs from "fs";

const app: express.Application = express();

app.use(
  cors({
    origin: "http://www.uhaus.com",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api", (_req, res) => {
  // serve the index.html file
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/upload", (req, res) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    multiples: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  const deleteFile = (path: string) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  };

  form.parse(req, (err, _, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    if (Array.isArray(files.images)) {
      const images = files.images.map((image: any) => {
        return {
          name: image.newFilename,
          path: image.filepath,
        };
      });
      const promises = images.map((image: any) => {
        const file = fs.readFileSync(image.path);
        return uploadFile(file, image.name);
      });
      return Promise.all(promises)
        .then((results) => {
          images.forEach((image: any) => {
            deleteFile(image.path);
          });
          return res.status(200).json({ results, total: results.length });
        })
        .catch((err) => {
          images.forEach((image: any) => {
            deleteFile(image.path);
          });
          return res.status(500).json({ error: err });
        });
    } else {
      const image = {
        name: files.images.newFilename,
        path: files.images.filepath,
      };
      const file = fs.readFileSync(image.path);
      return uploadFile(file, image.name)
        .then((data) => {
          deleteFile(image.path);
          return res.status(200).json({ results: [data], total: 1 });
        })
        .catch((err) => {
          deleteFile(image.path);
          return res.status(500).json({ error: err });
        });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

export default app;
