import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Container } from "lucide-react";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { SeverityHeatmap } from "@/components/dashboard/SeverityHeatmap";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { TopPainPoints } from "@/components/dashboard/TopPainPoints";
import { painPoints } from "@/data/painpoints";

export default function Dashboard() {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  
  const filteredPainPoints = severityFilter === 'all' 
    ? painPoints 
    : painPoints.filter(point => point.severity === severityFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Container className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Docker Pain Points Dashboard</h1>
                <p className="text-muted-foreground">Reddit community-reported issues and trends</p>
              </div>
            </div>
            
            {/* Severity Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Filter by severity:</span>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Very High">Very High</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium-High">Medium-High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Metrics */}
        <MetricsOverview filteredPainPoints={filteredPainPoints} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <CategoryChart filteredPainPoints={filteredPainPoints} />
          <SeverityHeatmap filteredPainPoints={filteredPainPoints} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendChart />
          <TopPainPoints filteredPainPoints={filteredPainPoints} />
        </div>

        {/* Active Filter Display */}
        {severityFilter !== 'all' && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filter:</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Severity: {severityFilter}
              </Badge>
              <button 
                onClick={() => setSeverityFilter('all')}
                className="text-sm text-primary hover:underline ml-2"
              >
                Clear filter
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}