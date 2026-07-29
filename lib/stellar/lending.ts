export interface LoanPosition {
  collateral: string;
  debt: string;
  liquidationPrice: string;
  healthFactor: string;
}

export function calculateHealthFactor(
  collateralValue: string,
  debtValue: string,
  liquidationThreshold: number = 0.8,
): string {
  const cv = Number(collateralValue);
  const dv = Number(debtValue);
  if (dv === 0) return "infinity";
  return ((cv * liquidationThreshold) / dv).toString();
}

export function calculateLiquidationPrice(
  debtValue: string,
  collateralAmount: string,
  liquidationThreshold: number = 0.8,
): string {
  const dv = Number(debtValue);
  const ca = Number(collateralAmount);
  if (ca === 0) return "0";
  return (dv / (ca * liquidationThreshold)).toString();
}

export function isLiquidatable(healthFactor: string): boolean {
  if (healthFactor === "infinity") return false;
  return Number(healthFactor) < 1;
}
