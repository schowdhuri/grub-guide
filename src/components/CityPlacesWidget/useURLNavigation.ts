/**
 * useURLNavigation - Custom hook for URL-based navigation with browser history
 *
 * Manages view state via history.pushState for browser back button support
 * without affecting the URL hash (which can cause page scrolling issues)
 *
 * State patterns:
 * - { view: 'list' }                    → list mode (default)
 * - { view: 'map' }                     → fullscreen map mode
 * - { view: 'detail', placeId: '123' }  → detail view for place_123
 */

import { useState, useEffect, useCallback } from 'react';

export type ViewMode = 'list' | 'map' | 'detail';

export interface NavigationState {
  viewMode: ViewMode;
  selectedPlaceId: string | null;
}

export interface UseURLNavigationReturn {
  viewMode: ViewMode;
  selectedPlaceId: string | null;
  navigateToList: () => void;
  navigateToMap: () => void;
  navigateToPlace: (placeId: string) => void;
  goBack: () => void;
}

/**
 * Parse history state to determine current view state
 */
function parseState(historyState: any): NavigationState {
  if (!historyState || typeof historyState !== 'object') {
    return { viewMode: 'list', selectedPlaceId: null };
  }

  const { view, placeId } = historyState;

  if (view === 'map') {
    return { viewMode: 'map', selectedPlaceId: null };
  }

  if (view === 'detail' && typeof placeId === 'string') {
    return { viewMode: 'detail', selectedPlaceId: placeId };
  }

  // Default to list for unknown states
  return { viewMode: 'list', selectedPlaceId: null };
}

/**
 * Custom hook for managing navigation state via history.pushState
 */
export function useURLNavigation(): UseURLNavigationReturn {
  const [state, setState] = useState<NavigationState>(() => {
    // Initialize from current history state
    if (typeof window !== 'undefined' && window.history.state) {
      return parseState(window.history.state);
    }
    return { viewMode: 'list', selectedPlaceId: null };
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (event: PopStateEvent) => {
      const newState = parseState(event.state);
      setState(newState);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigation functions
  const navigateToList = useCallback(() => {
    if (typeof window === 'undefined') return;

    const newState = { view: 'list' };
    window.history.pushState(newState, '', window.location.pathname);
    setState({ viewMode: 'list', selectedPlaceId: null });
  }, []);

  const navigateToMap = useCallback(() => {
    if (typeof window === 'undefined') return;

    const newState = { view: 'map' };
    window.history.pushState(newState, '', window.location.pathname);
    setState({ viewMode: 'map', selectedPlaceId: null });
  }, []);

  const navigateToPlace = useCallback((placeId: string) => {
    if (typeof window === 'undefined') return;

    const newState = { view: 'detail', placeId };
    window.history.pushState(newState, '', window.location.pathname);
    setState({ viewMode: 'detail', selectedPlaceId: placeId });
  }, []);

  const goBack = useCallback(() => {
    if (typeof window === 'undefined') return;

    window.history.back();
  }, []);

  return {
    viewMode: state.viewMode,
    selectedPlaceId: state.selectedPlaceId,
    navigateToList,
    navigateToMap,
    navigateToPlace,
    goBack,
  };
}
