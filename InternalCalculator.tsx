import React from "react";
import ShowerCalculator from "./ShowerCalculator";
import { PricingProvider } from "@/contexts/PricingContext";
export default function InternalCalculator() {
  return (
    <PricingProvider pricingTier="wholesale">
      <ShowerCalculator audience="wholesale" />
    </PricingProvider>
  );
}
