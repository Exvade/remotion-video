export type CostComparisonProps = {
  physicalPricePerPcs: number;
  physicalQuantity: number;
  physicalShippingCost: number;
  digitalPrice: number;
  brandName?: string;
  /** Voiceover + music + SFX. Narration is recorded for the default numbers. */
  withAudio?: boolean;
};
