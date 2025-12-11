import React, { useState } from "react";
import { Button } from "./ui/Button";
import { HashIcon, Shuffle, Check } from "lucide-react";
import FilterPanel from "./FilterPanel";

interface QuestionRangeSelectorProps {
  totalQuestions: number;
  onSelectRange: (
    start: number,
    end: number,
    randomOrder: boolean,
    points: number[],
    tags: string[]
  ) => void;
  onClose: () => void;
  initialRange?: { start: number; end: number } | null;
  availableTags: string[];
  availablePoints: number[];
}

const RANGE_PREFERENCES_KEY = "range-preferences-v2";

interface RangePreferences {
  start: number;
  end: number;
  randomOrder: boolean;
  points: number[];
  tags: string[];
}

const QuestionRangeSelector: React.FC<QuestionRangeSelectorProps> = ({
  totalQuestions,
  onSelectRange,
  onClose,
  initialRange,
  availableTags,
  availablePoints,
}) => {
  const loadSavedPreferences = (): RangePreferences => {
    try {
      const saved = localStorage.getItem(RANGE_PREFERENCES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.start &&
          parsed.end &&
          parsed.start >= 1 &&
          parsed.end <= totalQuestions &&
          parsed.start <= parsed.end
        ) {
          return {
            start: parsed.start,
            end: parsed.end,
            randomOrder: parsed.randomOrder || false,
            points: parsed.points || [],
            tags: parsed.tags || [],
          };
        }
      }
    } catch (error) {
      console.error("Error loading range preferences:", error);
    }

    return {
      start: 1,
      end: totalQuestions,
      randomOrder: false,
      points: [],
      tags: [],
    };
  };

  const [selectedPoints, setSelectedPoints] = useState<number[]>(() => {
    const prefs = loadSavedPreferences();
    return prefs.points;
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const prefs = loadSavedPreferences();
    return prefs.tags;
  });

  const [isRandomOrder, setIsRandomOrder] = useState(() => {
    const prefs = loadSavedPreferences();
    return prefs.randomOrder;
  });

  const [selectedRange, setSelectedRange] = useState<{
    start: number;
    end: number;
  }>(() => {
    if (initialRange) {
      return initialRange;
    }
    const prefs = loadSavedPreferences();
    return {
      start: prefs.start,
      end: prefs.end,
    };
  });

  const handleSelectRange = (start: number, end: number) => {
    if (start < 1 || end > totalQuestions || start > end) {
      console.error("Invalid range selected:", { start, end, totalQuestions });
      return;
    }
    setSelectedRange({ start, end });
  };

  const handleApply = () => {
    const preferences: RangePreferences = {
      ...selectedRange,
      randomOrder: isRandomOrder,
      points: selectedPoints,
      tags: selectedTags,
    };

    localStorage.setItem(RANGE_PREFERENCES_KEY, JSON.stringify(preferences));
    onSelectRange(
      selectedRange.start,
      selectedRange.end,
      isRandomOrder,
      selectedPoints,
      selectedTags
    );
    onClose();
  };

  const ranges = [];
  for (let i = 0; i < totalQuestions; i += 10) {
    const start = i + 1;
    const end = Math.min(i + 10, totalQuestions);
    if (start <= totalQuestions) {
      ranges.push({ start, end });
    }
  }

  // Generate a summary of active filters
  const getFilterSummary = () => {
    const parts = [];
    if (selectedRange.start !== 1 || selectedRange.end !== totalQuestions) {
      parts.push(`Questions ${selectedRange.start}-${selectedRange.end}`);
    }
    if (selectedTags.length > 0) {
      parts.push(
        `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""}`
      );
    }
    if (selectedPoints.length > 0) {
      parts.push(
        `${selectedPoints.length} point filter${
          selectedPoints.length > 1 ? "s" : ""
        }`
      );
    }
    if (isRandomOrder) {
      parts.push("Random order");
    }
    return parts.length > 0 ? parts.join(" • ") : "No filters active";
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Select Question Range</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleApply}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <Button
              variant="outline"
              size="sm"
              className={isRandomOrder ? "bg-blue-500/20 border-blue-500" : ""}
              onClick={() => setIsRandomOrder(!isRandomOrder)}
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Random Order
            </Button>
            <span className="px-2 py-1 rounded bg-gray-700/50">
              {getFilterSummary()}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <FilterPanel
              availableTags={availableTags}
              selectedTags={selectedTags}
              onToggleTag={handleToggleTag}
              onClearTags={handleClearTags}
              selectedPoints={selectedPoints}
              onSelectPoints={setSelectedPoints}
              availablePoints={availablePoints}
            />

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-medium mb-2 text-gray-400">
                Question Range
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className={`border-gray-700 hover:bg-gray-700/50 flex items-center justify-start gap-2 w-full ${
                    selectedRange?.start === 1 &&
                    selectedRange?.end === totalQuestions
                      ? "bg-blue-500/20 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelectRange(1, totalQuestions)}
                >
                  <HashIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">All Questions</span>
                </Button>
                {ranges.map(({ start, end }) => (
                  <Button
                    key={`${start}-${end}`}
                    variant="outline"
                    className={`border-gray-700 hover:bg-gray-700/50 flex items-center justify-start gap-2 w-full ${
                      selectedRange?.start === start &&
                      selectedRange?.end === end
                        ? "bg-blue-500/20 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleSelectRange(start, end)}
                  >
                    <HashIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      Questions {start}-{end}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionRangeSelector;
