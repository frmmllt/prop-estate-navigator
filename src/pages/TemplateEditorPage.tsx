
import React from "react";
import Layout from "@/components/Layout";
import LetterTemplateEditor from "@/components/templates/LetterTemplateEditor";

const TemplateEditorPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Éditeur de modèle</h1>
        <p className="text-muted-foreground mb-8">
          Créez ou modifiez un modèle de courrier avec des variables dynamiques.
        </p>
        
        <LetterTemplateEditor />
      </div>
    </Layout>
  );
};

export default TemplateEditorPage;
