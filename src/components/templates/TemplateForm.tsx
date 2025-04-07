
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  type: "offer" | "contact" | "follow-up" | "legal";
  setType: (type: "offer" | "contact" | "follow-up" | "legal") => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  name,
  setName,
  description,
  setDescription,
  type,
  setType,
}) => {
  return (
    <div className="bg-white rounded-lg border border-border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="template-name">Nom du modèle</Label>
          <Input
            id="template-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez un nom pour ce modèle"
          />
        </div>
        
        <div>
          <Label htmlFor="template-type">Type de modèle</Label>
          <Select value={type} onValueChange={(value: "offer" | "contact" | "follow-up" | "legal") => setType(value)}>
            <SelectTrigger id="template-type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offer">Offre</SelectItem>
              <SelectItem value="contact">Premier contact</SelectItem>
              <SelectItem value="follow-up">Suivi</SelectItem>
              <SelectItem value="legal">Document légal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="template-description">Description</Label>
        <Textarea
          id="template-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description brève du modèle et son usage"
          rows={2}
        />
      </div>
    </div>
  );
};

export default TemplateForm;
