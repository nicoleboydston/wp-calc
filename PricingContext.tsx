import React, { createContext, useContext } from 'react'

export type PricingTier = 'retail' | 'wholesale'
interface Ctx { tier: PricingTier }
const Ctx = createContext<Ctx>({ tier: 'retail' })

export function PricingProvider({ pricingTier, children }: { pricingTier: PricingTier; children: React.ReactNode }) {
  return <Ctx.Provider value={{ tier: pricingTier }}>{children}</Ctx.Provider>
}

export function usePricing(){ return useContext(Ctx) }
