
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FilePlus } from "lucide-react";

interface TemplateSearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TemplateSearchHeader: React.FC<TemplateSearchHeaderProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des modèles..."
          className="pl-8 w-full sm:w-[300px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Button asChild>
        <Link to="/templates/new" className="flex items-center gap-2">
          <FilePlus className="h-4 w-4" />
          <span>Nouveau modèle</span>
        </Link>
      </Button>
    </div>
  );
};

export default TemplateSearchHeader;
