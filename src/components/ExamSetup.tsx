import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { GraduationCap, ArrowLeft } from "lucide-react";
import PointsFilter from "./PointsFilter";

interface ExamSetupProps {
  totalQuestions: number;
  cards: Array<{ id: number; points: number }>;  // Add this line
  onStartExam: (
    questionCount: number,
    startRange: number,
    endRange: number,
    points: number[]
  ) => void;
  onClose: () => void;
}

const EXAM_PREFERENCES_KEY = "exam-preferences-v2";

interface ExamPreferences {
  questionCount: string;
  rangeStart: string;
  rangeEnd: string;
  points: number[];
}

const ExamSetup: React.FC<ExamSetupProps> = ({
  totalQuestions,
  cards,
  onStartExam,
  onClose,
}) => {
  // Add points array to default preferences
  const loadPreferences = (): ExamPreferences => {
    try {
      const selectedRange: { start: number; end: number } | null = {
        start: 1,
        end: totalQuestions,
      };
      if (selectedRange) {
        return {
          questionCount: "5",
          rangeStart: String(selectedRange.start),
          rangeEnd: String(selectedRange.end),
          points: [], // Default empty points array
        };
      }

      const saved = localStorage.getItem(EXAM_PREFERENCES_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        return {
          questionCount: String(prefs.questionCount),
          rangeStart: String(prefs.rangeStart),
          rangeEnd: String(prefs.rangeEnd),
          points: prefs.points || [], // Load saved points or default to empty array
        };
      }
    } catch (error) {
      console.error("Error loading exam preferences:", error);
    }
    return {
      questionCount: "5",
      rangeStart: "1",
      rangeEnd: String(totalQuestions),
      points: [],
    };
  };

  const [preferences, setPreferences] =
    useState<ExamPreferences>(loadPreferences);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedPoints, setSelectedPoints] = useState<number[]>(
    preferences.points || []
  );
  const [availableQuestions, setAvailableQuestions] = useState<number>(0);

  const savePreferences = (newPrefs: ExamPreferences) => {
    try {
      localStorage.setItem(EXAM_PREFERENCES_KEY, JSON.stringify(newPrefs));
    } catch (error) {
      console.error("Error saving exam preferences:", error);
    }
  };

  const handleQuestionCountChange = (value: string) => {
    const newPrefs = { ...preferences, questionCount: value };
    setPreferences(newPrefs);
    savePreferences(newPrefs);
  
    const numValue = parseInt(value);
  
    if (!value || value.trim() === "") {
      setErrorMessage("Please enter the number of questions");
    } else if (isNaN(numValue)) {
      setErrorMessage("Please enter a valid number");
    } else if (numValue <= 0) {
      setErrorMessage("Number of questions must be greater than 0");
    } else if (numValue > availableQuestions) {
      setErrorMessage(`Selected number (${numValue}) exceeds available questions (${availableQuestions})`);
    } else {
      setErrorMessage("");
    }
  };

  const handleRangeStartChange = (value: string) => {
    const newPrefs = { ...preferences, rangeStart: value };
    setPreferences(newPrefs);
    savePreferences(newPrefs);

    const numValue = parseInt(value);
    const endNum = parseInt(preferences.rangeEnd);
    const questionCount = parseInt(preferences.questionCount);

    if (!value) {
      setErrorMessage("Please enter a start range");
    } else if (isNaN(numValue)) {
      setErrorMessage("Please enter a valid number for start range");
    } else if (numValue < 1 || numValue > totalQuestions) {
      setErrorMessage(
        `Error: Start range must be between 1 and ${totalQuestions}`
      );
    } else if (numValue > endNum) {
      setErrorMessage("Error: Start range cannot be greater than end range");
    } else if (questionCount > endNum - numValue + 1) {
      setErrorMessage(
        `Error: Selected questions (${questionCount}) exceeds available questions in range (${
          endNum - numValue + 1
        })`
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleRangeEndChange = (value: string) => {
    const newPrefs = { ...preferences, rangeEnd: value };
    setPreferences(newPrefs);
    savePreferences(newPrefs);

    const numValue = parseInt(value);
    const startNum = parseInt(preferences.rangeStart);
    const questionCount = parseInt(preferences.questionCount);

    if (!value) {
      setErrorMessage("Please enter an end range");
    } else if (isNaN(numValue)) {
      setErrorMessage("Please enter a valid number for end range");
    } else if (numValue < 1 || numValue > totalQuestions) {
      setErrorMessage(
        `Error: End range must be between 1 and ${totalQuestions}`
      );
    } else if (numValue < startNum) {
      setErrorMessage("Error: End range cannot be less than start range");
    } else if (questionCount > numValue - startNum + 1) {
      setErrorMessage(
        `Error: Selected questions (${questionCount}) exceeds available questions in range (${
          numValue - startNum + 1
        })`
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleStartExam = () => {
    const startNum = parseInt(preferences.rangeStart);
    const endNum = parseInt(preferences.rangeEnd);
    const questionCount = parseInt(preferences.questionCount);

    if (isNaN(startNum) || isNaN(endNum) || isNaN(questionCount)) {
      setErrorMessage("Please enter valid numbers for all fields");
      return;
    }

    // Save points with other preferences before starting exam
    const newPrefs = {
      ...preferences,
      points: selectedPoints,
    };
    savePreferences(newPrefs);

    // Pass selected points to onStartExam
    onStartExam(questionCount, startNum, endNum, selectedPoints);
    onClose();
  };

  useEffect(() => {
    const startNum = parseInt(preferences.rangeStart);
    const endNum = parseInt(preferences.rangeEnd);
  
    if (isNaN(startNum) || isNaN(endNum)) {
      setAvailableQuestions(0);
      return;
    }
  
    let filteredCards = cards.filter(
      card => card.id >= startNum && card.id <= endNum
    );
  
    if (selectedPoints.length > 0) {
      filteredCards = filteredCards.filter(card => 
        selectedPoints.includes(card.points || 1)
      );
    }
  
    setAvailableQuestions(filteredCards.length);
  }, [preferences.rangeStart, preferences.rangeEnd, selectedPoints, cards]);

  useEffect(() => {
    const startNum = parseInt(preferences.rangeStart);
    const endNum = parseInt(preferences.rangeEnd);
  
    if (isNaN(startNum) || isNaN(endNum)) {
      setAvailableQuestions(0);
      return;
    }
  
    // First filter by range
    let filteredCards = cards.filter(
      card => card.id >= startNum && card.id <= endNum
    );
  
    // Log initial count after range filter
    console.log(`Questions in range ${startNum}-${endNum}:`, filteredCards.length);
  
    // Then apply points filter if any points are selected
    if (selectedPoints.length > 0) {
      filteredCards = filteredCards.filter(card => {
        const cardPoints = card.points || 1; // Default to 1 if undefined
        return selectedPoints.includes(cardPoints);
      });
      
      // Log count after points filter
      console.log('Points filter active:', selectedPoints);
      console.log('Questions after points filter:', filteredCards.length);
    }
  
    setAvailableQuestions(filteredCards.length);
  
    // If current question count is more than available, show error
    const questionCount = parseInt(preferences.questionCount);
    if (!isNaN(questionCount) && questionCount > filteredCards.length) {
      setErrorMessage(`Selected number (${questionCount}) exceeds available questions (${filteredCards.length})`);
    }
  }, [preferences.rangeStart, preferences.rangeEnd, selectedPoints, cards, preferences.questionCount]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-xl w-full">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Exam Setup</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <label className="block text-sm font-medium mb-2">
              Number of Questions
            </label>
            <input
              type="text"
              value={preferences.questionCount}
              onChange={(e) => handleQuestionCountChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Question Range</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">From</label>
                <input
                  type="text"
                  value={preferences.rangeStart}
                  onChange={(e) => handleRangeStartChange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">To</label>
                <input
                  type="text"
                  value={preferences.rangeEnd}
                  onChange={(e) => handleRangeEndChange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Question Points</div>
            <PointsFilter
              selectedPoints={selectedPoints}
              onSelectPoints={(points) => {
                setSelectedPoints(points);
                savePreferences({
                  ...preferences,
                  points,
                });
              }}
            />
          </div>

          {errorMessage && (
            <div className="text-sm text-red-400">{errorMessage}</div>
          )}

          <div className="text-sm text-gray-400 space-y-1">
            <div>
              {availableQuestions > 0 ? (
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-blue-400">{availableQuestions}</span> questions 
                    match current filters
                  </div>
                  {selectedPoints.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span>Points filter:</span>
                      {selectedPoints.map(point => (
                        <span key={point} className="px-2 py-0.5 bg-blue-500/20 rounded text-blue-400">
                          {point} {point === 1 ? 'point' : 'points'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                "Please enter valid range values"
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="w-full" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="w-full"
              onClick={handleStartExam}
              disabled={!!errorMessage || availableQuestions === 0}
            >
              <GraduationCap className="h-4 h-4 mr-2" />
              Start Exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSetup;
