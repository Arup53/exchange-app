import { Router } from "express";
import axios from "axios";
export const tickersRouter = Router();

tickersRouter.get("/", async (req, res) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  res.json(response.data);
});
