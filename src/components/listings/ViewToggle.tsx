import React from 'react';
import { LayoutGrid, List, Map } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list' | 'map';
  onChange: (view: 'grid' | 'list' | 'map') => void;
  onMapClick?: () => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange, onMapClick }) => {
  return (
    <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-1 shadow-subtle">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          view === 'grid' ? 'bg-forest text-white' : 'text-mutedGray hover:text-charcoal'
        }`}
        title="Grid View"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          view === 'list' ? 'bg-forest text-white' : 'text-mutedGray hover:text-charcoal'
        }`}
        title="List View"
      >
        <List className="w-4 h-4" />
      </button>
      {onMapClick && (
        <button
          type="button"
          onClick={onMapClick}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            view === 'map' ? 'bg-forest text-white' : 'text-mutedGray hover:text-charcoal'
          }`}
          title="Map View"
        >
          <Map className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ViewToggle;

