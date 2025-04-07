
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Search,
  FileText,
  FilePlus,
  Edit,
  Trash,
  MoreVertical,
  Copy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface LetterTemplate {
  id: string;
  name: string;
  description: string;
  type: "offer" | "contact" | "follow-up" | "legal";
  lastModified: string;
  createdBy: string;
}

const mockTemplates: LetterTemplate[] = [
  {
    id: "1",
    name: "Offre d'achat standard",
    description: "Modèle de lettre pour présenter une offre d'achat formelle avec paramètres ajustables.",
    type: "offer",
    lastModified: "2023-11-10T10:30:00Z",
    createdBy: "Admin"
  },
  {
    id: "2",
    name: "Premier contact propriétaire",
    description: "Modèle pour initier le contact avec un propriétaire identifié.",
    type: "contact",
    lastModified: "2023-11-05T14:45:00Z",
    createdBy: "Admin"
  },
  {
    id: "3",
    name: "Suivi après visite",
    description: "Lettre de suivi pour remercier le propriétaire après une visite du bien.",
    type: "follow-up",
    lastModified: "2023-10-28T09:15:00Z",
    createdBy: "Admin"
  },
  {
    id: "4",
    name: "Convocation assemblée copropriété",
    description: "Modèle pour convoquer les propriétaires à une assemblée générale.",
    type: "legal",
    lastModified: "2023-10-15T16:30:00Z",
    createdBy: "Admin"
  }
];

const typeLabels = {
  offer: { label: "Offre", color: "bg-blue-100 text-blue-800" },
  contact: { label: "Contact", color: "bg-green-100 text-green-800" },
  "follow-up": { label: "Suivi", color: "bg-purple-100 text-purple-800" },
  legal: { label: "Légal", color: "bg-red-100 text-red-800" }
};

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

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des modèles..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button asChild>
          <Link to="/templates/new" className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Nouveau modèle</span>
          </Link>
        </Button>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="text-center p-8 bg-muted/30 rounded-lg border border-border">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucun modèle trouvé</h3>
          <p className="text-muted-foreground mb-4">
            Nous n'avons pas trouvé de modèles correspondant à votre recherche.
          </p>
          {searchTerm ? (
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Effacer la recherche
            </Button>
          ) : (
            <Button asChild>
              <Link to="/templates/new">Créer un modèle</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={`${typeLabels[template.type].color} hover:${typeLabels[template.type].color}`}>
                    {typeLabels[template.type].label}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/templates/${template.id}/edit`} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          <span>Modifier</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={() => handleDuplicate(template)}
                      >
                        <Copy className="h-4 w-4" />
                        <span>Dupliquer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="mt-2 text-xl">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="text-sm text-muted-foreground pb-3">
                <p>Dernière modification: {new Date(template.lastModified).toLocaleDateString()}</p>
                <p>Créé par: {template.createdBy}</p>
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="flex justify-between w-full">
                  <Button variant="outline" asChild>
                    <Link to={`/templates/${template.id}`}>Aperçu</Link>
                  </Button>
                  <Button asChild>
                    <Link to={`/templates/${template.id}/use`}>Utiliser</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterTemplateList;
