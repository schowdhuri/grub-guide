import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from '@docusaurus/Link';
import { searchIndex, type SearchItem } from '@site/src/data/searchIndex';
import './SearchComponent.css';

interface SearchResult {
  title: string;
  url: string;
  tags: string[];
  description: string;
  content: string;
  thaiName?: string;
  pronunciation?: string;
  score: number;
  matchType: 'tag' | 'title' | 'description' | 'content';
}

export function SearchComponent(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const searchItems = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    // Handle hashtag searches - strip # and search in tags
    let queryLower = searchQuery.toLowerCase().trim();
    let isHashtagSearch = false;

    if (queryLower.startsWith('#')) {
      queryLower = queryLower.substring(1);
      isHashtagSearch = true;
    }
    const searchResults: SearchResult[] = [];

    for (const item of searchIndex) {
      let score = 0;
      let matchType: SearchResult['matchType'] = 'content';

      // Tag matches (highest priority - score 100, or 200 for hashtag searches)
      const tagMatches = item.tags.filter((tag: string) =>
        tag.toLowerCase().includes(queryLower)
      );
      if (tagMatches.length > 0) {
        // Give extra priority to explicit hashtag searches
        const tagScore = isHashtagSearch ? 200 : 100;
        score += tagMatches.length * tagScore;
        matchType = 'tag';
      }

      // For hashtag searches, only search in tags for cleaner results
      if (!isHashtagSearch) {
        // Title matches (high priority - score 50)
        if (item.title.toLowerCase().includes(queryLower)) {
          score += 50;
          if (matchType === 'content') matchType = 'title';
        }

        // Thai name matches (high priority - score 45)
        if (item.thaiName && item.thaiName.includes(queryLower)) {
          score += 45;
          if (matchType === 'content') matchType = 'title';
        }

        // Pronunciation matches (medium-high priority - score 40)
        if (item.pronunciation && item.pronunciation.toLowerCase().includes(queryLower)) {
          score += 40;
          if (matchType === 'content') matchType = 'title';
        }

        // Description matches (medium priority - score 20)
        if (item.description.toLowerCase().includes(queryLower)) {
          score += 20;
          if (matchType === 'content') matchType = 'description';
        }

        // Content matches (lower priority - score 10)
        if (item.content.toLowerCase().includes(queryLower)) {
          score += 10;
        }
      }

      if (score > 0) {
        searchResults.push({
          title: item.title,
          url: item.url,
          tags: item.tags,
          description: item.description,
          content: item.content,
          thaiName: item.thaiName,
          pronunciation: item.pronunciation,
          score,
          matchType
        });
      }
    }

    // Sort by score (descending) and then by match type priority
    return searchResults.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const matchTypePriority = { tag: 4, title: 3, description: 2, content: 1 };
      return matchTypePriority[b.matchType] - matchTypePriority[a.matchType];
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open modal
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }

      // Escape to close modal
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setQuery('');
      }

      // Arrow navigation
      if (isModalOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          const selectedResult = results[selectedIndex];
          if (selectedResult) {
            window.location.href = selectedResult.url;
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, results, selectedIndex]);

  // Update search results
  useEffect(() => {
    const searchResults = searchItems(query);
    setResults(searchResults.slice(0, 10)); // Limit to top 10 results
    setSelectedIndex(0); // Reset selection
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (url: string) => {
    setIsModalOpen(false);
    setQuery('');
    window.location.href = url;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuery('');
  };

  const getMatchTypeIndicator = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'tag': return '🏷️';
      case 'title': return '📝';
      case 'description': return '📄';
      case 'content': return '🔍';
      default: return '🔍';
    }
  };

  return (
    <>
      {/* Search Button in Navbar */}
      <button
        className="search-button"
        onClick={openModal}
        aria-label="Search"
      >
        <span className="search-icon">🔍</span>
        <span className="search-placeholder">Search...</span>
        <span className="search-shortcut">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="search-modal-overlay" onClick={closeModal}>
          <div
            className="search-modal"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <div className="search-input-wrapper">
                <span className="search-input-icon">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search dishes, #tags, or ingredients..."
                  value={query}
                  onChange={handleInputChange}
                  className="search-modal-input"
                  autoComplete="off"
                />
                {query && (
                  <button
                    className="search-clear"
                    onClick={() => setQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="search-modal-body">
              {!query.trim() && (
                <div className="search-suggestions">
                  <div className="search-suggestions-title">Popular searches</div>
                  <div className="search-suggestions-list">
                    <button onClick={() => setQuery('#curry')} className="search-suggestion-item">
                      🏷️ #curry
                    </button>
                    <button onClick={() => setQuery('#spicy')} className="search-suggestion-item">
                      🏷️ #spicy
                    </button>
                    <button onClick={() => setQuery('#street-food')} className="search-suggestion-item">
                      🏷️ #street-food
                    </button>
                    <button onClick={() => setQuery('tom yum')} className="search-suggestion-item">
                      🍲 tom yum
                    </button>
                    <button onClick={() => setQuery('pad thai')} className="search-suggestion-item">
                      🍜 pad thai
                    </button>
                  </div>
                </div>
              )}

              {query.trim() && results.length > 0 && (
                <div className="search-results">
                  <div className="search-results-header">
                    Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </div>
                  {results.map((result, index) => (
                    <button
                      key={`${result.url}-${index}`}
                      className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => handleResultClick(result.url)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="search-result-header">
                        <span className="search-result-indicator">
                          {getMatchTypeIndicator(result.matchType)}
                        </span>
                        <span className="search-result-title">{result.title}</span>
                        {result.thaiName && (
                          <span className="search-result-thai">({result.thaiName})</span>
                        )}
                      </div>
                      <div className="search-result-description">{result.description}</div>
                      {result.tags.length > 0 && (
                        <div className="search-result-tags">
                          {result.tags.slice(0, 5).map((tag: string) => (
                            <span key={tag} className="search-result-tag">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="search-no-results">
                  <div className="search-no-results-icon">😕</div>
                  <div className="search-no-results-title">
                    No results for "{query}"
                  </div>
                  <div className="search-no-results-suggestion">
                    Try searching for: curry, #spicy, #street-food, #isan, tom yum
                  </div>
                </div>
              )}
            </div>

            <div className="search-modal-footer">
              <div className="search-shortcuts">
                <span className="search-shortcut-item">
                  <kbd>↑</kbd><kbd>↓</kbd> navigate
                </span>
                <span className="search-shortcut-item">
                  <kbd>↵</kbd> select
                </span>
                <span className="search-shortcut-item">
                  <kbd>esc</kbd> close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}