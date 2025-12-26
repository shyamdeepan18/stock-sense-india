import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, MapPin, Calendar, Users, Globe } from "lucide-react";
import { CompanyInfo as CompanyInfoType } from "@/types/stock";

interface CompanyInfoProps {
  companyInfo: CompanyInfoType;
  sector: string;
  industry: string;
}

export function CompanyInfoSection({ companyInfo, sector, industry }: CompanyInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CEO</p>
              <p className="font-medium">{companyInfo.ceo}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Headquarters</p>
              <p className="font-medium">{companyInfo.headquarters}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="font-medium">{industry}</p>
              <p className="text-xs text-muted-foreground">{sector}</p>
            </div>
          </div>

          {companyInfo.founded && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Founded</p>
                <p className="font-medium">{companyInfo.founded}</p>
              </div>
            </div>
          )}

          {companyInfo.employees && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="font-medium">{companyInfo.employees.toLocaleString("en-IN")}</p>
              </div>
            </div>
          )}

          {companyInfo.website && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <a
                  href={`https://${companyInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {companyInfo.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
