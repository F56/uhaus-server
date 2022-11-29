import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const permission = await prisma.permission.create({
      data: {
        name,
      },
    });
    return res.status(200).json({ permission });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findAll = async (_req: Request, res: Response) => {
  try {
    const permissions = await prisma.permission.findMany();
    return res.status(200).json({ permissions });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const permission = await prisma.permission.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ permission });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const permission = await prisma.permission.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
    return res.status(200).json({ permission });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
};
