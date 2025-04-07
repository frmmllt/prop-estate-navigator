
import React from "react";
import Layout from "@/components/Layout";
import ExcelUploader from "@/components/upload/ExcelUploader";

const UploadPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Importer des données</h1>
        <p className="text-muted-foreground mb-8">
          Importez votre fichier Excel contenant les données des propriétés.
        </p>
        
        <ExcelUploader />
      </div>
    </Layout>
  );
};

export default UploadPage;
