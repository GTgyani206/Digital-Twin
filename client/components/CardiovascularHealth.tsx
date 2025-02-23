"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "6:00", heartRate: 62 },
  { time: "9:00", heartRate: 75 },
  { time: "12:00", heartRate: 85 },
  { time: "15:00", heartRate: 78 },
  { time: "18:00", heartRate: 88 },
  { time: "21:00", heartRate: 70 },
]

export default function CardiovascularHealth() {
  return (
    <div className="bg-red-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-red-800">Cardiovascular Health</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Resting Heart Rate</p>
          <p className="text-2xl font-bold text-red-600">72 bpm</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Blood Pressure</p>
          <p className="text-2xl font-bold text-red-600">120/80 mmHg</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

