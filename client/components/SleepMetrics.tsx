"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Deep Sleep", value: 90 },
  { name: "Light Sleep", value: 240 },
  { name: "REM", value: 90 },
  { name: "Awake", value: 30 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function SleepMetrics() {
  return (
    <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800">Sleep</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Sleep Duration</p>
          <p className="text-2xl font-bold text-indigo-600">7.5 hrs</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Sleep Efficiency</p>
          <p className="text-2xl font-bold text-indigo-600">85%</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

