import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { painPoints, categoryColors } from "@/data/painpoints";

interface CategoryChartProps {
  filteredPainPoints: typeof painPoints;
}

export function CategoryChart({ filteredPainPoints }: CategoryChartProps) {
  const categoryData = filteredPainPoints.reduce((acc, point) => {
    const existing = acc.find(item => item.category === point.category);
    if (existing) {
      existing.count += 1;
      existing.totalUpvotes += point.upvotes;
    } else {
      acc.push({
        category: point.category,
        count: 1,
        totalUpvotes: point.upvotes,
        fill: categoryColors[point.category as keyof typeof categoryColors] || '#0db7ed'
      });
    }
    return acc;
  }, [] as Array<{ category: string; count: number; totalUpvotes: number; fill: string }>);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-primary">Issues by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="category" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [
                value, 
                name === 'count' ? 'Issues' : 'Total Upvotes'
              ]}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              fill="url(#categoryGradient)"
            />
            <defs>
              <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0db7ed" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#0db7ed" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}