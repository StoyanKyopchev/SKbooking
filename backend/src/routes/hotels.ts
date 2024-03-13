import express, { Request, Response } from "express";
import { HotelType } from "../models/hotel";
import Hotel from "../models/hotel";

const router = express.Router();

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const hotelsToSkip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(hotelsToSkip).limit(pageSize);

    const total = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Oops, something went wrong." });
  }
});

export default router;
