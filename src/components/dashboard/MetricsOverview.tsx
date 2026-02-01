import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { painPoints } from "@/data/painpoints";

interface MetricsOverviewProps {
  filteredPainPoints: typeof painPoints;
}

export function MetricsOverview({ filteredPainPoints }: MetricsOverviewProps) {
  const totalIssues = filteredPainPoints.length;
  const avgSeverity = filteredPainPoints.reduce((acc, point) => {
    const severityScore = point.severity === 'Very High' ? 5 : point.severity === 'High' ? 4 : 3;
    return acc + severityScore;
  }, 0) / filteredPainPoints.length;
  
  const userTypeCount = new Map();
  filteredPainPoints.forEach(point => {
    point.userTypes.forEach(type => {
      userTypeCount.set(type, (userTypeCount.get(type) || 0) + 1);
    });
  });
  
  const mostAffectedType = Array.from(userTypeCount.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
          <div className="h-4 w-4 bg-primary/20 rounded-full"></div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{totalIssues}</div>
          <p className="text-xs text-muted-foreground mt-1">Active pain points</p>
        </CardContent>
      </Card>

      <Card className="border-warning/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Avg Severity</CardTitle>
          <div className="h-4 w-4 bg-warning/20 rounded-full"></div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-warning">{avgSeverity.toFixed(1)}/5</div>
          <p className="text-xs text-muted-foreground mt-1">Severity score</p>
        </CardContent>
      </Card>

      <Card className="border-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Affected</CardTitle>
          <div className="h-4 w-4 bg-secondary/20 rounded-full"></div>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-secondary truncate">{mostAffectedType}</div>
          <p className="text-xs text-muted-foreground mt-1">User type</p>
        </CardContent>
      </Card>
    </div>
  );
}