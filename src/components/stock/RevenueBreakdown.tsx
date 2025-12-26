import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { RevenueSegment } from "@/types/stock";
import { formatIndianNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface RevenueBreakdownProps {
  segments: RevenueSegment[];
}

const segmentColors = [
  "bg-primary",
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

export function RevenueBreakdown({ segments }: RevenueBreakdownProps) {
  const totalRevenue = segments.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          Revenue Breakdown
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Revenue by business segment
        </p>
      </CardHeader>
      <CardContent>
        {/* Visual Bar */}
        <div className="relative h-8 rounded-full overflow-hidden flex mb-6">
          {segments.map((segment, index) => (
            <div
              key={segment.segment}
              className={cn(
                segmentColors[index % segmentColors.length],
                "transition-all duration-300 hover:opacity-90"
              )}
              style={{ width: `${segment.percentage}%` }}
              title={`${segment.segment}: ${segment.percentage}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {segments.map((segment, index) => (
            <div key={segment.segment} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    segmentColors[index % segmentColors.length]
                  )}
                />
                <span className="text-sm font-medium">{segment.segment}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground tabular-nums">
                  ₹{formatIndianNumber(segment.revenue)}
                </span>
                <span className="font-semibold tabular-nums w-12 text-right">
                  {segment.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Revenue</span>
            <span className="font-bold text-lg tabular-nums">
              ₹{formatIndianNumber(totalRevenue)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
