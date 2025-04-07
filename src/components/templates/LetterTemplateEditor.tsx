
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Eye, Download, AlertCircle } from "lucide-react";

interface TemplateVariable {
  key: string;
  label: string;
  example: string;
}

const templateVariables: TemplateVariable[] = [
  { key: "{{nom_proprietaire}}", label: "Nom du propriétaire", example: "M. Dupont" },
  { key: "{{adresse_bien}}", label: "Adresse du bien", example: "123 Rue Principale" },
  { key: "{{ville_bien}}", label: "Ville", example: "Paris" },
  { key: "{{code_postal}}", label: "Code postal", example: "75001" },
  { key: "{{prix_bien}}", label: "Prix du bien", example: "450 000 €" },
  { key: "{{surface_bien}}", label: "Surface du bien", example: "85 m²" },
  { key: "{{date_courrier}}", label: "Date du courrier", example: "15 novembre 2023" },
  { key: "{{nom_agent}}", label: "Nom de l'agent", example: "Sophie Martin" },
  { key: "{{telephone_agent}}", label: "Téléphone de l'agent", example: "06 12 34 56 78" },
  { key: "{{email_agent}}", label: "Email de l'agent", example: "sophie.martin@exemple.com" },
];

const defaultTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="text-align: right; margin-bottom: 40px;">
    <p><strong>{{nom_agent}}</strong><br>
    {{telephone_agent}}<br>
    {{email_agent}}<br>
    {{date_courrier}}</p>
  </div>

  <div style="margin-bottom: 40px;">
    <p><strong>{{nom_proprietaire}}</strong><br>
    {{adresse_bien}}<br>
    {{code_postal}} {{ville_bien}}</p>
  </div>

  <div style="margin-bottom: 30px;">
    <p><strong>Objet :</strong> Proposition concernant votre bien situé {{adresse_bien}}</p>
  </div>

  <p>Madame, Monsieur,</p>

  <p>Je me permets de vous contacter au sujet de votre bien immobilier situé {{adresse_bien}} à {{ville_bien}} ({{code_postal}}).</p>

  <p>Suite à une analyse approfondie du marché immobilier dans votre secteur, je souhaite vous faire part de mon intérêt pour votre propriété d'une surface de {{surface_bien}}.</p>

  <p>Je serais ravi(e) de pouvoir échanger avec vous sur ce sujet, au cours d'un entretien à votre convenance, afin de vous présenter en détail les opportunités actuelles.</p>

  <p>Je reste à votre entière disposition pour toute information complémentaire et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

  <div style="margin-top: 40px;">
    <p><strong>{{nom_agent}}</strong><br>
    Conseiller immobilier<br>
    {{telephone_agent}}</p>
  </div>
</div>
`.trim();

const LetterTemplateEditor: React.FC = () => {
  const { toast } = useToast();
  const [name, setName] = useState("Nouveau modèle");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"offer" | "contact" | "follow-up" | "legal">("contact");
  const [htmlContent, setHtmlContent] = useState(defaultTemplate);
  const [activeTab, setActiveTab] = useState("edit");

  const handleInsertVariable = (variable: string) => {
    // Insert the variable at cursor position or at the end
    const textarea = document.getElementById("html-editor") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + variable + text.substring(end);
      setHtmlContent(newText);
      
      // Set focus back to textarea and position cursor after inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    } else {
      setHtmlContent(htmlContent + variable);
    }
  };

  const previewContent = () => {
    // Replace replaceAll with split and join which are compatible with all TS/JS versions
    let preview = htmlContent;
    templateVariables.forEach(variable => {
      preview = preview.split(variable.key).join(variable.example);
    });
    return preview;
  };

  const handleSave = () => {
    // Save template logic would go here
    toast({
      title: "Modèle enregistré",
      description: "Votre modèle a été enregistré avec succès.",
    });
  };

  const handlePreview = () => {
    setActiveTab("preview");
  };

  const handleDownload = () => {
    // PDF generation logic would go here
    toast({
      title: "PDF généré",
      description: "Le PDF a été généré et téléchargé.",
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
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
            
            <div className="mb-4">
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Éditer</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="border rounded-lg p-4 min-h-[600px]">
              <Textarea
                id="html-editor"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="font-mono text-sm h-[600px]"
              />
            </TabsContent>
            
            <TabsContent value="preview" className="border rounded-lg p-4 min-h-[600px] overflow-auto">
              <div className="bg-white p-6 border shadow-sm rounded">
                <div dangerouslySetInnerHTML={{ __html: previewContent() }} />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => history.back()}>
              Annuler
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Aperçu</span>
              </Button>
              
              <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Télécharger PDF</span>
              </Button>
              
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-4">Variables disponibles</h3>
              
              <div className="text-sm text-muted-foreground mb-4">
                <p>Cliquez sur une variable pour l'insérer dans le modèle.</p>
              </div>
              
              <div className="space-y-2">
                {templateVariables.map((variable) => (
                  <Button
                    key={variable.key}
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-xs"
                    onClick={() => handleInsertVariable(variable.key)}
                  >
                    <span className="truncate">{variable.label}</span>
                    <span className="text-muted-foreground font-mono ml-2">{variable.key}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-amber-50 text-amber-900 rounded border border-amber-200 flex gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium mb-1">Conseil d'utilisation</p>
                  <p>Les variables seront automatiquement remplacées par les données réelles lors de la génération du courrier.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LetterTemplateEditor;
