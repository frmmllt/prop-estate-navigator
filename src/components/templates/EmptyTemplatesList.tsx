
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface EmptyTemplatesListProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const EmptyTemplatesList: React.FC<EmptyTemplatesListProps> = ({ 
  searchTerm, 
  onClearSearch 
}) => {
  return (
    <div className="text-center p-8 bg-muted/30 rounded-lg border border-border">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Aucun modèle trouvé</h3>
      <p className="text-muted-foreground mb-4">
        Nous n'avons pas trouvé de modèles correspondant à votre recherche.
      </p>
      {searchTerm ? (
        <Button variant="outline" onClick={onClearSearch}>
          Effacer la recherche
        </Button>
      ) : (
        <Button asChild>
          <Link to="/templates/new">Créer un modèle</Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyTemplatesList;
