import { Request, Response } from "express";
import formidable from "formidable";

const create = async (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({
    allowEmptyFiles: false,
    keepExtensions: true,
    multiples: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.send({ fields, files });
  });
};

export default {
  create,
};
