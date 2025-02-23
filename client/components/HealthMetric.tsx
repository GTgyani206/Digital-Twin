import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type HealthMetricProps = {
  title: string
  value: number | string
}

export default function HealthMetric({ title, value }: HealthMetricProps) {
  const data = [
    { name: "Mon", value: Math.random() * 100 },
    { name: "Tue", value: Math.random() * 100 },
    { name: "Wed", value: Math.random() * 100 },
    { name: "Thu", value: Math.random() * 100 },
    { name: "Fri", value: Math.random() * 100 },
    { name: "Sat", value: Math.random() * 100 },
    { name: "Sun", value: Math.random() * 100 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-3xl font-bold mb-4">{value}</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

