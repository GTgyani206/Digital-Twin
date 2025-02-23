"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"


const data = [
  { name: "Breakfast", calories: 400, protein: 20, carbs: 50, fat: 15 },
  { name: "Lunch", calories: 600, protein: 30, carbs: 70, fat: 20 },
  { name: "Dinner", calories: 500, protein: 25, carbs: 60, fat: 18 },
  { name: "Snacks", calories: 300, protein: 10, carbs: 40, fat: 12 },
]
export default function NutritionMetrics() {
  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-800">Nutrition</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Calories</p>
          <p className="text-2xl font-bold text-green-600">1,800 kcal</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Water Intake</p>
          <p className="text-2xl font-bold text-green-600">2.5 L</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="protein" stackId="a" fill="#22c55e" />
            <Bar dataKey="carbs" stackId="a" fill="#eab308" />
            <Bar dataKey="fat" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

