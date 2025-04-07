
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  ArrowLeft 
} from "lucide-react";
import { Property } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";

interface PropertyDetailProps {
  property?: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property: propProperty }) => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  
  // If property is not passed as prop, find it from the mock data
  const property = propProperty || mockProperties.find(p => p.id === id);
  
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

  const statusBadgeColor = property.status === "available" 
    ? "bg-green-100 text-green-800" 
    : property.status === "pending" 
      ? "bg-amber-100 text-amber-800" 
      : "bg-blue-100 text-blue-800";

  const statusText = property.status === "available" 
    ? "Disponible" 
    : property.status === "pending" 
      ? "En cours" 
      : "Vendu";

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <Link to="/properties" className="text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à la liste</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <span>{property.type} - {property.address}</span>
            <Badge className={statusBadgeColor}>{statusText}</Badge>
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{property.postalCode} {property.city}</span>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Détails</TabsTrigger>
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
                      <p className="text-sm text-muted-foreground">Prix</p>
                      <p className="font-medium">{property.price?.toLocaleString()} €</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Surface</p>
                      <p className="font-medium">{property.surface} m²</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Pièces</p>
                      <p className="font-medium">{property.rooms}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Étage</p>
                      <p className="font-medium">{formatValue(property.floor)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Étages totaux</p>
                      <p className="font-medium">{formatValue(property.totalFloors)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Année de construction</p>
                      <p className="font-medium">{formatValue(property.yearBuilt)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Classe énergétique</p>
                      <p className="font-medium">{formatValue(property.energyClass)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Taxe foncière</p>
                      <p className="font-medium">{property.tax ? `${property.tax} €/an` : "-"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Charges</p>
                      <p className="font-medium">{property.charges ? `${property.charges} €/mois` : "-"}</p>
                    </div>
                    
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
                        <Badge variant={property.hasElevator ? "default" : "outline"} className="ml-auto">
                          {property.hasElevator ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Balcon</span>
                        <Badge variant={property.hasBalcony ? "default" : "outline"} className="ml-auto">
                          {property.hasBalcony ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Parking</span>
                        <Badge variant={property.hasParking ? "default" : "outline"} className="ml-auto">
                          {property.hasParking ? "Oui" : "Non"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Jardin</span>
                        <Badge variant={property.hasGarden ? "default" : "outline"} className="ml-auto">
                          {property.hasGarden ? "Oui" : "Non"}
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
                    <p>{property.address}, {property.postalCode} {property.city}</p>
                  </div>
                  
                  {property.latitude && property.longitude && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Latitude</p>
                        <p>{property.latitude}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Longitude</p>
                        <p>{property.longitude}</p>
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
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{property.ownerName || "Propriétaire inconnu"}</h3>
                      {property.lastContact && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Dernier contact: {new Date(property.lastContact).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                      {property.ownerPhone ? (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${property.ownerPhone}`} className="text-primary hover:underline">
                            {property.ownerPhone}
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
                      {property.ownerEmail ? (
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${property.ownerEmail}`} className="text-primary hover:underline">
                            {property.ownerEmail}
                          </a>
                        </p>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-1">
                          Rechercher l'email
                        </Button>
                      )}
                    </div>
                  </div>
                  
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
                <Home className="h-5 w-5" />
                <span>Informations clés</span>
              </h3>
              
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{property.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-medium">{property.price?.toLocaleString()} €</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Surface</span>
                  <span className="font-medium">{property.surface} m²</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Prix/m²</span>
                  <span className="font-medium">
                    {property.price && property.surface 
                      ? Math.round(property.price / property.surface).toLocaleString() 
                      : "-"} €/m²
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Pièces</span>
                  <span className="font-medium">{property.rooms}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Étage</span>
                  <span className="font-medium">{formatValue(property.floor)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Ascenseur</span>
                  <span className="font-medium">{property.hasElevator ? "Oui" : "Non"}</span>
                </li>
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
