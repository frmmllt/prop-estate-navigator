
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Property, PropertyColumn } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Download, ArrowUp, ArrowDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { defaultColumns } from "@/data/mockProperties";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PropertyTableProps {
  properties: Property[];
  onFilter: (search: string) => void;
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties, onFilter }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState<PropertyColumn[]>(defaultColumns);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter(value);
  };

  const handleRowClick = (property: Property) => {
    navigate(`/properties/${property.id}`);
  };

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  // Fonction pour accéder à une propriété imbriquée par chemin (ex: "financials.price")
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split('.');
    return keys.reduce((value, key) => {
      return value && typeof value === 'object' ? value[key] : undefined;
    }, obj);
  };

  const sortedProperties = React.useMemo(() => {
    if (!sortColumn) return properties;
    
    return [...properties].sort((a, b) => {
      const aValue = getNestedValue(a, sortColumn);
      const bValue = getNestedValue(b, sortColumn);
      
      if (aValue === undefined || aValue === null) return sortDirection === "asc" ? -1 : 1;
      if (bValue === undefined || bValue === null) return sortDirection === "asc" ? 1 : -1;
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [properties, sortColumn, sortDirection]);

  const formatValue = (property: Property, columnId: string) => {
    const value = getNestedValue(property, columnId);
    
    if (value === undefined || value === null) return "-";
    
    switch (columnId) {
      case "financials.price":
        return `${Number(value).toLocaleString()} €`;
      case "features.surface":
        return `${value} m²`;
      case "status":
        return value === "available" 
          ? "Disponible" 
          : value === "pending" 
            ? "En cours" 
            : value === "sold"
              ? "Vendu"
              : value === "negotiation"
                ? "Négociation"
                : value === "option"
                  ? "Option"
                  : value;
      case "contacts.lastContactDate":
        return value ? new Date(value).toLocaleDateString() : "-";
      case "features.hasElevator":
      case "features.hasBalcony":
      case "features.hasParking":
      case "features.hasGarden":
        return value ? "Oui" : "Non";
      case "opportunityScore":
        return value ? `${value}/10` : "-";
      case "financials.estimatedRentalYield":
        return value ? `${value}%` : "-";
      case "financials.roi":
        return value ? `${value}%` : "-";
      case "owners.0.lastName":
        if (property.owners && property.owners.length > 0) {
          const owner = property.owners[0];
          if ('lastName' in owner) {
            return owner.firstName ? `${owner.lastName} ${owner.firstName}` : owner.lastName;
          }
        }
        return "-";
      case "owners.0.name":
        if (property.owners && property.owners.length > 0) {
          const owner = property.owners[0];
          if ('name' in owner) {
            return owner.name;
          }
        }
        return "-";
      default:
        return value;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full md:w-auto flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les propriétés..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Colonnes</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.visible}
                  onCheckedChange={() => toggleColumnVisibility(column.id)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              {columns
                .filter((column) => column.visible)
                .map((column) => (
                  <TableHead 
                    key={column.id}
                    className={column.sortable ? "cursor-pointer select-none" : ""}
                    onClick={column.sortable ? () => handleSort(column.id) : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {sortColumn === column.id && (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      )}
                    </div>
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.filter(col => col.visible).length + 1} className="text-center py-4">
                  Aucune propriété trouvée
                </TableCell>
              </TableRow>
            ) : (
              sortedProperties.map((property) => (
                <TableRow 
                  key={property.id} 
                  onClick={() => handleRowClick(property)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="w-[50px]" onClick={(e) => e.stopPropagation()}>
                    <Checkbox />
                  </TableCell>
                  {columns
                    .filter((column) => column.visible)
                    .map((column) => (
                      <TableCell key={column.id}>{formatValue(property, column.id)}</TableCell>
                    ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyTable;
