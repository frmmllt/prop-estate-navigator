
import React from "react";
import TemplateForm from "./TemplateForm";
import TemplateEditor from "./TemplateEditor";
import TemplateVariables from "./TemplateVariables";
import { useTemplateEditor } from "@/hooks/useTemplateEditor";

const LetterTemplateEditor: React.FC = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    type,
    setType,
    htmlContent,
    setHtmlContent,
    activeTab,
    setActiveTab,
    handleInsertVariable,
    previewContent,
    handleSave,
    handlePreview,
    handleDownload
  } = useTemplateEditor();

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <TemplateForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            type={type}
            setType={setType}
          />
          
          <TemplateEditor
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            previewContent={previewContent}
            handleSave={handleSave}
            handlePreview={handlePreview}
            handleDownload={handleDownload}
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <TemplateVariables onInsertVariable={handleInsertVariable} />
        </div>
      </div>
    </div>
  );
};

export default LetterTemplateEditor;
