import { Button } from "./ui/Button";
import { X, Tag, Star, Filter } from "lucide-react";

type FilterPanelProps = {
  // Tags
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
  
  // Points
  selectedPoints: number[];
  onSelectPoints: (points: number[]) => void;
  
  // Available point values
  availablePoints: number[];
};

export default function FilterPanel({
  availableTags,
  selectedTags,
  onToggleTag,
  onClearTags,
  selectedPoints,
  onSelectPoints,
  availablePoints,
}: FilterPanelProps) {
  const hasActiveFilters = selectedTags.length > 0 || selectedPoints.length > 0;

  const handleClearAllFilters = () => {
    onClearTags();
    onSelectPoints([]);
  };

  const handleTogglePoint = (point: number) => {
    if (selectedPoints.includes(point)) {
      onSelectPoints(selectedPoints.filter((p) => p !== point));
    } else {
      onSelectPoints([...selectedPoints, point]);
    }
  };

  if (availableTags.length === 0 && availablePoints.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-300">Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAllFilters}
            className="text-xs border-gray-600 hover:bg-gray-700"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Tags Section */}
      {availableTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-3 w-3 text-gray-400" />
            <h4 className="text-xs font-medium text-gray-400">Tags</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-blue-500 text-white border-2 border-blue-400"
                      : "bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Points Section */}
      {availablePoints.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-3 w-3 text-gray-400" />
            <h4 className="text-xs font-medium text-gray-400">Points</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${
                selectedPoints.length === 0
                  ? "bg-blue-500/20 border-blue-500 text-blue-400"
                  : "border-gray-600 hover:bg-gray-700"
              }`}
              onClick={() => onSelectPoints([])}
            >
              All
            </Button>
            {availablePoints.map((points) => (
              <Button
                key={points}
                variant="outline"
                size="sm"
                className={`text-xs ${
                  selectedPoints.includes(points)
                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "border-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => handleTogglePoint(points)}
              >
                <Star className="h-3 w-3 mr-1" />
                {points}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            {selectedTags.length > 0 && (
              <div className="mb-1">
                <span className="font-medium">Tags:</span> {selectedTags.join(", ")}
              </div>
            )}
            {selectedPoints.length > 0 && (
              <div>
                <span className="font-medium">Points:</span>{" "}
                {selectedPoints.sort((a, b) => a - b).join(", ")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

