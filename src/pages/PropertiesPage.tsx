
import React, { useState } from "react";
import Layout from "@/components/Layout";
import PropertyTable from "@/components/properties/PropertyTable";
import PropertyFilterPanel from "@/components/properties/PropertyFilter";
import { mockProperties } from "@/data/mockProperties";
import { Property, PropertyFilter } from "@/types/property";

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      return;
    }
    
    const search = searchTerm.toLowerCase();
    const filtered = properties.filter(property => 
      property.reference.toLowerCase().includes(search) ||
      property.address.toLowerCase().includes(search) ||
      property.city.toLowerCase().includes(search) ||
      property.postalCode.toLowerCase().includes(search) ||
      property.type.toLowerCase().includes(search) ||
      (property.ownerName && property.ownerName.toLowerCase().includes(search))
    );
    
    setFilteredProperties(filtered);
  };
  
  const handleFilter = (filters: PropertyFilter) => {
    let filtered = [...properties];
    
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }
    
    if (filters.minSurface !== undefined) {
      filtered = filtered.filter(property => property.surface >= filters.minSurface!);
    }
    
    if (filters.maxSurface !== undefined) {
      filtered = filtered.filter(property => property.surface <= filters.maxSurface!);
    }
    
    if (filters.minRooms !== undefined) {
      filtered = filtered.filter(property => property.rooms >= filters.minRooms!);
    }
    
    if (filters.status !== undefined) {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    
    setFilteredProperties(filtered);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Propriétés</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PropertyFilterPanel onApplyFilters={handleFilter} />
          </div>
          
          <div className="lg:col-span-3">
            <PropertyTable 
              properties={filteredProperties} 
              onFilter={handleSearch} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesPage;
