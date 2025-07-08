import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FiPlus, FiMail, FiFileText, FiFolder } from "react-icons/fi";

// Mock data for dashboard
const MOCK_STATS = {
  projects: 12,
  blogs: 34,
  tags: 18,
  contacts: 7,
};

const MOCK_CHART_DATA = [
  { name: "Projects", count: 12 },
  { name: "Blogs", count: 34 },
  { name: "Contacts", count: 7 },
];

const MOCK_TAGS_PIE = [
  { name: "React", value: 8 },
  { name: "Node.js", value: 5 },
  { name: "Next.js", value: 3 },
  { name: "API", value: 2 },
];
const PIE_COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"];

// Mock activity heatmap data (7 days x 10 weeks = 70 days)
const today = new Date();

// Restore Recent Activity mock data
const MOCK_RECENT_ACTIVITY = [
  {
    type: "blog",
    text: "New blog post: 'Scaling Node.js Apps'",
    time: "2h ago",
  },
  {
    type: "project",
    text: "Project 'Weather Dashboard' updated",
    time: "5h ago",
  },
  {
    type: "contact",
    text: "New contact message from Jane Doe",
    time: "1d ago",
  },
  {
    type: "blog",
    text: "Blog post 'React Server Components' edited",
    time: "2d ago",
  },
];

// Generate mock weekly activity data for 26 weeks
const MOCK_WEEKLY_ACTIVITY = Array.from({ length: 26 }, (_, i) => {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - (25 - i) * 7);
  return {
    week: weekStart.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    }),
    activity: Math.floor(Math.random() * 5) + 1,
  };
});

export default function AdminDashboard() {
  const [stats] = useState(MOCK_STATS);
  const [chartData] = useState(MOCK_CHART_DATA);
  const [tagsPie] = useState(MOCK_TAGS_PIE);
  const loading = false;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Summary Cards & Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
          <StatCard
            label="Projects"
            value={stats.projects}
            loading={loading}
            icon={<FiFolder className="w-6 h-6 text-indigo-500" />}
          />
          <StatCard
            label="Blogs"
            value={stats.blogs}
            loading={loading}
            icon={<FiFileText className="w-6 h-6 text-indigo-500" />}
          />
          <StatCard
            label="Tags"
            value={stats.tags}
            loading={loading}
            icon={<FiPlus className="w-6 h-6 text-indigo-500" />}
          />
          <StatCard
            label="Contacts"
            value={stats.contacts}
            loading={loading}
            icon={<FiMail className="w-6 h-6 text-indigo-500" />}
          />
        </div>
        {/* Charts & Activity Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Content Overview
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Tag Distribution
            </h2>
            <div className="w-full h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tagsPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {tagsPie.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Recent Activity & Activity Involvement Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Recent Activity
            </h2>
            <ul className="divide-y divide-gray-100">
              {MOCK_RECENT_ACTIVITY.map(
                (
                  item: { type: string; text: string; time: string },
                  idx: number
                ) => (
                  <li
                    key={idx}
                    className="py-2 flex items-center gap-3 text-gray-700 text-sm"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{item.text}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {item.time}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Activity Involvement
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={MOCK_WEEKLY_ACTIVITY}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10 }}
                    minTickGap={8}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  loading,
  icon,
}: {
  label: string;
  value: number;
  loading: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[120px]">
      <span className="mb-2">{icon}</span>
      <span className="text-sm text-gray-500 mb-1">{label}</span>
      <span className="text-3xl font-bold text-indigo-600">
        {loading ? <span className="animate-pulse">...</span> : value}
      </span>
    </div>
  );
}

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium text-sm shadow-sm transition">
      {icon}
      {label}
    </button>
  );
}
