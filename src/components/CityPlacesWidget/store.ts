/**
 * Jotai atoms for CityPlacesWidget state management
 * Scoped locally to the widget to avoid prop drilling
 */

import { atom } from "jotai";

/**
 * Whether the Google Maps API has finished loading
 */
export const isMapLoadedAtom = atom<boolean>(false);

/**
 * ID of the currently selected place
 */
export const selectedPlaceIdAtom = atom<string | null>(null);

/**
 * ID of the currently hovered place
 */
export const hoveredPlaceIdAtom = atom<string | null>(null);

/**
 * Center coordinates of the map
 */
export const mapCenterAtom = atom<{ lat: number; lng: number }>({
  lat: 0,
  lng: 0,
});

/**
 * Current viewport bounds of the map
 */
export const mapBoundsAtom = atom<google.maps.LatLngBounds | null>(null);
