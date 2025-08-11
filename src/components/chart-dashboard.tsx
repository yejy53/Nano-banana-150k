import { ChartPieDonutText } from "./chart-pie"
import { imaginationData, imaginationConfig, multiReferenceData, multiReferenceConfig, instructionFollowingData, instructionFollowingConfig } from "@/data/pie-data"

export function ChartDashboard() {

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        <div className="w-full">
          <ChartPieDonutText name="Imagination" color="#ff177f" chartConfig={imaginationConfig} chartData={imaginationData} />
        </div>
        <div className="w-full">
          <ChartPieDonutText name="Multi-Reference" color="#02afee" chartConfig={multiReferenceConfig} chartData={multiReferenceData} />
        </div>
        <div className="w-full">
          <ChartPieDonutText name="Instruction Following" color="#9163cd" chartConfig={instructionFollowingConfig} chartData={instructionFollowingData} />
        </div>
      </div>
    </div>
  )
}
