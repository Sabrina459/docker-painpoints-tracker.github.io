import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp } from "lucide-react";
import { painPoints } from "@/data/painpoints";

interface TopPainPointsProps {
  filteredPainPoints: typeof painPoints;
}

export function TopPainPoints({ filteredPainPoints }: TopPainPointsProps) {
  const topPainPoints = [...filteredPainPoints]
    .sort((a, b) => {
      // Sort by severity first, then by upvotes
      const severityScore = (severity: string) => 
        severity === 'Very High' ? 5 : severity === 'High' ? 4 : 3;
      
      const severityDiff = severityScore(b.severity) - severityScore(a.severity);
      if (severityDiff !== 0) return severityDiff;
      
      return b.upvotes - a.upvotes;
    })
    .slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Very High': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-warning text-warning-foreground';
      case 'Medium-High': return 'bg-yellow-500 text-yellow-50';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Top Pain Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topPainPoints.map((point, index) => (
          <div key={point.id} className="p-4 border rounded-lg bg-muted/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold text-sm">#{index + 1}</span>
                  <Badge className={getSeverityColor(point.severity)}>
                    {point.severity}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-2">
                  {point.title}
                </h4>
                <div className="bg-card border-l-4 border-primary/30 pl-3 py-2 mb-2">
                  <p className="text-xs text-muted-foreground italic">
                    "{point.redditQuote}"
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-primary font-medium">
                      {point.upvotes} upvotes
                    </span>
                    <a href={point.redditSource}><ExternalLink className="h-3 w-3 text-muted-foreground" /></a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {point.userTypes.slice(0, point.userTypes.length).map((type, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {type.replace(' users', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}