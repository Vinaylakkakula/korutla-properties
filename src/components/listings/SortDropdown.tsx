import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (sort: 'newest' | 'price-low' | 'price-high' | 'popular') => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-mutedGray font-semibold hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" />
        Sort:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
        className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest cursor-pointer shadow-subtle"
      >
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="popular">Most Featured</option>
      </select>
    </div>
  );
};

export default SortDropdown;

