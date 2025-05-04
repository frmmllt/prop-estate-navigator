
import { 
  Property, 
  PropertyType, 
  PropertyStatus,
  PropertyColumn,
  IndividualOwner,
  CompanyOwner
} from "@/types/property";

// Données mockées avec la nouvelle structure
export const mockProperties: Property[] = [
  {
    id: "1",
    reference: "PRO-2023-001",
    type: "Appartement",
    address: {
      number: "123",
      street: "Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      latitude: 48.856614,
      longitude: 2.3522219
    },
    features: {
      surface: 65,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      floorNumber: 4,
      floors: 6,
      yearBuilt: 1985,
      hasElevator: true,
      hasBalcony: true,
      hasParking: true,
      hasGarden: false,
      energyClass: "C",
      condition: "Bon état"
    },
    financials: {
      price: 450000,
      tax: 1200,
      charges: 200,
      notaryFees: 35000,
      estimatedRentalYield: 3.8
    },
    description: "Bel appartement lumineux en plein cœur de Paris",
    owners: [
      {
        civility: "M",
        firstName: "Martin",
        lastName: "Dupont",
        phone: "0123456789",
        email: "martin.dupont@example.com",
        birthDate: "1975-05-12",
        age: 48
      } as IndividualOwner
    ],
    contacts: [
      {
        contactName: "Agent Immobilier XYZ",
        contactPhone: "0698765432",
        lastContactDate: "2023-10-15",
        nextContactDate: "2023-11-01",
        contactNotes: "Relancer pour négociation prix"
      }
    ],
    status: "available",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-10-15T14:30:00Z",
    opportunityScore: 7
  },
  {
    id: "2",
    reference: "PRO-2023-002",
    type: "Maison",
    address: {
      number: "45",
      street: "Avenue des Fleurs",
      city: "Lyon",
      postalCode: "69001",
      latitude: 45.764043,
      longitude: 4.835659
    },
    features: {
      surface: 120,
      rooms: 5,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2005,
      hasElevator: false,
      hasBalcony: false,
      hasParking: true,
      hasGarden: true,
      hasTerrace: true,
      energyClass: "B",
      condition: "Excellent état"
    },
    financials: {
      price: 580000,
      tax: 2200,
      charges: 0,
      notaryFees: 42000
    },
    description: "Belle maison moderne avec jardin",
    owners: [
      {
        civility: "Mme",
        firstName: "Sophie",
        lastName: "Laurent",
        phone: "0645789123",
        email: "sophie.laurent@example.com"
      } as IndividualOwner
    ],
    contacts: [
      {
        contactName: "Propriétaire",
        contactPhone: "0645789123",
        lastContactDate: "2023-11-01",
        preferredContactMethod: "phone"
      }
    ],
    status: "available",
    createdAt: "2023-09-15T10:00:00Z",
    updatedAt: "2023-11-01T11:15:00Z",
    opportunityScore: 8
  },
  {
    id: "3",
    reference: "PRO-2023-003",
    type: "Appartement",
    address: {
      number: "8",
      street: "Boulevard de la Mer",
      city: "Marseille",
      postalCode: "13008",
      latitude: 43.296482,
      longitude: 5.36978
    },
    features: {
      surface: 58,
      rooms: 2,
      bedrooms: 1,
      bathrooms: 1,
      floorNumber: 2,
      floors: 4,
      yearBuilt: 1990,
      hasElevator: true,
      hasBalcony: true,
      hasParking: false,
      hasGarden: false,
      energyClass: "D",
      condition: "À rafraîchir"
    },
    financials: {
      price: 320000,
      tax: 950,
      charges: 150,
      notaryFees: 25600,
      estimatedRenovationCosts: 15000,
      estimatedResalePrice: 360000
    },
    description: "Appartement avec vue sur la mer",
    owners: [
      {
        civility: "M",
        firstName: "Jean",
        lastName: "Moreau",
        phone: "0678912345",
        email: "jean.moreau@example.com"
      } as IndividualOwner
    ],
    contacts: [
      {
        contactName: "Agent Immobilier ABC",
        contactPhone: "0712345678",
        lastContactDate: "2023-10-20"
      }
    ],
    status: "pending",
    createdAt: "2023-09-20T10:00:00Z",
    updatedAt: "2023-10-20T16:45:00Z",
    opportunityScore: 6
  },
  {
    id: "4",
    reference: "PRO-2023-004",
    type: "Maison",
    address: {
      number: "15",
      street: "Rue des Vignes",
      city: "Bordeaux",
      postalCode: "33000",
      latitude: 44.837789,
      longitude: -0.57918
    },
    features: {
      surface: 95,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 1,
      yearBuilt: 1975,
      hasElevator: false,
      hasBalcony: false,
      hasParking: true,
      hasGarden: true,
      energyClass: "E",
      condition: "À rénover"
    },
    financials: {
      price: 420000,
      tax: 1500,
      charges: 0,
      estimatedRenovationCosts: 50000,
      estimatedResalePrice: 520000,
      roi: 12
    },
    description: "Maison de caractère proche du centre",
    owners: [
      {
        civility: "M",
        firstName: "Pierre",
        lastName: "Dubois",
        phone: "0623456789",
        email: "pierre.dubois@example.com"
      } as IndividualOwner
    ],
    status: "available",
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2023-11-05T09:30:00Z",
    opportunityScore: 9
  },
  {
    id: "5",
    reference: "PRO-2023-005",
    type: "Immeuble",
    name: "Résidence Saint-Michel",
    address: {
      number: "27",
      street: "Avenue de la République",
      city: "Nice",
      postalCode: "06000",
      latitude: 43.7101728,
      longitude: 7.2619532
    },
    features: {
      surface: 450,
      rooms: 12,
      floors: 3,
      yearBuilt: 1930,
      hasElevator: false,
      hasParking: false,
      condition: "À rénover partiellement"
    },
    financials: {
      price: 1250000,
      tax: 8500,
      charges: 1200,
      estimatedRenovationCosts: 150000,
      estimatedResalePrice: 1600000,
      estimatedRentalYield: 6.2,
      roi: 16
    },
    description: "Immeuble de rapport au centre-ville composé de 8 appartements",
    owners: [
      {
        name: "SCI Saint Michel",
        type: "sci",
        siret: "12345678901234",
        managerFirstName: "Jacques",
        managerLastName: "Martin",
        phone: "0489012345",
        email: "sci.saintmichel@example.com"
      } as CompanyOwner
    ],
    contacts: [
      {
        contactName: "Jacques Martin",
        contactPhone: "0678901234",
        lastContactDate: "2023-10-25",
        preferredContactMethod: "email"
      }
    ],
    status: "negotiation",
    createdAt: "2023-10-05T10:00:00Z",
    updatedAt: "2023-10-25T13:00:00Z",
    opportunityScore: 9
  },
  {
    id: "6",
    reference: "PRO-2023-006",
    type: "Terrain",
    address: {
      street: "Route des Collines",
      city: "Aix-en-Provence",
      postalCode: "13100",
      latitude: 43.5297,
      longitude: 5.4474
    },
    features: {
      surface: 2500,
      condition: "Constructible"
    },
    financials: {
      price: 380000,
      tax: 2200,
      notaryFees: 28000
    },
    description: "Terrain constructible avec vue panoramique",
    owners: [
      {
        name: "SARL Terrains du Sud",
        type: "sarl",
        siret: "98765432109876",
        managerFirstName: "Philippe",
        managerLastName: "Durand",
        phone: "0490123456",
        email: "contact@terrainsdusud.fr"
      } as CompanyOwner
    ],
    status: "available",
    createdAt: "2023-10-12T10:00:00Z",
    updatedAt: "2023-11-03T09:15:00Z",
    opportunityScore: 7
  },
  {
    id: "7",
    reference: "PRO-2023-007",
    type: "Ensemble immobilier",
    name: "Les Jardins de Strasbourg",
    building: "Résidence principale",
    address: {
      number: "12-18",
      street: "Rue des Platanes",
      city: "Strasbourg",
      postalCode: "67000",
      latitude: 48.5734,
      longitude: 7.7521
    },
    features: {
      surface: 1800,
      rooms: 45,
      floors: 4,
      yearBuilt: 1995,
      hasElevator: true,
      hasParking: true,
      hasGarden: true,
      condition: "Bon état général"
    },
    financials: {
      price: 3200000,
      tax: 25000,
      charges: 4500,
      estimatedRentalYield: 5.8,
      roi: 14
    },
    description: "Ensemble immobilier composé de 3 bâtiments avec 25 logements et 2 commerces",
    owners: [
      {
        name: "SAS Immobilière Alsace",
        type: "sas",
        siret: "45678901234567",
        managerFirstName: "Marie",
        managerLastName: "Klein",
        phone: "0388765432",
        email: "direction@immobiliere-alsace.fr"
      } as CompanyOwner
    ],
    contacts: [
      {
        contactName: "Marie Klein",
        contactPhone: "0687654321",
        contactEmail: "m.klein@immobiliere-alsace.fr",
        lastContactDate: "2023-11-10",
        nextContactDate: "2023-12-05",
        preferredContactMethod: "phone"
      }
    ],
    status: "pending",
    createdAt: "2023-09-28T11:20:00Z",
    updatedAt: "2023-11-10T10:45:00Z",
    opportunityScore: 8
  }
];

