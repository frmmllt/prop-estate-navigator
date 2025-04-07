
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LetterTemplate, mockTemplates } from "@/types/templates";
import TemplateCard from "./TemplateCard";
import TemplateSearchHeader from "./TemplateSearchHeader";
import EmptyTemplatesList from "./EmptyTemplatesList";

const LetterTemplateList: React.FC = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<LetterTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast({
      title: "Modèle supprimé",
      description: "Le modèle a été supprimé avec succès.",
    });
  };

  const handleDuplicate = (template: LetterTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (copie)`,
      lastModified: new Date().toISOString(),
    };
    setTemplates([...templates, newTemplate]);
    toast({
      title: "Modèle dupliqué",
      description: `"${template.name}" a été dupliqué.`,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      <TemplateSearchHeader 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      
      {filteredTemplates.length === 0 ? (
        <EmptyTemplatesList 
          searchTerm={searchTerm}
          onClearSearch={clearSearch} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterTemplateList;
