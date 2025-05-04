
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Edit, 
  FileText, 
  ArrowLeft,
  Building,
  BarChart,
  Clock,
  Briefcase
} from "lucide-react";
import { Property } from "@/types/property";

interface PropertyDetailProps {
  property?: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("details");
  
  if (!property) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Propriété non trouvée</h2>
        <p className="mb-4">Nous n'avons pas pu trouver les détails de cette propriété.</p>
        <Button asChild>
          <Link to="/properties">Retour à la liste</Link>
        </Button>
      </div>
    );
  }

  const formatValue = (value: any) => {
    if (value === undefined || value === null) return "-";
    
    if (typeof value === "boolean") {
      return value ? "Oui" : "Non";
    }
    
    return value;
  };

  const getOwnerName = () => {
    if (property.owners && property.owners.length > 0) {
      const owner = property.owners[0];
      if ('name' in owner) {
        return owner.name;
      } else if ('lastName' in owner) {
        return `${owner.firstName || ''} ${owner.lastName}`.trim();
      }
    }
    return "Propriétaire inconnu";
  };

  const getOwnerType = () => {
    if (property.owners && property.owners.length > 0) {
      const owner = property.owners[0];
      if ('type' in owner) {
        switch(owner.type) {
          case 'sci': return "SCI";
          case 'sas': return "SAS";
          case 'sarl': return "SARL";
          case 'sa': return "SA";
          default: return owner.type;
        }
      } else {
        return "Particulier";
      }
    }
    return "-";
  };

  const getOwnerEmail = () => {
    if (property.owners && property.owners.length > 0) {
      return property.owners[0].email;
    }
    return undefined;
  };

  const getOwnerPhone = () => {
    if (property.owners && property.owners.length > 0) {
      return property.owners[0].phone;
    }
    return undefined;
  };

  const getManagerName = () => {
    if (property.owners && property.owners.length > 0) {
      const owner = property.owners[0];
      if ('managerFirstName' in owner && 'managerLastName' in owner) {
        return `${owner.managerFirstName || ''} ${owner.managerLastName || ''}`.trim();
      }
    }
    return "-";
  };

  const getLastContactDate = () => {
    if (property.contacts && property.contacts.length > 0) {
      return property.contacts[0].lastContactDate;
    }
    return undefined;
  };

  const statusBadgeColor = property.status === "available" 
    ? "bg-green-100 text-green-800" 
    : property.status === "pending" 
      ? "bg-amber-100 text-amber-800"
      : property.status === "negotiation"
        ? "bg-purple-100 text-purple-800"
        : property.status === "option"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800";

  const statusText = property.status === "available" 
    ? "Disponible" 
    : property.status === "pending" 
      ? "En cours" 
      : property.status === "sold" 
        ? "Vendu"
        : property.status === "negotiation"
          ? "Négociation"
          : property.status === "option"
            ? "Option"
            : property.status;
  
  const opportunityScoreBadge = () => {
    if (property.opportunityScore === undefined) return null;
    
    let color = "";
    if (property.opportunityScore >= 8) color = "bg-green-100 text-green-800";
    else if (property.opportunityScore >= 6) color = "bg-amber-100 text-amber-800";
    else color = "bg-red-100 text-red-800";
    
    return (
      <Badge className={color}>Score: {property.opportunityScore}/10</Badge>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <Link to="/properties" className="text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à la liste</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2 flex-wrap">
            <span>
              {property.type} - {property.name || property.address.street}
            </span>
            <Badge className={statusBadgeColor}>{statusText}</Badge>
            {opportunityScoreBadge()}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              {property.address.number && `${property.address.number} `}
              {property.address.street}, {property.address.postalCode} {property.address.city}
            </span>
          </p>
        </div>
        
        <div className="flex gap-2 self-start">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span>Modifier</span>
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Générer un courrier</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="financials">Financiers</TabsTrigger>
              <TabsTrigger value="map">Carte</TabsTrigger>
              <TabsTrigger value="owner">Propriétaire</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Référence</p>
                      <p className="font-medium">{property.reference}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{property.type} {property.subType && `(${property.subType})`}</p>
                    </div>
                    
                    {property.building && (
                      <div>
                        <p className="text-sm text-muted-foreground">Immeuble</p>
                        <p className="font-medium">{property.building}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="font-medium">
                        {property.address.number && `${property.address.number} `}
                        {property.address.street}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Ville</p>
                      <p className="font-medium">{property.address.city}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Code postal</p>
                      <p className="font-medium">{property.address.postalCode}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Surface</p>
                      <p className="font-medium">{property.features.surface} m²</p>
                    </div>
                    
                    {property.features.rooms !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Pièces</p>
                        <p className="font-medium">{property.features.rooms}</p>
                      </div>
                    )}
                    
                    {property.features.bedrooms !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Chambres</p>
                        <p className="font-medium">{property.features.bedrooms}</p>
                      </div>
                    )}
                    
                    {property.features.floorNumber !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Étage</p>
                        <p className="font-medium">{formatValue(property.features.floorNumber)}</p>
                      </div>
                    )}
                    
                    {property.features.floors !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Étages totaux</p>
                        <p className="font-medium">{formatValue(property.features.floors)}</p>
                      </div>
                    )}
                    
                    {property.features.yearBuilt !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Année de construction</p>
                        <p className="font-medium">{formatValue(property.features.yearBuilt)}</p>
                      </div>
                    )}
                    
                    {property.features.energyClass && (
                      <div>
                        <p className="text-sm text-muted-foreground">Classe énergétique</p>
                        <p className="font-medium">{property.features.energyClass}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Date de création</p>
                      <p className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
                      <p className="font-medium">{new Date(property.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Ascenseur</span>
                        <Badge variant={property.features.hasElevator ? "default" : "outline"} className="ml-auto">
                          {property.features.hasElevator ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Balcon</span>
                        <Badge variant={property.features.hasBalcony ? "default" : "outline"} className="ml-auto">
                          {property.features.hasBalcony ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Parking</span>
                        <Badge variant={property.features.hasParking ? "default" : "outline"} className="ml-auto">
                          {property.features.hasParking ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Jardin</span>
                        <Badge variant={property.features.hasGarden ? "default" : "outline"} className="ml-auto">
                          {property.features.hasGarden ? "Oui" : "Non"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {property.description && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Description</p>
                      <p>{property.description}</p>
                    </div>
                  )}
                  
                  {property.notes && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Observations</p>
                      <p>{property.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financials" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix de vente</p>
                      <p className="font-medium text-lg">{property.financials.price.toLocaleString()} €</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Prix au m²</p>
                      <p className="font-medium">
                        {Math.round(property.financials.price / property.features.surface).toLocaleString()} €/m²
                      </p>
                    </div>
                    
                    {property.financials.tax !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Taxe foncière</p>
                        <p className="font-medium">{property.financials.tax.toLocaleString()} €/an</p>
                      </div>
                    )}
                    
                    {property.financials.charges !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Charges</p>
                        <p className="font-medium">{property.financials.charges.toLocaleString()} €/mois</p>
                      </div>
                    )}
                    
                    {property.financials.notaryFees !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Frais de notaire estimés</p>
                        <p className="font-medium">{property.financials.notaryFees.toLocaleString()} €</p>
                      </div>
                    )}
                    
                    {property.financials.acquisitionCosts !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Coûts d'acquisition</p>
                        <p className="font-medium">{property.financials.acquisitionCosts.toLocaleString()} €</p>
                      </div>
                    )}
                    
                    {property.financials.estimatedRenovationCosts !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Coûts de rénovation estimés</p>
                        <p className="font-medium">{property.financials.estimatedRenovationCosts.toLocaleString()} €</p>
                      </div>
                    )}
                    
                    {property.financials.estimatedResalePrice !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Prix de revente estimé</p>
                        <p className="font-medium">{property.financials.estimatedResalePrice.toLocaleString()} €</p>
                      </div>
                    )}
                    
                    {property.financials.rentalPrice !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Prix de location</p>
                        <p className="font-medium">{property.financials.rentalPrice.toLocaleString()} €/mois</p>
                      </div>
                    )}
                    
                    {property.financials.estimatedRentalYield !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Rendement locatif estimé</p>
                        <p className="font-medium">{property.financials.estimatedRentalYield}%</p>
                      </div>
                    )}
                    
                    {property.financials.roi !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">ROI estimé</p>
                        <p className="font-medium">{property.financials.roi}%</p>
                      </div>
                    )}
                    
                    {property.acquisitionDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Date d'acquisition</p>
                        <p className="font-medium">{new Date(property.acquisitionDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    
                    {property.expectedResaleDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Date de revente prévue</p>
                        <p className="font-medium">{new Date(property.expectedResaleDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  
                  {property.financials.estimatedRenovationCosts && property.financials.estimatedResalePrice && (
                    <div className="mt-8 p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Analyse financière
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Coût total d'acquisition</p>
                          <p className="font-medium">
                            {(property.financials.price + (property.financials.notaryFees || 0)).toLocaleString()} €
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Coût total avec rénovation</p>
                          <p className="font-medium">
                            {(
                              property.financials.price + 
                              (property.financials.notaryFees || 0) + 
                              (property.financials.estimatedRenovationCosts || 0)
                            ).toLocaleString()} €
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Plus-value brute estimée</p>
                          <p className="font-medium">
                            {(
                              property.financials.estimatedResalePrice - property.financials.price
                            ).toLocaleString()} €
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Plus-value nette estimée</p>
                          <p className="font-medium">
                            {(
                              property.financials.estimatedResalePrice - 
                              property.financials.price - 
                              (property.financials.notaryFees || 0) - 
                              (property.financials.estimatedRenovationCosts || 0)
                            ).toLocaleString()} €
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video bg-muted rounded overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Carte Google Maps</p>
                        <p className="text-xs text-muted-foreground mt-1">(Nécessite une clé API Google Maps)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">Adresse complète</p>
                    <p>
                      {property.address.number && `${property.address.number} `}
                      {property.address.street}, {property.address.postalCode} {property.address.city}
                    </p>
                  </div>
                  
                  {property.address.additionalInfo && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Informations complémentaires</p>
                      <p>{property.address.additionalInfo}</p>
                    </div>
                  )}
                  
                  {property.address.latitude && property.address.longitude && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Latitude</p>
                        <p>{property.address.latitude}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Longitude</p>
                        <p>{property.address.longitude}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="owner" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      {'name' in property.owners[0] ? (
                        <Building className="h-8 w-8 text-muted-foreground" />
                      ) : (
                        <User className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{getOwnerName()}</h3>
                      <p className="text-muted-foreground">{getOwnerType()}</p>
                      {getLastContactDate() && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Dernier contact: {new Date(getLastContactDate()!).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {'name' in property.owners[0] ? (
                      // Affichage des informations pour une entreprise
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Type de société</p>
                          <p className="font-medium">{getOwnerType()}</p>
                        </div>
                        
                        {property.owners[0].siret && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">SIRET</p>
                            <p className="font-medium">{property.owners[0].siret}</p>
                          </div>
                        )}
                        
                        {getManagerName() !== "-" && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Gérant</p>
                            <p className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{getManagerName()}</span>
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      // Affichage des informations pour un particulier
                      <>
                        {'birthDate' in property.owners[0] && property.owners[0].birthDate && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Date de naissance</p>
                            <p className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(property.owners[0].birthDate).toLocaleDateString()}</span>
                            </p>
                          </div>
                        )}
                        
                        {'age' in property.owners[0] && property.owners[0].age && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Âge</p>
                            <p className="font-medium">{property.owners[0].age} ans</p>
                          </div>
                        )}
                        
                        {'spouseFirstName' in property.owners[0] && property.owners[0].spouseFirstName && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Conjoint</p>
                            <p className="font-medium">{property.owners[0].spouseFirstName} {property.owners[0].spouseLastName}</p>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                      {getOwnerPhone() ? (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${getOwnerPhone()}`} className="text-primary hover:underline">
                            {getOwnerPhone()}
                          </a>
                        </p>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-1">
                          Rechercher le numéro
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      {getOwnerEmail() ? (
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${getOwnerEmail()}`} className="text-primary hover:underline">
                            {getOwnerEmail()}
                          </a>
                        </p>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-1">
                          Rechercher l'email
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {property.contacts && property.contacts.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Historique des contacts
                      </h4>
                      <div className="space-y-4">
                        {property.contacts.map((contact, index) => (
                          <div key={index} className="flex flex-col p-3 border rounded-md bg-muted/20">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{contact.contactName || getOwnerName()}</p>
                              {contact.lastContactDate && (
                                <Badge variant="outline">
                                  {new Date(contact.lastContactDate).toLocaleDateString()}
                                </Badge>
                              )}
                            </div>
                            {contact.contactNotes && (
                              <p className="text-sm text-muted-foreground">{contact.contactNotes}</p>
                            )}
                            {contact.nextContactDate && (
                              <p className="text-xs mt-2 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Prochain contact: {new Date(contact.nextContactDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-4">Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Appeler</span>
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>Envoyer un email</span>
                      </Button>
                      <Button className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Générer un courrier</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                {property.type === "Immeuble" || property.type === "Ensemble immobilier" ? (
                  <Building className="h-5 w-5" />
                ) : (
                  <Home className="h-5 w-5" />
                )}
                <span>Informations clés</span>
              </h3>
              
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{property.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-medium">{property.financials.price?.toLocaleString()} €</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Surface</span>
                  <span className="font-medium">{property.features.surface} m²</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Prix/m²</span>
                  <span className="font-medium">
                    {property.financials.price && property.features.surface 
                      ? Math.round(property.financials.price / property.features.surface).toLocaleString() 
                      : "-"} €/m²
                  </span>
                </li>
                {property.features.rooms !== undefined && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Pièces</span>
                    <span className="font-medium">{property.features.rooms}</span>
                  </li>
                )}
                {property.financials.estimatedRentalYield !== undefined && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Rendement locatif</span>
                    <span className="font-medium">{property.financials.estimatedRentalYield}%</span>
                  </li>
                )}
                {property.financials.roi !== undefined && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">ROI</span>
                    <span className="font-medium">{property.financials.roi}%</span>
                  </li>
                )}
                {property.opportunityScore !== undefined && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Score d'opportunité</span>
                    <span className="font-medium">{property.opportunityScore}/10</span>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-4">Actions rapides</h4>
                <div className="space-y-2">
                  <Button className="w-full flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Générer un courrier</span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Éditer la fiche
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
