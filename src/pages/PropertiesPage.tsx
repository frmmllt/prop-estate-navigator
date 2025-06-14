import React, { useState } from "react";
import Layout from "@/components/Layout";
import PropertyTable from "@/components/properties/PropertyTable";
import PropertyFilterPanel from "@/components/properties/PropertyFilter";
import { useApiProperties } from "@/hooks/useApiProperties";
import { Property, PropertyFilter } from "@/types/property";
import { useAuth } from "@/contexts/AuthContext";

const PropertiesPage: React.FC = () => {
  const { data: properties = [], isLoading } = useApiProperties();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const { user } = useAuth();

  // Filtrage par section selon droits utilisateur
  const getSection = (property: Property) => property["section"] || ""; // adapter si section ailleurs
  const sectionsUser = user?.sectionsAutorisees ?? [];
  const isAdmin = user?.role === "admin";
  // Si pas admin, filtrer selon sections accessibles
  const filterBySection = (props: Property[]) =>
    isAdmin || !sectionsUser.length
      ? props
      : props.filter(p => sectionsUser.includes(getSection(p)));

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProperties(filterBySection(properties));
      return;
    }
    const search = searchTerm.toLowerCase();
    const filtered = filterBySection(properties).filter(property => 
      property.reference.toLowerCase().includes(search) ||
      property.address.street.toLowerCase().includes(search) ||
      property.address.city.toLowerCase().includes(search) ||
      property.address.postalCode.toLowerCase().includes(search) ||
      property.type.toLowerCase().includes(search) ||
      (property.owners && property.owners.length > 0 && 
        (('name' in property.owners[0] && property.owners[0].name?.toLowerCase().includes(search)) ||
         ('lastName' in property.owners[0] && property.owners[0].lastName?.toLowerCase().includes(search))))
    );

    setFilteredProperties(filtered);
  };

  const handleFilter = (filters: PropertyFilter) => {
    let filtered = filterBySection(properties);

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    if (filters.city) {
      filtered = filtered.filter(property => 
        property.address.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => property.financials.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => property.financials.price <= filters.maxPrice!);
    }
    if (filters.minSurface !== undefined) {
      filtered = filtered.filter(property => property.features.surface >= filters.minSurface!);
    }
    if (filters.maxSurface !== undefined) {
      filtered = filtered.filter(property => property.features.surface <= filters.maxSurface!);
    }
    if (filters.minRooms !== undefined && filters.minRooms > 0) {
      filtered = filtered.filter(property => 
        property.features.rooms !== undefined && 
        property.features.rooms >= filters.minRooms!
      );
    }
    if (filters.status !== undefined) {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    setFilteredProperties(filtered);
  };

  React.useEffect(() => {
    // Appliquer filtre sections à l'initialisation/lorsque user change
    setFilteredProperties(filterBySection(properties));
    // eslint-disable-next-line
  }, [user]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Propriétés</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PropertyFilterPanel onApplyFilters={handleFilter} />
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div>Chargement des propriétés...</div>
            ) : (
              <PropertyTable 
                properties={filteredProperties} 
                onFilter={handleSearch} 
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesPage;
