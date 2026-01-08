import { Client } from "pg";
import { Router } from "express";
import { RedisManager } from "../RedisManager";
import axios from "axios";

const pgClient = new Client({
  user: "your_user",
  host: "localhost",
  database: "my_database",
  password: "your_password",
  port: 5432,
});
pgClient.connect();

export const klineRouter = Router();

klineRouter.get("/", async (req, res) => {
  const { symbol, interval, startTime, endTime } = req.query;

  // let query;
  // switch (interval) {
  //     case '1m':
  //         query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
  //         break;
  //     case '1h':
  //         query = `SELECT * FROM klines_1m WHERE  bucket >= $1 AND bucket <= $2`;
  //         break;
  //     case '1w':
  //         query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`;
  //         break;
  //     default:
  //         return res.status(400).send('Invalid interval');
  // }

  // try {
  //     //@ts-ignore
  //     const result = await pgClient.query(query, [new Date(startTime * 1000 as string), new Date(endTime * 1000 as string)]);
  //     res.json(result.rows.map(x => ({
  //         close: x.close,
  //         end: x.bucket,
  //         high: x.high,
  //         low: x.low,
  //         open: x.open,
  //         quoteVolume: x.quoteVolume,
  //         start: x.start,
  //         trades: x.trades,
  //         volume: x.volume,
  //     })));
  // } catch (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  // }

  if (symbol) {
    console.log("this is inside if block", +symbol);
    try {
      const response = await axios.get(
        `https://api.backpack.exchange/api/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`
      );
      return res.json(response.data); // ✅ return here
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Failed to fetch klines" });
    }
  }

  return res.json({ koi: "m" });
});
