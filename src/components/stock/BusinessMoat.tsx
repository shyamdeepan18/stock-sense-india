import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Lightbulb, Leaf } from "lucide-react";
import { BusinessMoat as BusinessMoatType } from "@/types/stock";
import { cn } from "@/lib/utils";

interface BusinessMoatProps {
  moat: BusinessMoatType;
  companyName: string;
}

const moatSections = [
  {
    key: "competitiveEdge" as const,
    icon: Shield,
    title: "Competitive Edge",
    description: "What makes this company hard to compete with",
    color: "text-primary"
  },
  {
    key: "marketPosition" as const,
    icon: Target,
    title: "Market Position",
    description: "Where the company stands in its industry",
    color: "text-chart-1"
  },
  {
    key: "innovationFocus" as const,
    icon: Lightbulb,
    title: "Innovation & R&D",
    description: "How the company invests in the future",
    color: "text-chart-2"
  },
  {
    key: "sustainability" as const,
    icon: Leaf,
    title: "Sustainability",
    description: "Long-term business and environmental outlook",
    color: "text-success"
  }
];

export function BusinessMoatSection({ moat, companyName }: BusinessMoatProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Business Quality & Moat
      </h2>
      <p className="text-muted-foreground">
        Understanding what makes {companyName} a strong long-term investment
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {moatSections.map(({ key, icon: Icon, title, description, color }) => (
          <Card key={key} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <div className={cn("p-2 rounded-lg bg-muted", color)}>
                  <Icon className="h-4 w-4" />
                </div>
                {title}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{moat[key]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