// Colonnes par défaut pour l'affichage dans le tableau
export const defaultColumns: PropertyColumn[] = [
  { id: "reference", label: "Référence", visible: true, sortable: true },
  { id: "type", label: "Type", visible: true, sortable: true },
  { id: "address.city", label: "Ville", visible: true, sortable: true },
  { id: "address.street", label: "Adresse", visible: true, sortable: true },
  { id: "address.postalCode", label: "Code Postal", visible: true, sortable: true },
  { id: "financials.price", label: "Prix", visible: true, sortable: true },
  { id: "features.surface", label: "Surface", visible: true, sortable: true },
  { id: "features.rooms", label: "Pièces", visible: true, sortable: true },
  { id: "status", label: "Statut", visible: true, sortable: true },
  { id: "opportunityScore", label: "Score d'opportunité", visible: true, sortable: true },
  { id: "contacts.lastContactDate", label: "Dernier Contact", visible: false, sortable: true },
  { id: "owners.0.name", label: "Propriétaire (Société)", visible: false, sortable: true },
  { id: "owners.0.lastName", label: "Propriétaire (Nom)", visible: false, sortable: true },
  { id: "features.energyClass", label: "Classe Énergie", visible: false, sortable: true },
  { id: "features.yearBuilt", label: "Année Construction", visible: false, sortable: true },
  { id: "financials.estimatedRentalYield", label: "Rendement locatif", visible: false, sortable: true },
  { id: "financials.roi", label: "ROI estimé", visible: false, sortable: true },
];
