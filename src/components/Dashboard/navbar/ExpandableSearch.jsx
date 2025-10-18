import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const ExpandableSearch = ({ onSectionSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Define all searchable sections with their variations
  const sections = [
    {
      id: 'prep',
      name: 'Prep Section',
      aliases: ['prep', 'preparation', 'material preparation', 'prep section'],
      href: '#prep-report',
      description: 'Material Preparation & Processing'
    },
    {
      id: 'solvent',
      name: 'Solvent Section',
      aliases: ['solvent', 'solvent extraction', 'solvent section', 'extraction'],
      href: '#solvent-report',
      description: 'Solvent Extraction Process'
    },
    {
      id: 'refinery',
      name: 'Refinery Section',
      aliases: ['refinery', 'refinery section', 'oil refining', 'distillation'],
      href: '#refinery-report',
      description: 'Oil Refining & Distillation'
    },
    {
      id: 'alpha',
      name: 'Alpha Section',
      aliases: ['alpha', 'alpha section'],
      href: '#alpha-report',
      description: 'Alpha Processing Unit'
    },
    {
      id: 'dewaxing',
      name: 'De-Waxing Section',
      aliases: ['dewaxing', 'de-waxing', 'de waxing', 'dewaxing section', 'de-waxing section', 'wax removal'],
      href: '#dewaxing-report',
      description: 'De-Waxing Process'
    },
    {
      id: 'deo',
      name: 'DEO Section',
      aliases: ['deo', 'deo section', 'deodorization', 'deodorizing'],
      href: '#deo-report',
      description: 'Deodorization Process'
    },
    {
      id: 'degumming',
      name: 'DeGumming and Bleaching Section',
      aliases: [
        'degumming', 'de-gumming', 'de gumming', 'gum removal',
        'bleaching', 'bleach', 'whitening',
        'degumming and bleaching', 'de-gumming and bleaching',
        'degumming bleaching', 'gumming bleaching',
        'degumming section', 'bleaching section',
        'degumming and bleaching section', 'degumming and bleaching section report'
      ],
      href: '#degumming-bleaching-report',
      description: 'DeGumming and Bleaching Process'
    }
  ];

  // Filter sections based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSections([]);
      setSelectedIndex(-1);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = sections.filter(section =>
      section.name.toLowerCase().includes(searchLower) ||
      section.aliases.some(alias => alias.includes(searchLower)) ||
      section.description.toLowerCase().includes(searchLower)
    );

    setFilteredSections(filtered);
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsExpanded(false);
        setSearchTerm('');
        setFilteredSections([]);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!filteredSections.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSections.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSections.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSectionSelect(filteredSections[selectedIndex]);
        } else if (filteredSections.length === 1) {
          handleSectionSelect(filteredSections[0]);
        }
        break;
      case 'Escape':
        setIsExpanded(false);
        setSearchTerm('');
        setFilteredSections([]);
        break;
    }
  };

  // Handle section selection
  const handleSectionSelect = (section) => {
    try {
      // Scroll to section
      const target = document.querySelector(section.href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      // Call parent callback if provided
      if (onSectionSelect) {
        onSectionSelect(section);
      }

      // Close search
      setIsExpanded(false);
      setSearchTerm('');
      setFilteredSections([]);
    } catch (error) {
      console.error('Error navigating to section:', error);
    }
  };

  // Toggle search expansion
  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm('');
      setFilteredSections([]);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredSections([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div ref={searchContainerRef} className="relative">
      {/* Search Container */}
      <div className={`flex items-center transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-auto'
      }`}>
        
        {/* Expandable Search Input */}
        <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search sections (Prep, Solvent, DeGumming...)"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm placeholder-gray-400 transition-all duration-200"
            aria-label="Search industrial sections"
            autoComplete="off"
          />
          
          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Toggle Button */}
        <button
          onClick={toggleSearch}
          className={`p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
            isExpanded ? 'ml-2' : ''
          }`}
          aria-label={isExpanded ? "Close search" : "Open search"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <X size={20} /> : <Search size={20} />}
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && filteredSections.length > 0 && (
        <div className="absolute top-full left-0 right-12 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="py-2">
            {filteredSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionSelect(section)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 ${
                  index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{section.name}</div>
                    <div className="text-sm text-gray-500">{section.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {isExpanded && searchTerm && filteredSections.length === 0 && (
        <div className="absolute top-full left-0 right-12 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="px-4 py-6 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <div className="text-sm">No sections found for "{searchTerm}"</div>
            <div className="text-xs mt-1">Try searching for: Prep, Solvent, DeGumming, De-Waxing, DEO, Alpha</div>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default ExpandableSearch;