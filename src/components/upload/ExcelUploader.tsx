
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
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

  const downloadTemplate = () => {
    // Simulation de téléchargement d'un modèle
    toast({
      title: "Téléchargement du modèle",
      description: "Le modèle d'import est en cours de téléchargement.",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-8">
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
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <label htmlFor="excel-file">
                      <Button asChild>
                        <span>Sélectionner un fichier</span>
                      </Button>
                    </label>
                    <Button variant="outline" onClick={downloadTemplate} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Télécharger le modèle</span>
                    </Button>
                  </div>
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
            <li>Colonnes prises en charge correspondant au fichier source :</li>
          </ul>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 border text-left">Colonne source</th>
                  <th className="p-2 border text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-2 border">Etat</td>
                  <td className="p-2 border">État du bien (disponible, vendu, etc.)</td>
                </tr>
                <tr>
                  <td className="p-2 border">Immeuble</td>
                  <td className="p-2 border">Nom ou référence de l'immeuble</td>
                </tr>
                <tr>
                  <td className="p-2 border">Numéro</td>
                  <td className="p-2 border">Numéro de voie</td>
                </tr>
                <tr>
                  <td className="p-2 border">Rue</td>
                  <td className="p-2 border">Nom de la rue</td>
                </tr>
                <tr>
                  <td className="p-2 border">Strasbourg</td>
                  <td className="p-2 border">Ville</td>
                </tr>
                <tr>
                  <td className="p-2 border">S/P</td>
                  <td className="p-2 border">Civilité du propriétaire</td>
                </tr>
                <tr>
                  <td className="p-2 border">NOM_PRENOM</td>
                  <td className="p-2 border">Nom et prénom du propriétaire</td>
                </tr>
                <tr>
                  <td className="p-2 border">Type</td>
                  <td className="p-2 border">Type de bien (appartement, maison, etc.)</td>
                </tr>
                <tr>
                  <td className="p-2 border">SIRET</td>
                  <td className="p-2 border">SIRET de la société propriétaire</td>
                </tr>
                <tr>
                  <td className="p-2 border">Telephone</td>
                  <td className="p-2 border">Numéro de téléphone du contact</td>
                </tr>
                <tr>
                  <td className="p-2 border">Mail</td>
                  <td className="p-2 border">Adresse email du contact</td>
                </tr>
                <tr>
                  <td className="p-2 border">Observations</td>
                  <td className="p-2 border">Notes diverses sur le bien</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader;
