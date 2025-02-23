"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", steps: 7500 },
  { name: "Tue", steps: 9000 },
  { name: "Wed", steps: 8200 },
  { name: "Thu", steps: 7800 },
  { name: "Fri", steps: 8500 },
  { name: "Sat", steps: 10000 },
  { name: "Sun", steps: 6500 },
]

export default function DailyFitness() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Daily Fitness</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Today's Steps</p>
          <p className="text-2xl font-bold text-blue-600">8,500</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">VO2 Max</p>
          <p className="text-2xl font-bold text-blue-600">42 mL/kg/min</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="steps" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

