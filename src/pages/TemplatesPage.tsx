
import React from "react";
import Layout from "@/components/Layout";
import LetterTemplateList from "@/components/templates/LetterTemplateList";

const TemplatesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Modèles de courriers</h1>
        <p className="text-muted-foreground mb-8">
          Gérez vos modèles de courriers pour contacter les propriétaires.
        </p>
        
        <LetterTemplateList />
      </div>
    </Layout>
  );
};

export default TemplatesPage;
