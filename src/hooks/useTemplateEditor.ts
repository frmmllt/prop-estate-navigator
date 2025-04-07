
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TemplateVariable {
  key: string;
  label: string;
  example: string;
}

export const templateVariables: TemplateVariable[] = [
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

export const defaultTemplate = `
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

export const useTemplateEditor = () => {
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
    // Replace variables with example values
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

  return {
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
  };
};
