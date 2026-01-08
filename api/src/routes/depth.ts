import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { GET_DEPTH } from "../types";
import axios from "axios";

export const depthRouter = Router();

depthRouter.get("/", async (req, res) => {
  const { symbol } = req.query;
  console.log(req.query);
  //   console.log(symbol);
  // const response = await RedisManager.getInstance().sendAndAwait({
  //     type: GET_DEPTH,
  //     data: {
  //         market: symbol as string
  //     }
  // });
  const response = await axios.get(
    `https://api.backpack.exchange/api/v1/depth?symbol=${symbol}`
  );

  return res.json(response.data);
  //   res.json({ m: "ji" });
});
