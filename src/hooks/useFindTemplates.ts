
import { useState } from "react";
import { LetterTemplate, mockTemplates } from "@/types/templates";

export const useFindTemplates = () => {
  const [templates, setTemplates] = useState<LetterTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    templates,
    setTemplates,
    searchTerm,
    setSearchTerm,
    filteredTemplates
  };
};
