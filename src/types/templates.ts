
import { defaultTemplate } from "@/hooks/useTemplateEditor";

export interface LetterTemplate {
  id: string;
  name: string;
  description: string;
  type: "offer" | "contact" | "follow-up" | "legal";
  lastModified: string;
  createdBy: string;
  htmlContent?: string; // ADDED
}

export const typeLabels = {
  offer: { label: "Offre", color: "bg-blue-100 text-blue-800" },
  contact: { label: "Contact", color: "bg-green-100 text-green-800" },
  "follow-up": { label: "Suivi", color: "bg-purple-100 text-purple-800" },
  legal: { label: "Légal", color: "bg-red-100 text-red-800" }
};

export const mockTemplates: LetterTemplate[] = [
  {
    id: "1",
    name: "Offre d'achat standard",
    description: "Modèle de lettre pour présenter une offre d'achat formelle avec paramètres ajustables.",
    type: "offer",
    lastModified: "2023-11-10T10:30:00Z",
    createdBy: "Admin",
    htmlContent: `
      <div>
        <h2>Offre d'achat standard</h2>
        <p>Madame, Monsieur, ...</p>
        <p>Prix d'achat proposé : {{prix_bien}}</p>
        <p>Cordialement,<br/>{{nom_agent}}</p>
      </div>
    `.trim()
  },
  {
    id: "2",
    name: "Premier contact propriétaire",
    description: "Modèle pour initier le contact avec un propriétaire identifié.",
    type: "contact",
    lastModified: "2023-11-05T14:45:00Z",
    createdBy: "Admin",
    htmlContent: `
      <div>
        <h2>Premier contact propriétaire</h2>
        <p>Bonjour {{nom_proprietaire}},</p>
        <p>Je souhaite vous contacter concernant votre bien situé {{adresse_bien}}.</p>
      </div>
    `.trim()
  },
  {
    id: "3",
    name: "Suivi après visite",
    description: "Lettre de suivi pour remercier le propriétaire après une visite du bien.",
    type: "follow-up",
    lastModified: "2023-10-28T09:15:00Z",
    createdBy: "Admin",
    htmlContent: `
      <div>
        <h2>Suivi après visite</h2>
        <p>Merci de nous avoir reçu ...</p>
      </div>
    `.trim()
  },
  {
    id: "4",
    name: "Convocation assemblée copropriété",
    description: "Modèle pour convoquer les propriétaires à une assemblée générale.",
    type: "legal",
    lastModified: "2023-10-15T16:30:00Z",
    createdBy: "Admin",
    htmlContent: `
      <div>
        <h2>Convocation assemblée copropriété</h2>
        <p>Vous êtes convié ...</p>
      </div>
    `.trim()
  }
];
