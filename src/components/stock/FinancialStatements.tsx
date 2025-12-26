import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle, FileText, Scale, Banknote } from "lucide-react";
import { FinancialStatements as FinancialStatementsType } from "@/types/stock";
import { formatIndianNumber } from "@/lib/format";
import { getExplanation } from "@/lib/explanations";

interface FinancialStatementsProps {
  financials: FinancialStatementsType;
}

type PeriodType = "quarterly" | "annual";

function ExplainButton({ metricKey, label }: { metricKey: string; label: string }) {
  const explanation = getExplanation(metricKey);
  if (!explanation) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 inline-flex">
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <div className="space-y-2">
          <h4 className="font-semibold">{explanation.name}</h4>
          <p className="text-sm">{explanation.detailedExplanation}</p>
          {explanation.goodRange && (
            <div className="text-xs bg-muted p-2 rounded-md">
              <strong>What to look for:</strong> {explanation.goodRange}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FinancialStatementsSection({ financials }: FinancialStatementsProps) {
  const [period, setPeriod] = useState<PeriodType>("annual");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Financial Statements
        </h2>
        <div className="flex gap-2">
          <Button
            variant={period === "quarterly" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("quarterly")}
          >
            Quarterly
          </Button>
          <Button
            variant={period === "annual" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("annual")}
          >
            Annual
          </Button>
        </div>
      </div>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Income Statement</span>
            <span className="sm:hidden">Income</span>
          </TabsTrigger>
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">Balance Sheet</span>
            <span className="sm:hidden">Balance</span>
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            <span className="hidden sm:inline">Cash Flow</span>
            <span className="sm:hidden">Cash Flow</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Income Statement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Shows revenue, expenses, and profitability over time
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-card">Metric</TableHead>
                      {financials.incomeStatement[period].map((item) => (
                        <TableHead key={item.period} className="text-right min-w-[100px]">
                          {item.period}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Revenue
                        <ExplainButton metricKey="revenue" label="Revenue" />
                      </TableCell>
                      {financials.incomeStatement[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.revenue)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Operating Income
                      </TableCell>
                      {financials.incomeStatement[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.operatingIncome)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Net Income
                        <ExplainButton metricKey="netProfit" label="Net Profit" />
                      </TableCell>
                      {financials.incomeStatement[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.netIncome)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        EPS
                        <ExplainButton metricKey="eps" label="EPS" />
                      </TableCell>
                      {financials.incomeStatement[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{item.eps.toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Balance Sheet</CardTitle>
              <p className="text-sm text-muted-foreground">
                Snapshot of assets, liabilities, and equity
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-card">Metric</TableHead>
                      {financials.balanceSheet[period].map((item) => (
                        <TableHead key={item.period} className="text-right min-w-[100px]">
                          {item.period}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Total Assets
                      </TableCell>
                      {financials.balanceSheet[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.totalAssets)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Total Liabilities
                      </TableCell>
                      {financials.balanceSheet[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.totalLiabilities)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Total Debt
                      </TableCell>
                      {financials.balanceSheet[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.totalDebt)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Cash & Equivalents
                      </TableCell>
                      {financials.balanceSheet[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums text-success">
                          ₹{formatIndianNumber(item.cashAndEquivalents)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cash Flow Statement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tracks actual cash moving in and out of the business
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-card">Metric</TableHead>
                      {financials.cashFlow[period].map((item) => (
                        <TableHead key={item.period} className="text-right min-w-[100px]">
                          {item.period}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Operating Cash Flow
                        <ExplainButton metricKey="operatingCashFlow" label="Operating Cash Flow" />
                      </TableCell>
                      {financials.cashFlow[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.operatingCashFlow)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Investing Cash Flow
                      </TableCell>
                      {financials.cashFlow[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums text-danger">
                          ₹{formatIndianNumber(item.investingCashFlow)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="sticky left-0 bg-card font-medium">
                        Financing Cash Flow
                      </TableCell>
                      {financials.cashFlow[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums">
                          ₹{formatIndianNumber(item.financingCashFlow)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell className="sticky left-0 bg-muted/50 font-semibold">
                        Free Cash Flow
                        <ExplainButton metricKey="freeCashFlow" label="Free Cash Flow" />
                      </TableCell>
                      {financials.cashFlow[period].map((item) => (
                        <TableCell key={item.period} className="text-right tabular-nums font-semibold text-success">
                          ₹{formatIndianNumber(item.freeCashFlow)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
