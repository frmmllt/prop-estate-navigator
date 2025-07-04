
import React, { useState, useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { templateVariables, defaultTemplate } from "@/hooks/useTemplateEditor";
import { LetterTemplate, mockTemplates } from "@/types/templates";
import html2pdf from "html2pdf.js";
import { useAuth } from "@/contexts/AuthContext";
import { logUserAction } from "@/utils/userLogger";
import { logLetterGeneration } from "@/utils/letterHistory"; // <== NEW

interface GenerateLetterModalProps {
  open: boolean;
  onClose: () => void;
  property: any;
}

const fillTemplateVariables = (template: string, property: any) => {
  // Remplacement basique : on prend les variables du bien/agent si présentes, sinon exemple
  let result = template;
  templateVariables.forEach(variable => {
    let value = variable.example;
    switch (variable.key) {
      case "{{nom_proprietaire}}":
        value = property.owners?.[0]?.name || property.owners?.[0]?.lastName || variable.example;
        break;
      case "{{adresse_bien}}":
        value = [property.address?.number, property.address?.street].filter(Boolean).join(" ") || variable.example;
        break;
      case "{{ville_bien}}":
        value = property.address?.city || variable.example;
        break;
      case "{{code_postal}}":
        value = property.address?.postalCode || variable.example;
        break;
      case "{{prix_bien}}":
        value = property.financials?.price?.toLocaleString() + " €" || variable.example;
        break;
      case "{{surface_bien}}":
        value = property.features?.surface + " m²" || variable.example;
        break;
      // Pour démo, date du jour
      case "{{date_courrier}}":
        value = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
        break;
      // Agent fictif
      case "{{nom_agent}}":
        value = "Votre Nom";
        break;
      case "{{telephone_agent}}":
        value = "06 12 34 56 78";
        break;
      case "{{email_agent}}":
        value = "agent@email.com";
        break;
    }
    result = result.split(variable.key).join(value);
  });
  return result;
};

const GenerateLetterModal: React.FC<GenerateLetterModalProps> = ({ open, onClose, property }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("default");
  const [editorValue, setEditorValue] = useState<string>(defaultTemplate);
  const pdfPreviewRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  // On changer de template : mettre à jour l'éditeur !
  React.useEffect(() => {
    if (selectedTemplateId === "default") {
      setEditorValue(defaultTemplate);
    } else {
      const chosen = mockTemplates.find((t) => t.id === selectedTemplateId);
      setEditorValue(chosen ? chosen.htmlContent : defaultTemplate);
    }
  }, [selectedTemplateId]);

  const handleInsertVariable = (variable: string) => {
    // Insérer à la position actuelle du curseur
    const textarea = document.getElementById("letter-editor") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + variable + text.substring(end);
      setEditorValue(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    } else {
      setEditorValue(editorValue + variable);
    }
  };

  const handleDownloadPDF = async () => {
    const content = fillTemplateVariables(editorValue, property);

    // Log PDF generation
    if (user?.email) {
      logUserAction(user.email, "pdf_generated", {
        propertyId: property?.id,
        templateId: selectedTemplateId,
        usedVariables: templateVariables.filter(v => content.includes(v.example)).map(v => v.key),
      });

      // Also log to letter history (NEW)
      const templateObj = selectedTemplateId === "default"
        ? { id: "default", name: "Modèle classique" }
        : mockTemplates.find((t) => t.id === selectedTemplateId);

      logLetterGeneration(
        property?.id,
        selectedTemplateId,
        templateObj?.name || selectedTemplateId,
        user.email
      );
    }

    if (pdfPreviewRef.current) {
      pdfPreviewRef.current.innerHTML = content;
      await html2pdf().from(pdfPreviewRef.current).set({
        margin: 10,
        filename: "courrier.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      }).save();
      // Nettoyage
      pdfPreviewRef.current.innerHTML = "";
    }
  };

  // Log template usage each time template is changed (excluding first render)
  React.useEffect(() => {
    if (user?.email && selectedTemplateId) {
      logUserAction(user.email, "template_used", {
        templateId: selectedTemplateId,
        propertyId: property?.id,
      });
    }
    // We purposely log each template selection, as requested
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateId]);

  // Affichage
  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Générer un courrier</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Sélection du modèle */}
          <div>
            <label className="font-medium text-sm mb-1 block">Choisir un modèle</label>
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un modèle de courrier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Modèle classique</SelectItem>
                {mockTemplates.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Insertion variable */}
          <div>
            <label className="block font-medium text-sm mb-1">Insérer une variable</label>
            <div className="flex flex-wrap gap-2">
              {templateVariables.map(v => (
                <Button key={v.key} type="button" size="sm" variant="outline" onClick={() => handleInsertVariable(v.key)}>
                  {v.label}
                </Button>
              ))}
            </div>
          </div>
          {/* Editeur */}
          <Textarea
            id="letter-editor"
            value={editorValue}
            onChange={e => setEditorValue(e.target.value)}
            className="font-mono text-sm h-[200px]"
          />
        </div>
        {/* PDF preview (invisible) */}
        <div ref={pdfPreviewRef} style={{ display: "none" }} />
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
          <Button type="button" onClick={handleDownloadPDF}>Télécharger le PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateLetterModal;
