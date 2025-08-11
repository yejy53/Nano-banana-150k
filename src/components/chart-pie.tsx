"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartPieDonutText({ 
    name,
    color,
    chartConfig, 
    chartData 
  }: { 
    name: string;
    color: string;
    chartConfig: ChartConfig;
    chartData: Array<{ num: number; [key: string]: any }>;
  }) {
    const totalImages = React.useMemo(() => {
      return chartData.reduce((acc: number, curr: { num: number }) => acc + curr.num, 0)
    }, [chartData])

  return (
    <Card className="flex flex-col h-fit bg-[#232323] border-0">
        <CardHeader className="items-center pb-0 text-center text-xl">
         <CardTitle style={{ color: color }}>{name}</CardTitle>
       </CardHeader>
      <CardContent className="flex-1 pb-0 pt-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="num"
              nameKey="type_name"
              innerRadius={55}
              strokeWidth={8}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-2xl font-bold"
                          fill="#f8f8f8"
                        >
                          {totalImages.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Images
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
