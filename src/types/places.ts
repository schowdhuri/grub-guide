/**
 * Place data structure for city places widget
 */

export interface PlaceData {
  // Required fields (from Google Places API)
  id: string; // Internal ID (place_1, place_2, etc.)
  name: string; // English name
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string; // Formatted address
  googleMapsUrl: string; // Original Google Maps URL from CSV
  placeTypes: string[]; // Google place types (e.g., 'restaurant', 'food')

  // Google Places API enrichment
  placeId?: string; // New Places API Place ID (e.g., "ChIJ...")

  // Categorization (inferred from name or added manually)
  category?: string; // e.g., 'Khao Soi', 'Pork Leg', 'Noodles', 'Vegetarian'
  tags?: string[]; // Additional tags for filtering

  // Optional enrichment data (to be added manually over time)
  nameLocal?: string; // Name in Thai script
  photos?: string[]; // URLs to photos
  myRating?: number; // Personal rating 1-5
  spiceLevel?: number; // Spice level 1-5
  visitDate?: string; // Date visited (YYYY-MM-DD)
  notes?: string; // Personal notes about the place
  mustTry?: string[]; // Recommended dishes
  priceRange?: "$" | "$$" | "$$$"; // Price indicator

  // Additional metadata from Google
  phoneNumber?: string;
  openingHours?: string[];
}

/**
 * Category definitions for organizing places
 */
export interface PlaceCategory {
  id: string;
  label: string;
  emoji?: string;
  color?: string;
}

/**
 * Filter state for place list
 */
export interface PlaceFilters {
  searchQuery: string;
  categories: string[];
  tags: string[];
  minRating?: number;
  maxPrice?: string;
}

/**
 * Sort options for place list
 */
export type PlaceSortOption =
  | "name-asc"
  | "name-desc"
  | "rating-desc"
  | "rating-asc"
  | "recent";
