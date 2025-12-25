import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getHealthBadgeStyle, getHealthExplanation } from "@/lib/health";
import { cn } from "@/lib/utils";

interface HealthBadgeProps {
  type: "financialStrength" | "profitability" | "debtLevel";
  value: string;
  size?: "sm" | "md";
  showTooltip?: boolean;
}

const typeLabels: Record<string, string> = {
  financialStrength: "Financial Strength",
  profitability: "Profitability",
  debtLevel: "Debt Level",
};

export function HealthBadge({ type, value, size = "md", showTooltip = true }: HealthBadgeProps) {
  const { bgClass, textClass, icon } = getHealthBadgeStyle(type, value);
  const explanation = getHealthExplanation(type, value);

  const badge = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        bgClass,
        textClass,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span>{icon}</span>
      <span>{value}</span>
    </span>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help">{badge}</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="font-medium mb-1">{typeLabels[type]}</p>
        <p className="text-sm text-muted-foreground">{explanation}</p>
      </TooltipContent>
    </Tooltip>
  );
}
