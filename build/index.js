"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const s3_1 = __importDefault(require("./aws/s3"));
const formidable_1 = __importDefault(require("formidable"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://www.uhaus.com",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.get("/api", (_req, res) => {
    // serve the index.html file
    res.sendFile(path_1.default.join(__dirname, "public/index.html"));
});
app.post("/api/upload", (req, res) => {
    const form = new formidable_1.default.IncomingForm({
        uploadDir: path_1.default.join(__dirname, "public/uploads/images"),
        keepExtensions: true,
        multiples: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
    });
    const deleteFile = (path) => {
        fs_1.default.unlink(path, (err) => {
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
            const images = files.images.map((image) => {
                return {
                    name: image.newFilename,
                    path: image.filepath,
                };
            });
            const promises = images.map((image) => {
                const file = fs_1.default.readFileSync(image.path);
                return (0, s3_1.default)(file, image.name);
            });
            return Promise.all(promises)
                .then((results) => {
                images.forEach((image) => {
                    deleteFile(image.path);
                });
                return res.status(200).json({ results, total: results.length });
            })
                .catch((err) => {
                images.forEach((image) => {
                    deleteFile(image.path);
                });
                return res.status(500).json({ error: err });
            });
        }
        else {
            const image = {
                name: files.images.newFilename,
                path: files.images.filepath,
            };
            const file = fs_1.default.readFileSync(image.path);
            return (0, s3_1.default)(file, image.name)
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
// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });
exports.default = app;
