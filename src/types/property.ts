
export interface Property {
  id: string;
  reference: string;
  type: string;
  address: string;
  city: string;
  postalCode: string;
  price: number;
  surface: number;
  rooms: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  energyClass?: string;
  tax?: number;
  charges?: number;
  description?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  lastContact?: string;
  status: 'available' | 'pending' | 'sold';
  createdAt: string;
  updatedAt: string;
  latitude?: number;
  longitude?: number;
  [key: string]: any; // To allow for additional data columns
}

export interface PropertyFilter {
  search?: string;
  type?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  minRooms?: number;
  status?: 'available' | 'pending' | 'sold';
}

export interface PropertyColumn {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
}
