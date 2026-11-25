# StockSense India — AI-Powered Equity Fundamentals Intelligence

An interactive financial intelligence web platform designed for retail investors in the Indian stock market (NSE/BSE). **StockSense India** pairs fundamental metrics with real-time generative AI analysis, translating complex corporate balance sheets into plain-English qualitative breakdowns.

---

## 🌟 Key Highlights

- **Serverless LLM Edge Summarization:** Powered by Supabase Deno Edge Functions, invoking high-speed LLM generation with custom Indian equity context (INR metrics, sector benchmarks, long-term investor concerns).
- **Interactive Financial Dashboard:** Built with Vite, React, TypeScript, and Tailwind CSS, featuring key metrics cards (P/E ratio, ROE, Debt-to-Equity, quarterly revenues) and trend indicators.
- **Strict Separation of Secrets:** Clean client architecture with environment isolation; runtime secrets stay within Supabase Edge Functions.

---

## 🏗️ Architecture Flow

```
┌─────────────────────────┐
│ React / TypeScript UI   │
│ (Vite + Tailwind CSS)   │
└────────────┬────────────┘
             │ 1. Request Stock Summary (Ticker, Fundamentals)
             ▼
┌─────────────────────────┐
│ Supabase Edge Function  │ ──> [LLM Reasoning Engine]
│ (Deno Runtime)          │ <── (Plain-English Financial Summary)
└────────────┬────────────┘
             │ 2. Return Structured Insights (Positives, Risks, Health)
             ▼
┌─────────────────────────┐
│ `<AISummary />` Display │
└─────────────────────────┘
```

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
- Node.js 18+ / Bun / pnpm
- Supabase account with Edge Functions enabled

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/shyamdeepan18/stock-sense-india.git
cd stock-sense-india
npm install
```

### 3. Environment Configuration
Copy the template and configure your Supabase project keys:
```bash
cp .env.example .env
```
Populate `.env`:
```env
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
```

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173`.

---

## 📁 Repository Structure

```
├── .env.example                       # Template for local environment variables
├── src/
│   ├── components/
│   │   └── stock/
│   │       ├── AISummary.tsx          # AI narrative rendering component
│   │       └── KeyMetricsCards.tsx    # Financial ratios & KPIs display
│   ├── pages/                         # Core views & ticker analysis
│   └── lib/supabase.ts                # Supabase client instantiation
└── supabase/
    └── functions/
        └── stock-summary/
            └── index.ts               # Deno Edge Function with prompt pipeline
```

---

## 🛡️ License & Disclaimers

This project is built for educational and fundamental analysis assistance. It does not provide SEBI-registered investment advisory or buy/sell recommendations.
