
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const ExcelUploader: React.FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "progress" | "success" | "error">("idle");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if the file is an Excel file
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
      setFile(file);
      toast({
        title: "Fichier sélectionné",
        description: `${file.name} (${formatFileSize(file.size)})`,
      });
    } else {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner un fichier Excel (.xlsx, .xls) ou CSV (.csv)",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadStatus("progress");
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadStatus("success");
            
            toast({
              title: "Import réussi",
              description: "Le fichier a été importé avec succès.",
            });
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 400);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadStatus === "idle" || uploadStatus === "progress" ? (
            <>
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              
              <h3 className="text-lg font-medium mb-2">
                {file 
                  ? `Fichier sélectionné : ${file.name}`
                  : "Glissez-déposez votre fichier Excel ici"}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {file 
                  ? `Taille: ${formatFileSize(file.size)}`
                  : "ou utilisez le bouton ci-dessous pour sélectionner un fichier"}
              </p>
              
              {file ? (
                <div className="space-y-4">
                  {uploadStatus === "progress" ? (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground">
                        Importation en cours... {uploadProgress}%
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? "Importation..." : "Importer"}
                      </Button>
                      <Button variant="outline" onClick={resetUpload} disabled={isUploading}>
                        Annuler
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    id="excel-file"
                    onChange={handleFileInputChange}
                  />
                  <label htmlFor="excel-file">
                    <Button asChild>
                      <span>Sélectionner un fichier</span>
                    </Button>
                  </label>
                </div>
              )}
            </>
          ) : uploadStatus === "success" ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Import réussi!</h3>
              <p className="text-muted-foreground mb-6">
                Le fichier {file?.name} a été importé avec succès.
              </p>
              <div className="flex justify-center gap-2">
                <Button onClick={resetUpload}>Importer un nouveau fichier</Button>
                <Button variant="outline" asChild>
                  <a href="/properties">Voir les propriétés</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Erreur d'importation</h3>
              <p className="text-muted-foreground mb-6">
                Une erreur est survenue lors de l'importation. Veuillez réessayer.
              </p>
              <Button onClick={resetUpload}>Réessayer</Button>
            </div>
          )}
        </div>
        
        <div className="bg-muted/50 p-6 rounded-lg border border-border">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span>Instructions d'importation</span>
          </h3>
          
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV (.csv)</li>
            <li>La première ligne doit contenir les en-têtes des colonnes</li>
            <li>Les colonnes obligatoires sont : Référence, Type, Adresse, Ville, Code postal, Prix et Surface</li>
            <li>Taille maximale du fichier : 10 MB</li>
            <li>Nombre maximal de lignes : 10 000</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader;
