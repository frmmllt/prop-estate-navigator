
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PropertyFilter } from "@/types/property";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFilterProps {
  onApplyFilters: (filters: PropertyFilter) => void;
}

const PropertyFilterPanel: React.FC<PropertyFilterProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<PropertyFilter>({
    type: undefined,
    city: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minSurface: undefined,
    maxSurface: undefined,
    minRooms: undefined,
    status: undefined,
  });

  const handleChange = (key: keyof PropertyFilter, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      type: undefined,
      city: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minSurface: undefined,
      maxSurface: undefined,
      minRooms: undefined,
      status: undefined,
    });
    onApplyFilters({});
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border space-y-4">
      <h3 className="font-medium text-lg mb-4">Filtres avancés</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="type">Type de bien</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Appartement">Appartement</SelectItem>
              <SelectItem value="Maison">Maison</SelectItem>
              <SelectItem value="Terrain">Terrain</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
              <SelectItem value="Immeuble">Immeuble</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            placeholder="Toutes les villes"
            value={filters.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="price">Prix (€)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handleChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
            />
            <span>-</span>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handleChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="surface">Surface (m²)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="minSurface"
              type="number"
              placeholder="Min"
              value={filters.minSurface || ""}
              onChange={(e) => handleChange("minSurface", e.target.value ? Number(e.target.value) : undefined)}
            />
            <span>-</span>
            <Input
              id="maxSurface"
              type="number"
              placeholder="Max"
              value={filters.maxSurface || ""}
              onChange={(e) => handleChange("maxSurface", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>
        
        <div>
          <Label>Nombre de pièces (min)</Label>
          <Select
            value={filters.minRooms?.toString()}
            onValueChange={(value) => handleChange("minRooms", value ? Number(value) : undefined)}
          >
            <SelectTrigger id="minRooms">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select
            value={filters.status}
            onValueChange={(value: 'available' | 'pending' | 'sold') => handleChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="pending">En cours</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleReset}>
          Réinitialiser
        </Button>
        <Button onClick={handleApply}>
          Appliquer
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilterPanel;
