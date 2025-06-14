
import React from "react";
import Layout from "@/components/Layout";
import PropertiesMap from "@/components/properties/PropertiesMap";

const MapPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <span>Localisation des biens sur carte</span>
        </h1>
        <div className="w-full">
          <PropertiesMap />
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
