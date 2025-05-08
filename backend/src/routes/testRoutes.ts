import express, { Request, Response } from "express";

const testrouter = express.Router();

// Test endpoint
testrouter.get("/", async (req: Request, res: Response) => {
  res.status(201).json({ message: "Test endpoint hit successfully!" });
});

export default testrouter;
