
import React, { useState } from "react";
import Layout from "@/components/Layout";
import UserManagement from "@/components/users/UserManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminUsersPage = () => {
  const { user } = useAuth();
  
  // Rediriger les non-administrateurs
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Liste des utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsersPage;
