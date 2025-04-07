
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { templateVariables } from "@/hooks/useTemplateEditor";

interface TemplateVariablesProps {
  onInsertVariable: (variable: string) => void;
}

const TemplateVariables: React.FC<TemplateVariablesProps> = ({ onInsertVariable }) => {
  return (
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
              onClick={() => onInsertVariable(variable.key)}
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
  );
};

export default TemplateVariables;
