import { 
  PriceData, 
  FinancialStatements, 
  RevenueSegment, 
  HistoricalData, 
  CompanyInfo, 
  BusinessMoat, 
  NewsItem,
  HistoricalPrice 
} from "@/types/stock";

// Generate mock historical prices for a stock
function generateHistoricalPrices(basePrice: number, volatility: number = 0.02): HistoricalPrice[] {
  const prices: HistoricalPrice[] = [];
  const today = new Date();
  let price = basePrice * 0.85; // Start 15% lower for realistic trend
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const change = (Math.random() - 0.48) * volatility * price; // Slight upward bias
    price = Math.max(price + change, price * 0.5);
    
    const dayVolatility = price * 0.015;
    const high = price + Math.random() * dayVolatility;
    const low = price - Math.random() * dayVolatility;
    const open = low + Math.random() * (high - low);
    
    prices.push({
      date: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(price * 100) / 100,
      volume: Math.floor(1000000 + Math.random() * 5000000)
    });
  }
  
  return prices;
}

// Extended data for each stock
export const extendedStockData: Record<string, {
  priceData: PriceData;
  financials: FinancialStatements;
  revenueBreakdown: RevenueSegment[];
  historicalData: HistoricalData;
  companyInfo: CompanyInfo;
  moat: BusinessMoat;
  news: NewsItem[];
}> = {
  RELIANCE: {
    priceData: {
      current: 2847.55,
      change: 32.45,
      changePercent: 1.15,
      high52Week: 3024.90,
      low52Week: 2220.30,
      open: 2820.00,
      previousClose: 2815.10,
      volume: 8234567,
      historicalPrices: generateHistoricalPrices(2847.55, 0.018)
    },
    financials: {
      incomeStatement: {
        quarterly: [
          { period: "Q3 FY24", revenue: 238560, operatingIncome: 28340, netIncome: 19755, eps: 29.2 },
          { period: "Q2 FY24", revenue: 245230, operatingIncome: 29120, netIncome: 20345, eps: 30.1 },
          { period: "Q1 FY24", revenue: 232890, operatingIncome: 27650, netIncome: 18920, eps: 28.0 },
          { period: "Q4 FY23", revenue: 237550, operatingIncome: 28890, netIncome: 20000, eps: 29.6 }
        ],
        annual: [
          { period: "FY23", revenue: 954230, operatingIncome: 113200, netIncome: 79020, eps: 116.8 },
          { period: "FY22", revenue: 792560, operatingIncome: 98450, netIncome: 67830, eps: 100.3 },
          { period: "FY21", revenue: 539238, operatingIncome: 78230, netIncome: 53739, eps: 79.4 },
          { period: "FY20", revenue: 611645, operatingIncome: 71890, netIncome: 39588, eps: 66.3 }
        ]
      },
      balanceSheet: {
        quarterly: [
          { period: "Q3 FY24", totalAssets: 1823456, totalLiabilities: 956780, totalDebt: 312450, cashAndEquivalents: 145670 },
          { period: "Q2 FY24", totalAssets: 1798234, totalLiabilities: 945230, totalDebt: 308900, cashAndEquivalents: 138920 },
          { period: "Q1 FY24", totalAssets: 1756890, totalLiabilities: 923450, totalDebt: 298760, cashAndEquivalents: 125430 },
          { period: "Q4 FY23", totalAssets: 1712340, totalLiabilities: 912340, totalDebt: 289450, cashAndEquivalents: 118670 }
        ],
        annual: [
          { period: "FY23", totalAssets: 1712340, totalLiabilities: 912340, totalDebt: 289450, cashAndEquivalents: 118670 },
          { period: "FY22", totalAssets: 1589230, totalLiabilities: 845670, totalDebt: 267890, cashAndEquivalents: 98450 },
          { period: "FY21", totalAssets: 1456780, totalLiabilities: 789230, totalDebt: 245670, cashAndEquivalents: 87230 },
          { period: "FY20", totalAssets: 1323450, totalLiabilities: 712340, totalDebt: 223450, cashAndEquivalents: 76890 }
        ]
      },
      cashFlow: {
        quarterly: [
          { period: "Q3 FY24", operatingCashFlow: 45230, investingCashFlow: -28450, financingCashFlow: -12340, freeCashFlow: 32890 },
          { period: "Q2 FY24", operatingCashFlow: 48670, investingCashFlow: -31230, financingCashFlow: -14560, freeCashFlow: 35440 },
          { period: "Q1 FY24", operatingCashFlow: 42890, investingCashFlow: -25670, financingCashFlow: -11230, freeCashFlow: 30220 },
          { period: "Q4 FY23", operatingCashFlow: 51230, investingCashFlow: -34560, financingCashFlow: -15890, freeCashFlow: 38340 }
        ],
        annual: [
          { period: "FY23", operatingCashFlow: 178920, investingCashFlow: -112340, financingCashFlow: -45670, freeCashFlow: 133250 },
          { period: "FY22", operatingCashFlow: 156780, investingCashFlow: -98450, financingCashFlow: -38920, freeCashFlow: 117860 },
          { period: "FY21", operatingCashFlow: 134560, investingCashFlow: -87230, financingCashFlow: -32450, freeCashFlow: 102110 },
          { period: "FY20", operatingCashFlow: 112340, investingCashFlow: -76890, financingCashFlow: -28670, freeCashFlow: 83670 }
        ]
      }
    },
    revenueBreakdown: [
      { segment: "Oil & Gas", revenue: 543230, percentage: 56.9 },
      { segment: "Retail", revenue: 197670, percentage: 20.7 },
      { segment: "Digital Services (Jio)", revenue: 156780, percentage: 16.4 },
      { segment: "Others", revenue: 56550, percentage: 5.9 }
    ],
    historicalData: {
      incomeStatement: [
        { year: "FY24E", revenue: 1012340, netIncome: 86520, eps: 127.8 },
        { year: "FY23", revenue: 954230, netIncome: 79020, eps: 116.8 },
        { year: "FY22", revenue: 792560, netIncome: 67830, eps: 100.3 },
        { year: "FY21", revenue: 539238, netIncome: 53739, eps: 79.4 },
        { year: "FY20", revenue: 611645, netIncome: 39588, eps: 66.3 }
      ],
      balanceSheet: [
        { year: "FY24E", totalAssets: 1856780, totalLiabilities: 978450, equity: 878330 },
        { year: "FY23", totalAssets: 1712340, totalLiabilities: 912340, equity: 800000 },
        { year: "FY22", totalAssets: 1589230, totalLiabilities: 845670, equity: 743560 },
        { year: "FY21", totalAssets: 1456780, totalLiabilities: 789230, equity: 667550 },
        { year: "FY20", totalAssets: 1323450, totalLiabilities: 712340, equity: 611110 }
      ],
      cashFlow: [
        { year: "FY24E", operatingCashFlow: 195670, freeCashFlow: 148230 },
        { year: "FY23", operatingCashFlow: 178920, freeCashFlow: 133250 },
        { year: "FY22", operatingCashFlow: 156780, freeCashFlow: 117860 },
        { year: "FY21", operatingCashFlow: 134560, freeCashFlow: 102110 },
        { year: "FY20", operatingCashFlow: 112340, freeCashFlow: 83670 }
      ]
    },
    companyInfo: {
      ceo: "Mukesh D. Ambani",
      headquarters: "Mumbai, Maharashtra, India",
      founded: "1973",
      employees: 389414,
      website: "www.ril.com"
    },
    moat: {
      competitiveEdge: "Reliance's vertically integrated business model from oil refining to retail creates unmatched cost advantages. Its Jio platform has disrupted telecom with the world's largest data network, while retail operations span 18,000+ stores across India.",
      marketPosition: "India's largest private sector company by market cap. #1 in refining margins globally, #1 in telecom subscribers in India, and rapidly growing to become the largest retailer.",
      innovationFocus: "Heavy investment in 5G infrastructure, green energy (₹75,000 Cr committed), and new commerce platforms integrating online-offline retail experiences.",
      sustainability: "Committed to net-zero carbon by 2035. Investing in solar manufacturing, green hydrogen, and battery storage. Jio's efficient network reduces energy consumption per GB."
    },
    news: [
      { id: "1", title: "Reliance Jio launches 5G services in 50 more cities", source: "Economic Times", date: "2024-01-15" },
      { id: "2", title: "RIL's retail arm expands premium grocery format", source: "Mint", date: "2024-01-12" },
      { id: "3", title: "Reliance New Energy invests in solar cell technology", source: "Business Standard", date: "2024-01-10" },
      { id: "4", title: "Jio Financial Services receives RBI approval for new products", source: "Moneycontrol", date: "2024-01-08" },
      { id: "5", title: "Reliance Retail partners with international luxury brands", source: "LiveMint", date: "2024-01-05" }
    ]
  },
  TCS: {
    priceData: {
      current: 4189.30,
      change: -23.45,
      changePercent: -0.56,
      high52Week: 4592.25,
      low52Week: 3056.45,
      open: 4210.00,
      previousClose: 4212.75,
      volume: 2345678,
      historicalPrices: generateHistoricalPrices(4189.30, 0.015)
    },
    financials: {
      incomeStatement: {
        quarterly: [
          { period: "Q3 FY24", revenue: 60906, operatingIncome: 15226, netIncome: 11735, eps: 32.4 },
          { period: "Q2 FY24", revenue: 59692, operatingIncome: 14923, netIncome: 11342, eps: 31.3 },
          { period: "Q1 FY24", revenue: 59381, operatingIncome: 14845, netIncome: 11074, eps: 30.6 },
          { period: "Q4 FY23", revenue: 59645, operatingIncome: 14911, netIncome: 11753, eps: 32.5 }
        ],
        annual: [
          { period: "FY23", revenue: 243624, operatingIncome: 60906, netIncome: 46904, eps: 129.52 },
          { period: "FY22", revenue: 225458, operatingIncome: 56364, netIncome: 42015, eps: 116.02 },
          { period: "FY21", revenue: 191754, operatingIncome: 47938, netIncome: 35756, eps: 98.77 },
          { period: "FY20", revenue: 171502, operatingIncome: 42875, netIncome: 32430, eps: 89.59 }
        ]
      },
      balanceSheet: {
        quarterly: [
          { period: "Q3 FY24", totalAssets: 178923, totalLiabilities: 89234, totalDebt: 8923, cashAndEquivalents: 45678 },
          { period: "Q2 FY24", totalAssets: 175234, totalLiabilities: 87456, totalDebt: 8756, cashAndEquivalents: 43567 },
          { period: "Q1 FY24", totalAssets: 172345, totalLiabilities: 85678, totalDebt: 8567, cashAndEquivalents: 41234 },
          { period: "Q4 FY23", totalAssets: 169456, totalLiabilities: 83890, totalDebt: 8345, cashAndEquivalents: 38923 }
        ],
        annual: [
          { period: "FY23", totalAssets: 169456, totalLiabilities: 83890, totalDebt: 8345, cashAndEquivalents: 38923 },
          { period: "FY22", totalAssets: 156789, totalLiabilities: 78234, totalDebt: 7823, cashAndEquivalents: 35678 },
          { period: "FY21", totalAssets: 143567, totalLiabilities: 72345, totalDebt: 7234, cashAndEquivalents: 32456 },
          { period: "FY20", totalAssets: 132456, totalLiabilities: 67890, totalDebt: 6789, cashAndEquivalents: 29345 }
        ]
      },
      cashFlow: {
        quarterly: [
          { period: "Q3 FY24", operatingCashFlow: 14567, investingCashFlow: -4567, financingCashFlow: -8234, freeCashFlow: 12345 },
          { period: "Q2 FY24", operatingCashFlow: 13890, investingCashFlow: -4234, financingCashFlow: -7890, freeCashFlow: 11890 },
          { period: "Q1 FY24", operatingCashFlow: 13234, investingCashFlow: -3890, financingCashFlow: -7567, freeCashFlow: 11234 },
          { period: "Q4 FY23", operatingCashFlow: 14234, investingCashFlow: -4123, financingCashFlow: -8123, freeCashFlow: 12123 }
        ],
        annual: [
          { period: "FY23", operatingCashFlow: 55925, investingCashFlow: -16370, financingCashFlow: -31614, freeCashFlow: 47592 },
          { period: "FY22", operatingCashFlow: 51234, investingCashFlow: -14567, financingCashFlow: -28456, freeCashFlow: 43567 },
          { period: "FY21", operatingCashFlow: 45678, investingCashFlow: -12890, financingCashFlow: -25234, freeCashFlow: 38789 },
          { period: "FY20", operatingCashFlow: 41234, investingCashFlow: -11567, financingCashFlow: -22890, freeCashFlow: 35123 }
        ]
      }
    },
    revenueBreakdown: [
      { segment: "Banking, Financial Services & Insurance", revenue: 97450, percentage: 40.0 },
      { segment: "Retail & Consumer Business", revenue: 36544, percentage: 15.0 },
      { segment: "Communications & Media", revenue: 31671, percentage: 13.0 },
      { segment: "Manufacturing", revenue: 26799, percentage: 11.0 },
      { segment: "Technology & Services", revenue: 24362, percentage: 10.0 },
      { segment: "Others", revenue: 26798, percentage: 11.0 }
    ],
    historicalData: {
      incomeStatement: [
        { year: "FY24E", revenue: 262345, netIncome: 50234, eps: 138.75 },
        { year: "FY23", revenue: 243624, netIncome: 46904, eps: 129.52 },
        { year: "FY22", revenue: 225458, netIncome: 42015, eps: 116.02 },
        { year: "FY21", revenue: 191754, netIncome: 35756, eps: 98.77 },
        { year: "FY20", revenue: 171502, netIncome: 32430, eps: 89.59 }
      ],
      balanceSheet: [
        { year: "FY24E", totalAssets: 185234, totalLiabilities: 92345, equity: 92889 },
        { year: "FY23", totalAssets: 169456, totalLiabilities: 83890, equity: 85566 },
        { year: "FY22", totalAssets: 156789, totalLiabilities: 78234, equity: 78555 },
        { year: "FY21", totalAssets: 143567, totalLiabilities: 72345, equity: 71222 },
        { year: "FY20", totalAssets: 132456, totalLiabilities: 67890, equity: 64566 }
      ],
      cashFlow: [
        { year: "FY24E", operatingCashFlow: 58234, freeCashFlow: 49567 },
        { year: "FY23", operatingCashFlow: 55925, freeCashFlow: 47592 },
        { year: "FY22", operatingCashFlow: 51234, freeCashFlow: 43567 },
        { year: "FY21", operatingCashFlow: 45678, freeCashFlow: 38789 },
        { year: "FY20", operatingCashFlow: 41234, freeCashFlow: 35123 }
      ]
    },
    companyInfo: {
      ceo: "K. Krithivasan",
      headquarters: "Mumbai, Maharashtra, India",
      founded: "1968",
      employees: 614795,
      website: "www.tcs.com"
    },
    moat: {
      competitiveEdge: "TCS benefits from long-term client relationships averaging 15+ years. Its 'Machine First' delivery model automates routine work, allowing premium pricing. The company's talent pool of 600,000+ employees creates unmatched delivery capability.",
      marketPosition: "World's 2nd largest IT services company by market cap. #1 in India with dominant market share. Services 2/3 of Fortune 500 companies across 46 countries.",
      innovationFocus: "Investing heavily in AI/ML, cloud migration, and cybersecurity. TCS Pace™ helps clients adopt emerging technologies. Strong R&D partnerships with MIT, CMU, and IITs.",
      sustainability: "Carbon neutral since 2020. Committed to net-zero by 2030. Extensive CSR programs in education, skilling, and healthcare reaching millions of beneficiaries."
    },
    news: [
      { id: "1", title: "TCS wins $500M digital transformation deal with European bank", source: "Economic Times", date: "2024-01-18" },
      { id: "2", title: "TCS to hire 40,000 freshers in FY25 amid demand revival", source: "Mint", date: "2024-01-15" },
      { id: "3", title: "TCS launches new AI-powered cloud platform for enterprises", source: "Business Standard", date: "2024-01-12" },
      { id: "4", title: "Q3 results: TCS reports steady growth, margins improve", source: "Moneycontrol", date: "2024-01-11" },
      { id: "5", title: "TCS expands partnership with Microsoft for cloud services", source: "LiveMint", date: "2024-01-08" }
    ]
  },
  HDFCBANK: {
    priceData: {
      current: 1823.45,
      change: 15.30,
      changePercent: 0.85,
      high52Week: 1892.50,
      low52Week: 1363.55,
      open: 1810.00,
      previousClose: 1808.15,
      volume: 5678234,
      historicalPrices: generateHistoricalPrices(1823.45, 0.016)
    },
    financials: {
      incomeStatement: {
        quarterly: [
          { period: "Q3 FY24", revenue: 71912, operatingIncome: 23456, netIncome: 14330, eps: 18.81 },
          { period: "Q2 FY24", revenue: 69845, operatingIncome: 22678, netIncome: 13890, eps: 18.23 },
          { period: "Q1 FY24", revenue: 68234, operatingIncome: 21890, netIncome: 13456, eps: 17.66 },
          { period: "Q4 FY23", revenue: 77659, operatingIncome: 25123, netIncome: 15645, eps: 20.54 }
        ],
        annual: [
          { period: "FY23", revenue: 287650, operatingIncome: 93147, netIncome: 57321, eps: 75.21 },
          { period: "FY22", revenue: 208456, operatingIncome: 67890, netIncome: 41567, eps: 54.55 },
          { period: "FY21", revenue: 178234, operatingIncome: 58456, netIncome: 35678, eps: 46.81 },
          { period: "FY20", revenue: 162345, operatingIncome: 52890, netIncome: 32456, eps: 42.59 }
        ]
      },
      balanceSheet: {
        quarterly: [
          { period: "Q3 FY24", totalAssets: 2456789, totalLiabilities: 2234567, totalDebt: 189234, cashAndEquivalents: 234567 },
          { period: "Q2 FY24", totalAssets: 2389234, totalLiabilities: 2178456, totalDebt: 178456, cashAndEquivalents: 223456 },
          { period: "Q1 FY24", totalAssets: 2312456, totalLiabilities: 2112345, totalDebt: 167890, cashAndEquivalents: 212345 },
          { period: "Q4 FY23", totalAssets: 2256789, totalLiabilities: 2056789, totalDebt: 156789, cashAndEquivalents: 198765 }
        ],
        annual: [
          { period: "FY23", totalAssets: 2256789, totalLiabilities: 2056789, totalDebt: 156789, cashAndEquivalents: 198765 },
          { period: "FY22", totalAssets: 1987654, totalLiabilities: 1798765, totalDebt: 134567, cashAndEquivalents: 178234 },
          { period: "FY21", totalAssets: 1756890, totalLiabilities: 1589234, totalDebt: 123456, cashAndEquivalents: 156789 },
          { period: "FY20", totalAssets: 1567890, totalLiabilities: 1412345, totalDebt: 112345, cashAndEquivalents: 134567 }
        ]
      },
      cashFlow: {
        quarterly: [
          { period: "Q3 FY24", operatingCashFlow: 45678, investingCashFlow: -23456, financingCashFlow: -12345, freeCashFlow: 34567 },
          { period: "Q2 FY24", operatingCashFlow: 43567, investingCashFlow: -21234, financingCashFlow: -11234, freeCashFlow: 32456 },
          { period: "Q1 FY24", operatingCashFlow: 41234, investingCashFlow: -19567, financingCashFlow: -10234, freeCashFlow: 30123 },
          { period: "Q4 FY23", operatingCashFlow: 48234, investingCashFlow: -25678, financingCashFlow: -13456, freeCashFlow: 36234 }
        ],
        annual: [
          { period: "FY23", operatingCashFlow: 178713, investingCashFlow: -89935, financingCashFlow: -47169, freeCashFlow: 133380 },
          { period: "FY22", operatingCashFlow: 156234, investingCashFlow: -78456, financingCashFlow: -41234, freeCashFlow: 116234 },
          { period: "FY21", operatingCashFlow: 134567, investingCashFlow: -67890, financingCashFlow: -35678, freeCashFlow: 100234 },
          { period: "FY20", operatingCashFlow: 123456, investingCashFlow: -61234, financingCashFlow: -32456, freeCashFlow: 92234 }
        ]
      }
    },
    revenueBreakdown: [
      { segment: "Retail Banking", revenue: 143825, percentage: 50.0 },
      { segment: "Wholesale Banking", revenue: 86295, percentage: 30.0 },
      { segment: "Treasury", revenue: 43148, percentage: 15.0 },
      { segment: "Other Banking Operations", revenue: 14382, percentage: 5.0 }
    ],
    historicalData: {
      incomeStatement: [
        { year: "FY24E", revenue: 312456, netIncome: 62345, eps: 81.82 },
        { year: "FY23", revenue: 287650, netIncome: 57321, eps: 75.21 },
        { year: "FY22", revenue: 208456, netIncome: 41567, eps: 54.55 },
        { year: "FY21", revenue: 178234, netIncome: 35678, eps: 46.81 },
        { year: "FY20", revenue: 162345, netIncome: 32456, eps: 42.59 }
      ],
      balanceSheet: [
        { year: "FY24E", totalAssets: 2567890, totalLiabilities: 2345678, equity: 222212 },
        { year: "FY23", totalAssets: 2256789, totalLiabilities: 2056789, equity: 200000 },
        { year: "FY22", totalAssets: 1987654, totalLiabilities: 1798765, equity: 188889 },
        { year: "FY21", totalAssets: 1756890, totalLiabilities: 1589234, equity: 167656 },
        { year: "FY20", totalAssets: 1567890, totalLiabilities: 1412345, equity: 155545 }
      ],
      cashFlow: [
        { year: "FY24E", operatingCashFlow: 192345, freeCashFlow: 143456 },
        { year: "FY23", operatingCashFlow: 178713, freeCashFlow: 133380 },
        { year: "FY22", operatingCashFlow: 156234, freeCashFlow: 116234 },
        { year: "FY21", operatingCashFlow: 134567, freeCashFlow: 100234 },
        { year: "FY20", operatingCashFlow: 123456, freeCashFlow: 92234 }
      ]
    },
    companyInfo: {
      ceo: "Sashidhar Jagdishan",
      headquarters: "Mumbai, Maharashtra, India",
      founded: "1994",
      employees: 177000,
      website: "www.hdfcbank.com"
    },
    moat: {
      competitiveEdge: "HDFC Bank's CASA ratio of 40%+ provides low-cost funding. Its technology infrastructure enables superior customer experience with 99.9% uptime. The merger with HDFC Ltd creates India's largest bank by deposits.",
      marketPosition: "India's largest private sector bank by market cap and assets. Serves 84+ million customers through 7,800+ branches. Consistent 20%+ ROE for two decades.",
      innovationFocus: "Pioneer in digital banking with PayZapp, SmartBUY, and 10-second personal loans. Investing in AI for fraud detection and personalized banking. API banking platform serves 15,000+ merchants.",
      sustainability: "Parivartan CSR initiative focuses on rural development, education, and healthcare. Committed to financing sustainable businesses and green buildings. Carbon footprint reduction targets in place."
    },
    news: [
      { id: "1", title: "HDFC Bank merger integration progresses smoothly", source: "Economic Times", date: "2024-01-16" },
      { id: "2", title: "HDFC Bank launches new premium credit card for affluent customers", source: "Mint", date: "2024-01-14" },
      { id: "3", title: "Bank reports strong loan growth in Q3, asset quality stable", source: "Business Standard", date: "2024-01-12" },
      { id: "4", title: "HDFC Bank expands rural presence with 500 new branches", source: "Moneycontrol", date: "2024-01-10" },
      { id: "5", title: "RBI allows HDFC Bank to issue new credit cards", source: "LiveMint", date: "2024-01-08" }
    ]
  }
};

