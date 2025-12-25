// Indian number formatting utilities

/**
 * Format number in Indian numbering system (lakhs, crores)
 */
export function formatIndianNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return "—";
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";
  
  if (absNum >= 10000000) {
    // Crores (1,00,00,000+)
    return sign + (absNum / 10000000).toFixed(2) + " Cr";
  } else if (absNum >= 100000) {
    // Lakhs (1,00,000+)
    return sign + (absNum / 100000).toFixed(2) + " L";
  } else if (absNum >= 1000) {
    // Thousands
    return sign + (absNum / 1000).toFixed(2) + "K";
  }
  
  return sign + absNum.toFixed(2);
}

/**
 * Format currency in INR with Indian numbering
 */
export function formatINR(amount: number, showSymbol = true): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "—";
  
  const formatter = new Intl.NumberFormat("en-IN", {
    style: showSymbol ? "currency" : "decimal",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  
  return formatter.format(amount);
}

/**
 * Format market cap in crores
 */
export function formatMarketCap(crores: number): string {
  if (crores === undefined || crores === null || isNaN(crores)) return "—";
  
  if (crores >= 100000) {
    // Lakh crores
    return `₹${(crores / 100000).toFixed(2)} L Cr`;
  } else if (crores >= 1000) {
    // Thousand crores
    return `₹${(crores / 1000).toFixed(2)}K Cr`;
  }
  
  return `₹${crores.toFixed(2)} Cr`;
}

/**
 * Format percentage with sign
 */
export function formatPercentage(value: number, showSign = true): string {
  if (value === undefined || value === null || isNaN(value)) return "—";
  
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format ratio (e.g., PE ratio, D/E ratio)
 */
export function formatRatio(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return "—";
  return value.toFixed(2);
}

/**
 * Get color class based on value (positive = green, negative = red)
 */
export function getValueColorClass(value: number): string {
  if (value > 0) return "text-success";
  if (value < 0) return "text-danger";
  return "text-muted-foreground";
}

/**
 * Get background color class based on value
 */
export function getValueBgClass(value: number): string {
  if (value > 0) return "bg-success-muted text-success";
  if (value < 0) return "bg-danger-muted text-danger";
  return "bg-muted text-muted-foreground";
}
