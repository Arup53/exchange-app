import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { GET_DEPTH } from "../types";

export const depthRouter = Router();

depthRouter.get("/", async (req, res) => {
  const { symbol } = req.query;
  console.log(symbol);
  //   const response = await RedisManager.getInstance().sendAndAwait({
  //     type: GET_DEPTH,
  //     data: {
  //       market: symbol as string,
  //     },
  //   });
  // res.json(response.payload);

  const response = await fetch(
    `https://api.backpack.exchange/api/v1/depth?symbol=${symbol}`
  );

  console.log(response);

  res.json(response);
});
