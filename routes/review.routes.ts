import express, { Request, Response } from "express";
import {
  addReviewToProduct,
  addDescriptionToReview,
  getUserReview,
  getLatestReviews,
} from "../controllers/review.controller";
import { errorHandler } from "./errorHandler";

const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = res.locals.user._id;
    const userUrl = res.locals.user.url;

    const review = await addReviewToProduct(
      req.body,
      productId,
      userId,
      userUrl
    );

     res.status(201).json({ review });
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.get("/user", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const { productId } = req.params;

    const review = await getUserReview(productId, userId);

    res.status(200).json({ review });
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.get("/latest", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const { productId } = req.params;
    const end = req.query.end?.toString() ?? "3";

    const reviews = await getLatestReviews(productId, userId, parseInt(end));

    res.status(200).json({ reviews });
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.patch("/:reviewId", async (req: Request, res: Response) => {
  try {
    const { productId, reviewId } = req.params;
    const { description } = req.body;

    if (!description) {
      throw new Error("Please provide a description");
    }

    await addDescriptionToReview(description, productId, reviewId);

    res.status(200).send("Your review was updated");
  } catch (error) {
    errorHandler(error, res);
  }
});

export default reviewRoutes;
