"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const s3 = new s3_1.default({
    accessKeyId: "AKIA6ELI2U66J4VETQWY",
    secretAccessKey: "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",
    region: "us-east-1",
});
const uploadFile = (path, _name) => {
    const params = {
        Bucket: "uhaus/public/uploads/images",
        Key: _name,
        Body: path,
    };
    return s3.upload(params).promise();
};
exports.default = uploadFile;
