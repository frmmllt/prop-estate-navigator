
import React from "react";
import Layout from "@/components/Layout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { mockProperties } from "@/data/mockProperties";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const COLORS = ["#5C9DFF", "#52D273", "#F5C23D", "#E0685C", "#A46CFA", "#FFA06D", "#3ACFC5"];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Pie chart data: properties by type
  const propertyTypeCounts: Record<string, number> = {};
  mockProperties.forEach((p) => {
    propertyTypeCounts[p.type] = (propertyTypeCounts[p.type] || 0) + 1;
  });
  const pieData = Object.entries(propertyTypeCounts).map(([type, value]) => ({
    name: type,
    value,
  }));

  // Bar chart data: average ROI by type (only if ROI exists)
  interface TypeROI {
    type: string;
    roi: number;
    count: number;
  }
  const roiByType: Record<string, TypeROI> = {};
  mockProperties.forEach((p) => {
    if (typeof p.financials.roi === "number") {
      if (!roiByType[p.type]) {
        roiByType[p.type] = { type: p.type, roi: 0, count: 0 };
      }
      roiByType[p.type].roi += p.financials.roi;
      roiByType[p.type].count += 1;
    }
  });
  const barData = Object.values(roiByType)
    .map((d) => ({
      type: d.type,
      avgRoi: d.count > 0 ? +(d.roi / d.count).toFixed(2) : 0,
    }))
    .sort((a, b) => a.type.localeCompare(b.type));

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-4">Répartition des types de propriétés</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-4">ROI moyen par type de propriété</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-15} textAnchor="end" />
                <YAxis label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgRoi" fill="#5C9DFF" name="ROI moyen" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
