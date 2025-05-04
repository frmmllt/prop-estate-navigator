
// Types de propriétés immobilières
export type PropertyType = 
  | 'Appartement' 
  | 'Maison' 
  | 'Immeuble' 
  | 'Ensemble immobilier' 
  | 'Terrain' 
  | 'Local commercial' 
  | 'Bureau' 
  | 'Garage/Parking'
  | 'Autre';

// États possibles d'une propriété
export type PropertyStatus = 'available' | 'pending' | 'sold' | 'option' | 'negotiation';

// Types de propriétaires
export type OwnerType = 'particulier' | 'sci' | 'sas' | 'sarl' | 'sa' | 'autre';

// Interface pour adresse structurée
export interface Address {
  number?: string;
  street: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
  latitude?: number;
  longitude?: number;
}

// Interface pour les informations sur le propriétaire individuel
export interface IndividualOwner {
  civility?: string; // S/P dans le fichier source (Monsieur/Madame)
  qualification?: string; // Qual dans le fichier
  genre?: string;
  firstName?: string;
  lastName: string;
  maidenName?: string; // Nom marital dans le fichier
  birthDate?: string;
  age?: number;
  maritalStatus?: string;
  spouseFirstName?: string; // Conj_Prénom
  spouseLastName?: string;  // Conj_Nom
  phone?: string;
  email?: string;
  alternateAddress?: Address;
}

// Interface pour les informations sur l'entreprise propriétaire
export interface CompanyOwner {
  name: string;
  type: string; // SCI, SAS, SARL, etc.
  siret?: string;
  managerFirstName?: string; // Gérant_Prénom
  managerLastName?: string;  // Gérant_Nom
  phone?: string;
  email?: string;
  address?: Address;
}

// Union type pour le propriétaire
export type Owner = IndividualOwner | CompanyOwner;

// Interface pour les caractéristiques du bien
export interface PropertyFeatures {
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  floorNumber?: number;
  yearBuilt?: number;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  hasParking?: boolean;
  hasGarden?: boolean;
  hasTerrace?: boolean;
  hasBasement?: boolean;
  hasAttic?: boolean;
  energyClass?: string;
  gasEmissionClass?: string;
  condition?: string; // État du bien (neuf, à rénover, etc.)
}

// Interface pour les informations financières
export interface PropertyFinancials {
  price: number;
  rentalPrice?: number; // Pour les locations
  estimatedRentalYield?: number;
  tax?: number;
  charges?: number;
  notaryFees?: number;
  acquisitionCosts?: number;
  estimatedRenovationCosts?: number;
  estimatedResalePrice?: number;
  roi?: number; // Return On Investment
}

// Interface pour les contacts et suivi
export interface PropertyContact {
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  lastContactDate?: string;
  nextContactDate?: string;
  contactNotes?: string;
  preferredContactMethod?: 'email' | 'phone' | 'mail';
}

// Interface principale pour les propriétés
export interface Property {
  id: string;
  reference: string;
  type: PropertyType;
  subType?: string;
  name?: string; // Ex: "Résidence Les Lilas"
  address: Address;
  building?: string; // Immeuble dans le fichier source
  features: PropertyFeatures;
  financials: PropertyFinancials;
  description?: string;
  status: PropertyStatus;
  owners: Owner[];
  contacts?: PropertyContact[];
  documents?: string[]; // Chemins des documents liés (actes, diagnostics, etc.)
  notes?: string; // Observations dans le fichier source
  createdAt: string;
  updatedAt: string;
  acquisitionDate?: string;
  expectedResaleDate?: string;
  opportunityScore?: number; // Score d'opportunité (1-10)
  [key: string]: any; // Pour permettre des champs supplémentaires
}

export interface PropertyFilter {
  search?: string;
  type?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  minRooms?: number;
  status?: PropertyStatus;
  ownerType?: OwnerType;
  hasElevator?: boolean;
  hasParking?: boolean;
  yearBuiltMin?: number;
  yearBuiltMax?: number;
  energyClass?: string[];
  opportunityScoreMin?: number;
}

export interface PropertyColumn {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
}
