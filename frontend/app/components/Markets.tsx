"use client";

import { useEffect, useState } from "react";
import { Ticker, TickerCoingecko } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import { useRouter } from "next/navigation";

const matchSymbolImage = {
  BTC_USDC: "./coinsSymbol/btc.webp",
  BTC_USDC_PERP: "./coinsSymbol/btc.webp",
  CLOUD_USDC: "./coinsSymbol/CLOUD_128x128.webp",
  CRV_USDC_PERP: "./coinsSymbol/crv.webp",
  DEEP_USDC: "./coinsSymbol/deep.webp",
  DOGE_USDC: "./coinsSymbol/doge.webp",
  DOGE_USDC_PERP: "./coinsSymbol/doge.webp",
  DOT_USDC_PERP: "./coinsSymbol/dot.webp",
  DRIFT_USDC: "./coinsSymbol/drift.webp",
  ENA_USDC: "./coinsSymbol/ena.webp",
  ENA_USDC_PERP: "./coinsSymbol/ena.webp",
  ES_USDC: "./coinsSymbol/es.webp",
  ETH_USDC: "./coinsSymbol/eth.webp",
  ETH_USDC_PERP: "./coinsSymbol/eth.webp",
  FARTCOIN_USDC_PERP: "./coinsSymbol/fartcoin.webp",
  FLOCK_USDC: "./coinsSymbol/flock.webp",
  FLOCK_USDC_PERP: "./coinsSymbol/flock.webp",
  HBAR_USDC_PERP: "./coinsSymbol/hbar.webp",
  HYPE_USDC: "./coinsSymbol/hype.webp",
  HYPE_USDC_PERP: "./coinsSymbol/hype.webp",
  IO_USDC_PERP: "./coinsSymbol/io.svg",
  IP_USDC_PERP: "./coinsSymbol/ip.webp",
  JTO_USDC: "./coinsSymbol/jto.webp",
  JTO_USDC_PERP: "./coinsSymbol/jto.webp",
  JUP_USDC_PERP: "./coinsSymbol/jup.webp",
  KAITO_USDC_PERP: "./coinsSymbol/kaito.webp",
  KMNO_USDC: "./coinsSymbol/kmno.webp",
};

export const Markets = () => {
  const [tickers, setTickers] = useState<Ticker[]>();

  useEffect(() => {
    getTickers().then((m) => setTickers(m.slice(22, 50)));
  }, []);

  return (
    <div className="flex flex-col flex-1 max-w-[1280px] w-full">
      <div className="flex flex-col min-w-[700px] flex-1 w-full">
        <div className="flex flex-col w-full rounded-lg bg-baseBackgroundL1 px-5 py-3">
          <table className="w-full table-auto">
            <MarketHeader />
            {tickers &&
              tickers?.map((m) => <MarketRow key={m.symbol} market={m} />)}
          </table>
        </div>
      </div>
    </div>
  );
};

function MarketRow({ market }: { market: Ticker }) {
  const router = useRouter();
  let image = "";

  if (market.symbol in matchSymbolImage) {
    image = matchSymbolImage[market.symbol];
  }

  return (
    <tr
      className="cursor-pointer border-t border-baseBorderLight hover:bg-white/7 w-full"
      onClick={() => router.push(`/trade/${market.symbol}`)}
    >
      <td className="px-1 py-3">
        <div className="flex shrink">
          <div className="flex items-center undefined">
            <div
              className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
              style={{ width: "40px", height: "40px" }}
            >
              <div className="relative">
                <img
                  alt={market.symbol}
                  src={`${image ? image : ""}`}
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  data-nimg="1"
                  className=""
                />
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
                {market.symbol}
              </p>
              <div className="flex items-center justify-start flex-row gap-2">
                <p className="flex-medium text-left text-xs leading-5 text-baseTextMedEmphasis">
                  {market.symbol}
                </p>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-1 py-3">
        {/* <p className="text-base font-medium tabular-nums">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(market.current_price)}
        </p> */}
        {market.lastPrice}
      </td>
      {/* <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">
          {
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(market.market_cap)}
            </span>
          }
        </p>
      </td> */}
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">
          {market.quoteVolume}
        </p>
      </td>

      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums text-greenText">
          {market.priceChangePercent} %
        </p>
      </td>
    </tr>
  );
}

function MarketHeader() {
  return (
    <thead>
      <tr className="">
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Name<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Price<span className="w-[16px]"></span>
          </div>
        </th>
        {/* <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Market Cap<span className="w-[16px]"></span>
          </div>
        </th> */}
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Volume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-down h-4 w-4"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Change<span className="w-[16px]"></span>
          </div>
        </th>
      </tr>
    </thead>
  );
}
