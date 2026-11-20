import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Scale, X, Plus, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { properties } from '../data/properties';
import { formatArea } from '../utils/format';
import { useFavorites } from '../context/FavoritesContext';
import Button from '../components/ui/Button';

export const ComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { compareList, removeFromCompare, clearCompare } = useFavorites();

  const idsParam = searchParams.get('ids');
  const targetIds = idsParam ? idsParam.split(',').filter(Boolean) : compareList;

  // Filter properties to compare
  const compareProps = properties.filter((p) => targetIds.includes(p.id));

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="bg-forest text-white py-12 md:py-16 mb-8 border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-ivory-300 mb-3">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white">Property Comparison</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Compare Properties
              </h1>
              <p className="text-sm sm:text-base text-ivory-300 font-light mt-2">
                Evaluate prices, specs, amenities, and approvals side-by-side to make the right investment decision.
              </p>
            </div>

            {compareProps.length > 0 && (
              <Button
                onClick={clearCompare}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 shrink-0"
              >
                Clear Comparison
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {compareProps.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 shadow-subtle max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest mb-2">No Properties Selected</h3>
            <p className="text-sm text-mutedGray leading-relaxed font-light mb-6">
              Select 2 to 4 properties by clicking the scale icon on any property card to view their side-by-side comparison table.
            </p>
            <Button to="/buy" variant="primary" size="md">
              Explore Properties to Compare
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-subtle overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-6 bg-ivory-100 border-b border-r border-neutral-200 w-1/5 text-xs font-bold uppercase tracking-wider text-mutedGray">
                    Specification
                  </th>
                  {compareProps.map((p) => (
                    <th
                      key={p.id}
                      className="p-6 bg-white border-b border-neutral-200 w-1/4 align-top"
                    >
                      <div className="relative space-y-3">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-charcoal"
                          title="Remove from compare"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-full aspect-[16/10] object-cover rounded-xl"
                        />
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded">
                          {p.category.replace(/-/g, ' ')}
                        </span>
                        <h4 className="font-serif text-base font-bold text-forest line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="font-serif text-xl font-bold text-forest">
                          {p.priceFormatted}
                        </div>
                        <Button
                          to={`/property/${p.id}`}
                          variant="primary"
                          size="sm"
                          className="w-full"
                        >
                          View Listing
                        </Button>
                      </div>
                    </th>
                  ))}
                  {compareProps.length < 4 && (
                    <th className="p-6 bg-ivory-50 border-b border-neutral-200 align-middle text-center">
                      <Link
                        to="/buy"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-300 rounded-2xl hover:border-forest text-mutedGray hover:text-forest transition-colors"
                      >
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-xs font-bold">Add Property</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm text-charcoal">
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Location
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium">
                      {p.location.locality}, {p.location.city}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Area / Size
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-forest">
                      {formatArea(p.area, p.areaUnit)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Bedrooms / BHK
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium">
                      {p.bedrooms ? `${p.bedrooms} BHK` : 'N/A (Plot/Land)'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Bathrooms
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium">
                      {p.bathrooms ? `${p.bathrooms} Baths` : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Facing (Vastu)
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium capitalize">
                      {p.facing || 'East'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Furnishing
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium capitalize">
                      {p.furnishing || 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Road Width / Floor
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium">
                      {p.plotDetails?.roadWidth
                        ? `${p.plotDetails.roadWidth} ft road`
                        : p.floor
                        ? `Floor ${p.floor}`
                        : 'Standard Access'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Verified Status
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4 font-medium text-emerald-700">
                      {p.isVerified ? '✓ Verified Title' : 'Pending Verification'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 bg-ivory-50 font-bold text-xs uppercase tracking-wider text-mutedGray border-r border-neutral-200">
                    Key Amenities
                  </td>
                  {compareProps.map((p) => (
                    <td key={p.id} className="p-4">
                      <ul className="space-y-1 text-xs text-charcoal/80">
                        {p.amenities.slice(0, 5).map((a) => (
                          <li key={a} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;