// Default data generator for stocks without extended data
export function getDefaultExtendedData(stock: { 
  currentPrice: number; 
  marketCap: number; 
  ticker: string; 
  name: string;
  sector: string;
  fundamentals: {
    revenue: number;
    netProfit: number;
    eps: number;
    peRatio: number;
    roe: number;
    debtToEquity: number;
    revenueGrowth: number;
    profitGrowth: number;
    epsGrowth: number;
  }
}): typeof extendedStockData["RELIANCE"] {
  const basePrice = stock.currentPrice;
  const revenue = stock.fundamentals.revenue;
  const netProfit = stock.fundamentals.netProfit;
  
  return {
    priceData: {
      current: basePrice,
      change: basePrice * (Math.random() * 0.04 - 0.02),
      changePercent: Math.random() * 4 - 2,
      high52Week: basePrice * 1.25,
      low52Week: basePrice * 0.75,
      open: basePrice * 0.998,
      previousClose: basePrice * 0.995,
      volume: Math.floor(1000000 + Math.random() * 5000000),
      historicalPrices: generateHistoricalPrices(basePrice, 0.018)
    },
    financials: {
      incomeStatement: {
        quarterly: [
          { period: "Q3 FY24", revenue: revenue * 0.25, operatingIncome: revenue * 0.05, netIncome: netProfit * 0.25, eps: stock.fundamentals.eps * 0.25 },
          { period: "Q2 FY24", revenue: revenue * 0.24, operatingIncome: revenue * 0.048, netIncome: netProfit * 0.24, eps: stock.fundamentals.eps * 0.24 },
          { period: "Q1 FY24", revenue: revenue * 0.25, operatingIncome: revenue * 0.05, netIncome: netProfit * 0.25, eps: stock.fundamentals.eps * 0.25 },
          { period: "Q4 FY23", revenue: revenue * 0.26, operatingIncome: revenue * 0.052, netIncome: netProfit * 0.26, eps: stock.fundamentals.eps * 0.26 }
        ],
        annual: [
          { period: "FY23", revenue: revenue, operatingIncome: revenue * 0.2, netIncome: netProfit, eps: stock.fundamentals.eps },
          { period: "FY22", revenue: revenue * 0.85, operatingIncome: revenue * 0.17, netIncome: netProfit * 0.85, eps: stock.fundamentals.eps * 0.85 },
          { period: "FY21", revenue: revenue * 0.72, operatingIncome: revenue * 0.14, netIncome: netProfit * 0.72, eps: stock.fundamentals.eps * 0.72 },
          { period: "FY20", revenue: revenue * 0.65, operatingIncome: revenue * 0.13, netIncome: netProfit * 0.65, eps: stock.fundamentals.eps * 0.65 }
        ]
      },
      balanceSheet: {
        quarterly: [
          { period: "Q3 FY24", totalAssets: stock.marketCap * 0.8, totalLiabilities: stock.marketCap * 0.4, totalDebt: stock.marketCap * 0.15, cashAndEquivalents: stock.marketCap * 0.05 },
          { period: "Q2 FY24", totalAssets: stock.marketCap * 0.78, totalLiabilities: stock.marketCap * 0.39, totalDebt: stock.marketCap * 0.14, cashAndEquivalents: stock.marketCap * 0.048 },
          { period: "Q1 FY24", totalAssets: stock.marketCap * 0.76, totalLiabilities: stock.marketCap * 0.38, totalDebt: stock.marketCap * 0.13, cashAndEquivalents: stock.marketCap * 0.046 },
          { period: "Q4 FY23", totalAssets: stock.marketCap * 0.75, totalLiabilities: stock.marketCap * 0.37, totalDebt: stock.marketCap * 0.12, cashAndEquivalents: stock.marketCap * 0.045 }
        ],
        annual: [
          { period: "FY23", totalAssets: stock.marketCap * 0.75, totalLiabilities: stock.marketCap * 0.37, totalDebt: stock.marketCap * 0.12, cashAndEquivalents: stock.marketCap * 0.045 },
          { period: "FY22", totalAssets: stock.marketCap * 0.65, totalLiabilities: stock.marketCap * 0.32, totalDebt: stock.marketCap * 0.1, cashAndEquivalents: stock.marketCap * 0.04 },
          { period: "FY21", totalAssets: stock.marketCap * 0.55, totalLiabilities: stock.marketCap * 0.27, totalDebt: stock.marketCap * 0.08, cashAndEquivalents: stock.marketCap * 0.035 },
          { period: "FY20", totalAssets: stock.marketCap * 0.48, totalLiabilities: stock.marketCap * 0.24, totalDebt: stock.marketCap * 0.07, cashAndEquivalents: stock.marketCap * 0.03 }
        ]
      },
      cashFlow: {
        quarterly: [
          { period: "Q3 FY24", operatingCashFlow: netProfit * 0.3, investingCashFlow: -netProfit * 0.15, financingCashFlow: -netProfit * 0.1, freeCashFlow: netProfit * 0.25 },
          { period: "Q2 FY24", operatingCashFlow: netProfit * 0.28, investingCashFlow: -netProfit * 0.14, financingCashFlow: -netProfit * 0.09, freeCashFlow: netProfit * 0.23 },
          { period: "Q1 FY24", operatingCashFlow: netProfit * 0.27, investingCashFlow: -netProfit * 0.13, financingCashFlow: -netProfit * 0.085, freeCashFlow: netProfit * 0.22 },
          { period: "Q4 FY23", operatingCashFlow: netProfit * 0.32, investingCashFlow: -netProfit * 0.16, financingCashFlow: -netProfit * 0.11, freeCashFlow: netProfit * 0.27 }
        ],
        annual: [
          { period: "FY23", operatingCashFlow: netProfit * 1.2, investingCashFlow: -netProfit * 0.6, financingCashFlow: -netProfit * 0.4, freeCashFlow: netProfit * 1.0 },
          { period: "FY22", operatingCashFlow: netProfit * 1.1, investingCashFlow: -netProfit * 0.55, financingCashFlow: -netProfit * 0.35, freeCashFlow: netProfit * 0.9 },
          { period: "FY21", operatingCashFlow: netProfit * 1.0, investingCashFlow: -netProfit * 0.5, financingCashFlow: -netProfit * 0.3, freeCashFlow: netProfit * 0.8 },
          { period: "FY20", operatingCashFlow: netProfit * 0.9, investingCashFlow: -netProfit * 0.45, financingCashFlow: -netProfit * 0.25, freeCashFlow: netProfit * 0.7 }
        ]
      }
    },
    revenueBreakdown: [
      { segment: "Primary Business", revenue: revenue * 0.65, percentage: 65 },
      { segment: "Secondary Business", revenue: revenue * 0.25, percentage: 25 },
      { segment: "Others", revenue: revenue * 0.10, percentage: 10 }
    ],
    historicalData: {
      incomeStatement: [
        { year: "FY24E", revenue: revenue * 1.15, netIncome: netProfit * 1.15, eps: stock.fundamentals.eps * 1.15 },
        { year: "FY23", revenue: revenue, netIncome: netProfit, eps: stock.fundamentals.eps },
        { year: "FY22", revenue: revenue * 0.85, netIncome: netProfit * 0.85, eps: stock.fundamentals.eps * 0.85 },
        { year: "FY21", revenue: revenue * 0.72, netIncome: netProfit * 0.72, eps: stock.fundamentals.eps * 0.72 },
        { year: "FY20", revenue: revenue * 0.65, netIncome: netProfit * 0.65, eps: stock.fundamentals.eps * 0.65 }
      ],
      balanceSheet: [
        { year: "FY24E", totalAssets: stock.marketCap * 0.85, totalLiabilities: stock.marketCap * 0.42, equity: stock.marketCap * 0.43 },
        { year: "FY23", totalAssets: stock.marketCap * 0.75, totalLiabilities: stock.marketCap * 0.37, equity: stock.marketCap * 0.38 },
        { year: "FY22", totalAssets: stock.marketCap * 0.65, totalLiabilities: stock.marketCap * 0.32, equity: stock.marketCap * 0.33 },
        { year: "FY21", totalAssets: stock.marketCap * 0.55, totalLiabilities: stock.marketCap * 0.27, equity: stock.marketCap * 0.28 },
        { year: "FY20", totalAssets: stock.marketCap * 0.48, totalLiabilities: stock.marketCap * 0.24, equity: stock.marketCap * 0.24 }
      ],
      cashFlow: [
        { year: "FY24E", operatingCashFlow: netProfit * 1.3, freeCashFlow: netProfit * 1.1 },
        { year: "FY23", operatingCashFlow: netProfit * 1.2, freeCashFlow: netProfit * 1.0 },
        { year: "FY22", operatingCashFlow: netProfit * 1.1, freeCashFlow: netProfit * 0.9 },
        { year: "FY21", operatingCashFlow: netProfit * 1.0, freeCashFlow: netProfit * 0.8 },
        { year: "FY20", operatingCashFlow: netProfit * 0.9, freeCashFlow: netProfit * 0.7 }
      ]
    },
    companyInfo: {
      ceo: "Company CEO",
      headquarters: "India",
      founded: "N/A",
      employees: 10000,
      website: `www.${stock.ticker.toLowerCase()}.com`
    },
    moat: {
      competitiveEdge: `${stock.name} has established a strong market presence in the ${stock.sector} sector through consistent execution and customer focus.`,
      marketPosition: `A leading player in the Indian ${stock.sector} industry with growing market share and brand recognition.`,
      innovationFocus: "Continued investment in technology and process improvements to stay competitive in a dynamic market.",
      sustainability: "Committed to sustainable business practices and long-term value creation for all stakeholders."
    },
    news: [
      { id: "1", title: `${stock.ticker} announces quarterly results`, source: "Economic Times", date: "2024-01-15" },
      { id: "2", title: `${stock.name} expands operations`, source: "Mint", date: "2024-01-10" },
      { id: "3", title: `Analysts bullish on ${stock.ticker}`, source: "Moneycontrol", date: "2024-01-05" }
    ]
  };
}

export function getExtendedData(stockId: string, stock: Parameters<typeof getDefaultExtendedData>[0]): typeof extendedStockData["RELIANCE"] {
  return extendedStockData[stockId] || getDefaultExtendedData(stock);
}
