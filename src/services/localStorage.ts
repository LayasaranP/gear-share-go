
import { SavedEquipment, UpcomingPickup, RecentRental } from './equipmentData';

const SAVED_EQUIPMENT_KEY = 'savedEquipment';
const UPCOMING_PICKUPS_KEY = 'upcomingPickups';
const RECENT_RENTALS_KEY = 'recentRentals';

export const savedEquipmentService = {
  getSaved(): SavedEquipment[] {
    const saved = localStorage.getItem(SAVED_EQUIPMENT_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  save(equipmentId: string): void {
    const saved = this.getSaved();
    if (!saved.find(item => item.equipmentId === equipmentId)) {
      saved.push({
        equipmentId,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem(SAVED_EQUIPMENT_KEY, JSON.stringify(saved));
    }
  },

  remove(equipmentId: string): void {
    const saved = this.getSaved().filter(item => item.equipmentId !== equipmentId);
    localStorage.setItem(SAVED_EQUIPMENT_KEY, JSON.stringify(saved));
  },

  isSaved(equipmentId: string): boolean {
    return this.getSaved().some(item => item.equipmentId === equipmentId);
  }
};

export const upcomingPickupsService = {
  getPickups(): UpcomingPickup[] {
    const pickups = localStorage.getItem(UPCOMING_PICKUPS_KEY);
    return pickups ? JSON.parse(pickups) : [];
  },

  add(pickup: Omit<UpcomingPickup, 'id'>): void {
    const pickups = this.getPickups();
    const newPickup: UpcomingPickup = {
      ...pickup,
      id: Date.now().toString()
    };
    pickups.push(newPickup);
    localStorage.setItem(UPCOMING_PICKUPS_KEY, JSON.stringify(pickups));
  },

  remove(id: string): void {
    const pickups = this.getPickups().filter(pickup => pickup.id !== id);
    localStorage.setItem(UPCOMING_PICKUPS_KEY, JSON.stringify(pickups));
  },

  update(id: string, updates: Partial<UpcomingPickup>): void {
    const pickups = this.getPickups();
    const index = pickups.findIndex(pickup => pickup.id === id);
    if (index !== -1) {
      pickups[index] = { ...pickups[index], ...updates };
      localStorage.setItem(UPCOMING_PICKUPS_KEY, JSON.stringify(pickups));
    }
  }
};

export const recentRentalsService = {
  getRentals(): RecentRental[] {
    const rentals = localStorage.getItem(RECENT_RENTALS_KEY);
    return rentals ? JSON.parse(rentals) : [
      {
        id: "1",
        equipmentName: "Power Drill",
        startDate: "2024-01-10",
        endDate: "2024-01-12",
        cost: 45,
        owner: "Mike Johnson",
        rating: 5
      },
      {
        id: "2",
        equipmentName: "Pressure Washer",
        startDate: "2024-01-08",
        endDate: "2024-01-09",
        cost: 35,
        owner: "Sarah Davis",
        rating: 4
      }
    ];
  },

  add(rental: Omit<RecentRental, 'id'>): void {
    const rentals = this.getRentals();
    const newRental: RecentRental = {
      ...rental,
      id: Date.now().toString()
    };
    rentals.unshift(newRental);
    localStorage.setItem(RECENT_RENTALS_KEY, JSON.stringify(rentals));
  }
};
