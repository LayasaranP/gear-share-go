
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockEquipment, fuzzySearch, Equipment } from '@/services/equipmentData';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onEquipmentSelect?: (equipment: Equipment) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onEquipmentSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Equipment[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = fuzzySearch(query, mockEquipment).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (equipment: Equipment) => {
    setQuery(equipment.name);
    setShowSuggestions(false);
    onEquipmentSelect?.(equipment);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={inputRef}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="What equipment do you need today?"
        value={query}
        onChange={handleInputChange}
        className="pl-10 h-12"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
          {suggestions.map((equipment) => (
            <div
              key={equipment.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(equipment)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{equipment.name}</p>
                  <p className="text-sm text-gray-600">{equipment.brand} • {equipment.category}</p>
                  <p className="text-sm text-teal-600">${equipment.price}/{equipment.priceUnit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
