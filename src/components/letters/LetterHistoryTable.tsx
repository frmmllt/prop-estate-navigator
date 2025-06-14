
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { LetterHistoryEntry } from "@/utils/letterHistory";

// Utility to get a readable template label from id, fallback to id
type TemplateMeta = { id: string; name: string };
interface Props {
  entries: LetterHistoryEntry[];
  templates?: TemplateMeta[];
}

const LetterHistoryTable: React.FC<Props> = ({ entries, templates = [] }) => {
  function getTemplateName(templateId: string) {
    if (templateId === "default") return "Modèle classique";
    const found = templates.find((t) => t.id === templateId);
    return found?.name || templateId;
  }

  return (
    <div className="overflow-x-auto rounded border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Modèle utilisé</TableHead>
            <TableHead>Utilisateur</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">Aucune génération pour ce bien.</TableCell>
            </TableRow>
          ) : (
            entries
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>{new Date(entry.date).toLocaleString("fr-FR")}</TableCell>
                  <TableCell>{getTemplateName(entry.templateId)}</TableCell>
                  <TableCell>{entry.userEmail}</TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LetterHistoryTable;
