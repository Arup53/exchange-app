import axios from "axios";
import { Router } from "express";

export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
  const { market } = req.query;
  //   console.log(market);
  //   // get from DB
  //   const response = await axios.get(
  //     `https://api.backpack.exchange/api/v1/depth?symbol=${market}`
  //   );

  //   res.json(response.data);
  // res.json({ mes: "hello" });
});
