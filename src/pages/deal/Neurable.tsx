
import React, { useEffect } from "react";
import { DealTemplate } from "@/components/deal/DealTemplate";
import neurableConfig from "@/config/deal-pages/neurable";

const NeurableDealPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <DealTemplate config={neurableConfig} />;
};

export default NeurableDealPage;
