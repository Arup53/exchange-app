"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

interface FAQS {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs: FAQS[] = [
    {
      question: "What is xCEX?",
      answer:
        "Aave is a decentralized non-custodial liquidity protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized or undercollateralized fashion.",
    },
    {
      question: "Where are supplied tokens stored?",
      answer:
        "Your supplied tokens are stored in Aave's smart contracts. When you supply tokens, you receive aTokens in return which represent your deposit and automatically earn interest. These tokens remain in your wallet and you maintain full control over them.",
    },
    {
      question: "Does xCEX have risks?",
      answer:
        "Yes, like all DeFi protocols, Aave has risks including smart contract risk, liquidation risk for borrowers, and market volatility. The protocol has been audited multiple times and has a Safety Module to help mitigate risks, but users should always do their own research and never invest more than they can afford to lose.",
    },
    {
      question: "What is the xCEX token?",
      answer:
        "AAVE is the native governance token of the Aave protocol. Token holders can vote on protocol upgrades and decisions. AAVE can also be staked in the Safety Module to provide security to the protocol and earn staking rewards.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-white py-20">
      <div className="w-1/2 mx-auto flex  justify-between">
        <h1 className="text-5xl font-bold mb-12 text-black">FAQs</h1>

        <div className="space-y-0 bg-white rounded-lg overflow-hidden shadow-sm text-black w-[650px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus
                    className="w-6 h-6 text-cyan-500 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
