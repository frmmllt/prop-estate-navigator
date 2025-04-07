
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Eye, Download } from "lucide-react";

interface TemplateEditorProps {
  htmlContent: string;
  setHtmlContent: (content: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  previewContent: () => string;
  handleSave: () => void;
  handlePreview: () => void;
  handleDownload: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  htmlContent,
  setHtmlContent,
  activeTab,
  setActiveTab,
  previewContent,
  handleSave,
  handlePreview,
  handleDownload,
}) => {
  return (
    <>
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
    </>
  );
};

export default TemplateEditor;
