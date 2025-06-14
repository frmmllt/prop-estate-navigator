import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { mockProperties } from "@/data/mockProperties";
import { useAuth } from "@/contexts/AuthContext";
import { logUserAction } from "@/utils/userLogger";
import { useApiProperty } from "@/hooks/useApiProperties";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading } = useApiProperty(id);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user?.email && property) {
      logUserAction(user.email, "property_viewed", {
        propertyId: property.id,
        propertyName: property.name || property.address?.street || "(unknown)"
      });
    }
  }, [user?.email, property?.id]);

  return (
    <Layout>
      <div className="container py-8">
        {isLoading ? (
          <div>Chargement du bien...</div>
        ) : (
          <PropertyDetail property={property} />
        )}
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
