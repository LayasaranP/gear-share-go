
export interface Equipment {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  priceUnit: string;
  location: {
    address: string;
    lat: number;
    lng: number;
    city: string;
    zipCode: string;
  };
  owner: string;
  rating: number;
  image: string;
  availability: {
    unavailableDates: string[];
  };
  description: string;
}

export interface SavedEquipment {
  equipmentId: string;
  savedAt: string;
}

export interface UpcomingPickup {
  id: string;
  equipmentId: string;
  equipmentName: string;
  pickupDate: string;
  pickupTime: string;
  location: string;
  owner: string;
}

export interface RecentRental {
  id: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  cost: number;
  owner: string;
  rating?: number;
}

export const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Heavy Duty Excavator",
    brand: "Caterpillar",
    category: "Construction",
    price: 450,
    priceUnit: "day",
    location: {
      address: "123 Industrial Ave, San Francisco, CA",
      lat: 37.7749,
      lng: -122.4194,
      city: "San Francisco",
      zipCode: "94102"
    },
    owner: "Mike Johnson",
    rating: 4.8,
    image: "/placeholder.svg",
    availability: {
      unavailableDates: ["2024-01-20", "2024-01-21", "2024-01-25"]
    },
    description: "Professional grade excavator perfect for construction projects"
  },
  {
    id: "2",
    name: "Professional Tractor",
    brand: "John Deere",
    category: "Farming",
    price: 320,
    priceUnit: "day",
    location: {
      address: "456 Farm Road, Sacramento, CA",
      lat: 38.5816,
      lng: -121.4944,
      city: "Sacramento",
      zipCode: "95814"
    },
    owner: "Sarah Davis",
    rating: 4.9,
    image: "/placeholder.svg",
    availability: {
      unavailableDates: ["2024-01-22", "2024-01-23"]
    },
    description: "Reliable tractor for agricultural and landscaping work"
  },
  {
    id: "3",
    name: "Industrial Generator",
    brand: "Honda",
    category: "Power Tools",
    price: 180,
    priceUnit: "day",
    location: {
      address: "789 Power St, Oakland, CA",
      lat: 37.8044,
      lng: -122.2712,
      city: "Oakland",
      zipCode: "94601"
    },
    owner: "Tom Brown",
    rating: 4.7,
    image: "/placeholder.svg",
    availability: {
      unavailableDates: ["2024-01-19", "2024-01-26"]
    },
    description: "High-capacity generator for events and construction sites"
  },
  {
    id: "4",
    name: "Concrete Mixer",
    brand: "DEWALT",
    category: "Construction",
    price: 85,
    priceUnit: "day",
    location: {
      address: "321 Builder Blvd, San Jose, CA",
      lat: 37.3382,
      lng: -121.8863,
      city: "San Jose",
      zipCode: "95110"
    },
    owner: "Lisa Wilson",
    rating: 4.6,
    image: "/placeholder.svg",
    availability: {
      unavailableDates: ["2024-01-24", "2024-01-27"]
    },
    description: "Portable concrete mixer for small to medium projects"
  },
  {
    id: "5",
    name: "Chainsaw Professional",
    brand: "Stihl",
    category: "Garden Tools",
    price: 45,
    priceUnit: "day",
    location: {
      address: "654 Garden Way, Fremont, CA",
      lat: 37.5485,
      lng: -121.9886,
      city: "Fremont",
      zipCode: "94536"
    },
    owner: "Bob Smith",
    rating: 4.8,
    image: "/placeholder.svg",
    availability: {
      unavailableDates: ["2024-01-28", "2024-01-29"]
    },
    description: "Professional grade chainsaw for tree cutting and landscaping"
  }
];

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c * 1.60934; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const fuzzySearch = (query: string, equipment: Equipment[]): Equipment[] => {
  if (!query.trim()) return equipment;
  
  const searchTerm = query.toLowerCase();
  return equipment.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.brand.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
};

export const filterByLocation = (equipment: Equipment[], userLat: number, userLng: number, maxDistance: number = 50): Equipment[] => {
  return equipment.filter(item => {
    const distance = calculateDistance(userLat, userLng, item.location.lat, item.location.lng);
    return distance <= maxDistance;
  });
};

export const filterByDateRange = (equipment: Equipment[], startDate: string, endDate: string): Equipment[] => {
  if (!startDate || !endDate) return equipment;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange: string[] = [];
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dateRange.push(d.toISOString().split('T')[0]);
  }
  
  return equipment.filter(item => {
    return !dateRange.some(date => item.availability.unavailableDates.includes(date));
  });
};
