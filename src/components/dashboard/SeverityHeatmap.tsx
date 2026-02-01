import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { painPoints, severityColors } from "@/data/painpoints";

interface SeverityHeatmapProps {
  filteredPainPoints: typeof painPoints;
}

export function SeverityHeatmap({ filteredPainPoints }: SeverityHeatmapProps) {
  const heatmapData = filteredPainPoints.map(point => ({
    title: point.title.substring(0, 20) + '...',
    frequency: point.affectedUsers,
    severity: point.severity === 'Very High' ? 5 : point.severity === 'High' ? 4 : 3,
    severityLabel: point.severity,
    upvotes: point.upvotes,
    color: severityColors[point.severity]
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-primary">Severity vs Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={heatmapData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="frequency" 
              name="Affected Users"
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              dataKey="severity" 
              name="Severity"
              domain={[2.5, 5.5]}
              tickFormatter={(value) => {
                if (value === 5) return 'Very High';
                if (value === 4) return 'High';
                if (value === 3) return 'Med-High';
                return '';
              }}
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value, name) => {
                if (name === 'frequency') return [value, 'Affected Users'];
                if (name === 'severity') return [value, 'Severity Level'];
                return [value, name];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.title;
                }
                return label;
              }}
            />
            <Scatter dataKey="frequency" fill="#0db7ed">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-sm text-muted-foreground">Very High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Medium-High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}