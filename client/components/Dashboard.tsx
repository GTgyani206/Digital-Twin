import DailyFitness from "./DailyFitness"
import SleepMetrics from "./SleepMetrics"
import CardiovascularHealth from "./CardiovascularHealth"
import NutritionMetrics from "./NutritionMetrics"
import ChatBot from "./ChatBot"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Health & Fitness Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* there is something wrong with these component below giving error:TypeError: Super expression must either be null or a function */}
        <DailyFitness />
        <SleepMetrics />
        <CardiovascularHealth />
        <NutritionMetrics />
      </div>
      <div className="mt-12">
        <ChatBot />
      </div>
    </div>
  )
}

