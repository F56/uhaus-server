import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const create = async (req: Request, res: Response) => {
  const { name, email, password, mobile, country, city, university } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
        country,
        city,
        university,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findAll = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, mobile, country, city, university } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        password,
        mobile,
        country,
        city,
        university,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { create, findAll, findOne, update, remove, login };
