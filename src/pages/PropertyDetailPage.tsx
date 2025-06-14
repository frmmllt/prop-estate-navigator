import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { mockProperties } from "@/data/mockProperties";
import { useAuth } from "@/contexts/AuthContext";
import { logUserAction } from "@/utils/userLogger";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user?.email && property) {
      logUserAction(user.email, "property_viewed", {
        propertyId: property.id,
        propertyName: property.name || property.address?.street || "(unknown)"
      });
    }
    // Only runs once per id (property page view)
  }, [user?.email, property?.id]);

  return (
    <Layout>
      <div className="container py-8">
        <PropertyDetail property={property} />
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
