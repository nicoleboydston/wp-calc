import React from "react";
import ShowerCalculator from "./ShowerCalculator";
import { PricingProvider } from "@/contexts/PricingContext";
export default function CustomerCalculator() {
  return (
    <PricingProvider pricingTier="retail">
      <ShowerCalculator audience="retail" />
    </PricingProvider>
  );
}
