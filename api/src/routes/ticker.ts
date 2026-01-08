import { Router } from "express";
import axios from "axios";
export const tickersRouter = Router();

tickersRouter.get("/", async (req, res) => {
  const response = await axios.get(
    "https://api.backpack.exchange/api/v1/tickers"
  );
  res.json(response.data);
});
