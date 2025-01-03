import React from "react";
import { Button } from "./ui/Button";
import { Star } from "lucide-react";

interface PointsFilterProps {
  selectedPoints: number[];
  onSelectPoints: (points: number[]) => void;
}

const PointsFilter: React.FC<PointsFilterProps> = ({
  selectedPoints,
  onSelectPoints,
}) => {
  // Get unique point values from the questions
  const pointValues = [1, 2, 3, 4, 5, 6, 7, 8, 12, 19]; // Extracted from questions

  return (
    <div className="mb-4">
      <div className="text-sm font-medium mb-2 text-gray-400">
        Filter by Points
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`${
            selectedPoints.length === 0 ? "bg-blue-500/20 border-blue-500" : ""
          }`}
          onClick={() => onSelectPoints([])}
        >
          All Points
        </Button>
        {pointValues.map((points) => (
          <Button
            key={points}
            variant="outline"
            size="sm"
            className={`${
              selectedPoints.includes(points)
                ? "bg-blue-500/20 border-blue-500"
                : ""
            }`}
            onClick={() => {
              if (selectedPoints.includes(points)) {
                onSelectPoints(selectedPoints.filter((p) => p !== points));
              } else {
                onSelectPoints([...selectedPoints, points]);
              }
            }}
          >
            <Star className="h-3 w-3 mr-1" />
            {points} {points === 1 ? "point" : "points"}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PointsFilter;
