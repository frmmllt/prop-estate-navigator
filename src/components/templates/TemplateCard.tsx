
import React from "react";
import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, MoreVertical, Copy } from "lucide-react";
import { LetterTemplate, typeLabels } from "@/types/templates";

interface TemplateCardProps {
  template: LetterTemplate;
  onDelete: (id: string) => void;
  onDuplicate: (template: LetterTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete, onDuplicate }) => {
  return (
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
                onClick={() => onDuplicate(template)}
              >
                <Copy className="h-4 w-4" />
                <span>Dupliquer</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-destructive focus:text-destructive"
                onClick={() => onDelete(template.id)}
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
  );
};

export default TemplateCard;
