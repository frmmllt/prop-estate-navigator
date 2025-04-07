
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import PropertyDetail from "@/components/properties/PropertyDetail";
import { mockProperties } from "@/data/mockProperties";

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  
  return (
    <Layout>
      <div className="container py-8">
        <PropertyDetail property={property} />
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
