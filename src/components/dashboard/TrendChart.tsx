import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { trendData, categoryColors } from "@/data/painpoints";

export function TrendChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-primary">Pain Point Trends by Docker Release</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="release" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              label={{ value: 'Issue Reports', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Networking" 
              stroke={categoryColors.Networking}
              strokeWidth={3}
              dot={{ fill: categoryColors.Networking, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Volumes" 
              stroke={categoryColors.Volumes}
              strokeWidth={3}
              dot={{ fill: categoryColors.Volumes, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Documentation" 
              stroke={categoryColors.Documentation}
              strokeWidth={3}
              dot={{ fill: categoryColors.Documentation, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="Updates" 
              stroke={categoryColors.Updates}
              strokeWidth={3}
              dot={{ fill: categoryColors.Updates, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}