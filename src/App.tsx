import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { config } from "./config";
import MarkdownRenderer from "./MarkdownRenderer";
import FlipCard from "./components/ui/Flippcard";
import QuestionRangeSelector from "./components/QuestionRangeSelector";
import MobileMenu from "./components/ui/MobileMenu";
import ExamSetup from "./components/ExamSetup";
import ExamResults from "./components/ExamResults";
import { GraduationCap } from "lucide-react";
import { toast, Toaster } from "sonner";

import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Image as ImageIcon,
  Columns,
  List,
  Maximize2,
  Hash as HashIcon,
  Bookmark,
  BookmarkCheck,
  Menu,
  RefreshCw,
  CloudOff,
  Cloud,
} from "lucide-react";

// Type definitions
type Flashcard = {
  id: number;
  question: string;
  answer: string;
  hasImage: boolean;
  imagePath?: string;
  timesCorrect: number;
  timesIncorrect: number;
  lastReviewed?: Date;
  isMarked?: boolean;
  points: number;
  tags?: string[];
};

type Progress = {
  cards: {
    [key: number]: Omit<
      Flashcard,
      "id" | "question" | "answer" | "hasImage" | "imagePath"
    > & { isMarked?: boolean };
  };
  lastCardIndex: number;
};

// Local storage keys
const PROGRESS_KEY = "flashcard-progress";
const LAST_POSITION_KEY = "flashcard-last-position";
const CACHED_DATA_KEY = "flashcard-cached-data";
const CACHE_TIMESTAMP_KEY = "flashcard-cache-timestamp";
const OFFLINE_MODE_KEY = "flashcard-offline-mode-enabled";

export default function FlashcardApp() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<Flashcard[]>([]);
  const [unknownCards, setUnknownCards] = useState<Flashcard[]>([]);
  const [studyMode, setStudyMode] = useState<"all" | "unknown" | "marked">(
    "all"
  );
  const [dualView, setDualView] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const currentQuestionRef = useRef<HTMLButtonElement>(null);
  const questionListRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [showRangeSelector, setShowRangeSelector] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showExamSetup, setShowExamSetup] = useState(false);
  const [showExamResults, setShowExamResults] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [examCards, setExamCards] = useState<Flashcard[]>([]);
  const [examCorrect, setExamCorrect] = useState(0);
  const [examIncorrect, setExamIncorrect] = useState(0);
  const [randomOrderCards, setRandomOrderCards] = useState<Flashcard[]>([]);
  const [isRandomOrder, setIsRandomOrder] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availablePoints, setAvailablePoints] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cacheTimestamp, setCacheTimestamp] = useState<string | null>(null);
  const [isUsingCache, setIsUsingCache] = useState(false);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(OFFLINE_MODE_KEY);
    return saved === "true";
  });

  // Cache management functions
  const saveCachedData = (markdown: string) => {
    if (!offlineModeEnabled) {
      console.log("Offline mode disabled, skipping cache");
      return;
    }
    try {
      localStorage.setItem(CACHED_DATA_KEY, markdown);
      localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
      console.log("Data cached successfully for offline use");
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const loadCachedData = (): string | null => {
    if (!offlineModeEnabled) {
      console.log("Offline mode disabled, skipping cache");
      return null;
    }
    try {
      const cachedData = localStorage.getItem(CACHED_DATA_KEY);
      const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cacheTimestamp) {
        console.log("Loaded data from cache (offline mode available)");
        console.log("Cache timestamp:", cacheTimestamp);
        return cachedData;
      }
      return null;
    } catch (error) {
      console.error("Error loading cached data:", error);
      return null;
    }
  };

  const clearCachedData = () => {
    try {
      localStorage.removeItem(CACHED_DATA_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      console.log("Cache cleared");
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  };

  const loadProgress = (): Progress => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      const lastPosition = localStorage.getItem(LAST_POSITION_KEY);
      return {
        cards: savedProgress ? JSON.parse(savedProgress) : {},
        lastCardIndex: lastPosition ? parseInt(lastPosition, 10) : 0,
      };
    } catch (error) {
      console.error("Error loading progress:", error);
      return { cards: {}, lastCardIndex: 0 };
    }
  };

  const saveProgress = (progressData: Flashcard[], currentIndex: number) => {
    try {
      // Save card progress
      const progressObj = progressData.reduce((acc, card) => {
        acc[card.id] = {
          timesCorrect: card.timesCorrect,
          timesIncorrect: card.timesIncorrect,
          lastReviewed: card.lastReviewed,
          points: card.points,
          isMarked: card.isMarked,
        };
        return acc;
      }, {} as Progress["cards"]);

      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressObj));

      // Save current position
      localStorage.setItem(LAST_POSITION_KEY, currentIndex.toString());
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const getFilteredCards = () => {
    let filteredCards = [...cards];

    // First apply range filter if exists
    if (selectedRange) {
      filteredCards = filteredCards.filter(
        (card) => card.id >= selectedRange.start && card.id <= selectedRange.end
      );

      // If in random order mode, use the randomized array
      if (isRandomOrder && randomOrderCards.length > 0) {
        return randomOrderCards;
      }
    }

    // Apply points filter if any points are selected
    if (selectedPoints.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        selectedPoints.includes(card.points || 0)
      );
    }

    // Apply tags filter if any tags are selected
    if (selectedTags.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        card.tags && card.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Then apply study mode filter
    switch (studyMode) {
      case "marked":
        return filteredCards.filter((card) => card.isMarked);
      case "unknown":
        return filteredCards.filter(
          (card) => card.timesIncorrect > card.timesCorrect
        );
      default:
        return filteredCards;
    }
  };

  // Parse markdown and initialize cards
  useEffect(() => {
    const parseMarkdown = (markdown: string): Flashcard[] => {
      if (!markdown) return [];

      const questions: Flashcard[] = [];
      const lines = markdown.trim().split("\n");

      let currentQuestion = "";
      let currentAnswer = "";
      let currentId = 0;
      let currentImagePath: string | undefined;
      let hasImage = false;
      let inCodeBlock = false;
      let currentIndentLevel = 0;
      let inTable = false;
      let tableBuffer = "";

      const processCurrentQuestion = () => {
        if (currentQuestion) {
          // Extract points from question title
          const pointsMatch =
            currentQuestion.match(/\((\d+)\s*points?\)/i) ||
            currentQuestion.match(/\((\d+)\s*pont\)/i);
          const points = pointsMatch?.[1] ? parseInt(pointsMatch[1], 10) : 1;

          // Extract tags from question title (format: [tag1, tag2])
          const tagsMatch = currentQuestion.match(/\[([^\]]+)\]/);
          const tags = tagsMatch?.[1]
            ? tagsMatch[1].split(',').map(tag => tag.trim())
            : [];

          questions.push({
            id: currentId,
            question: currentQuestion,
            answer: currentAnswer.trim(),
            hasImage,
            imagePath: currentImagePath,
            timesCorrect: 0,
            timesIncorrect: 0,
            points,
            tags,
          });
        }
      };

      const getIndentLevel = (line: string): number => {
        const match = line.match(/^(\s*)/);
        return match && match[1] ? Math.floor(match[1].length / 2) : 0;
      };

      const processLine = (line: string) => {
        // Handle code blocks
        if (line.startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          currentAnswer += line + "\n";
          return;
        }

        if (inCodeBlock) {
          currentAnswer += line + "\n";
          return;
        }

        // Check for table markers
        const isTableRow = line.trim().startsWith("|");
        const isTableDivider = line.trim().match(/^\|-+\|/);

        // Handle table start
        if (isTableRow && !inTable) {
          inTable = true;
          tableBuffer = "";
          const indent = "  ".repeat(currentIndentLevel);
          tableBuffer += indent + line + "\n";
          return;
        }

        // Handle table content
        if (inTable) {
          const indent = "  ".repeat(currentIndentLevel);
          if (isTableRow || isTableDivider) {
            tableBuffer += indent + line + "\n";
            return;
          } else {
            // Table has ended
            currentAnswer += tableBuffer;
            inTable = false;
            tableBuffer = "";
            if (!line.trim()) return; // Skip empty line after table
          }
        }

        // Handle image references
        const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
        if (imageMatch && imageMatch[1]) {
          hasImage = true;
          currentImagePath = imageMatch[1].replace(
            "./images/",
            `${config.baseUrl}/images/`
          );
          if (currentAnswer.trim() === "") {
            // currentAnswer = "See diagram above";
          }
          return;
        }

        // Handle bullet points
        const bulletMatch = line.match(/^(\s*)[*-]\s(.+)/);
        if (bulletMatch) {
          const [_, indent, content] = bulletMatch;
          currentIndentLevel = Math.floor((indent?.length || 0) / 2);
          const indentStr = "  ".repeat(currentIndentLevel);
          currentAnswer += `${indentStr}- ${content}\n`;
          return;
        }

        // Handle continued lines within a bullet point
        if (line.trim() && getIndentLevel(line) >= currentIndentLevel) {
          const indentStr = "  ".repeat(currentIndentLevel);
          const contentWithoutIndent = line.trimStart();
          currentAnswer += `${indentStr}  ${contentWithoutIndent}\n`;
          return;
        }

        // Reset indent level for non-indented lines
        if (line.trim() && getIndentLevel(line) === 0) {
          currentIndentLevel = 0;
        }

        // Add regular lines
        if (line.trim()) {
          currentAnswer += line + "\n";
        } else {
          // Preserve empty lines
          currentAnswer += "\n";
        }
      };

      for (const line of lines) {
        // Match question headers
        const questionMatch = line.trim().match(/^## (\d+)\.\s(.+)/);
        if (questionMatch) {
          processCurrentQuestion();

          const [_, idStr, questionText] = questionMatch;
          currentId = parseInt(idStr || "0", 10);
          currentQuestion = questionText || "";
          currentAnswer = "";
          hasImage = false;
          currentImagePath = undefined;
          currentIndentLevel = 0;
          inTable = false;
          tableBuffer = "";
          continue;
        }

        processLine(line);
      }

      // Process the last question
      processCurrentQuestion();

      return questions;
    };

    const loadFlashcards = async () => {
      try {
        let markdown: string | null = null;

        // Try to load from cache first
        markdown = loadCachedData();

        // If no cache, try to fetch from network
        if (!markdown) {
          setIsUsingCache(false);
          try {
            console.log("No cached data found, fetching from network...");
            const response = await fetch("kerdesek.md");
            if (!response.ok) {
              throw new Error("Failed to load flashcards from network");
            }
            markdown = await response.text();
            // Save to cache for offline use
            saveCachedData(markdown);
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            setCacheTimestamp(timestamp);
          } catch (networkError) {
            console.error("Network fetch failed:", networkError);
            throw new Error("Unable to load data: no cache available and network failed");
          }
        } else {
          setIsUsingCache(true);
          const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
          setCacheTimestamp(timestamp);
        }

        const parsedCards = parseMarkdown(markdown);
        console.log(
          "Parsed questions:",
          parsedCards.map((card) => card.id)
        );

        // Load saved progress from localStorage
        const { cards: savedProgress, lastCardIndex } = loadProgress();

        // Restore progress for each card
        const restoredCards = parsedCards.map((card) => {
          const savedCard = savedProgress[card.id];
          if (savedCard) {
            return {
              ...card,
              timesCorrect: savedCard.timesCorrect,
              timesIncorrect: savedCard.timesIncorrect,
              lastReviewed: savedCard.lastReviewed
                ? new Date(savedCard.lastReviewed)
                : undefined,
              isMarked: savedCard.isMarked,
              points: card.points,
            };
          }
          return card;
        });

        setCards(restoredCards);
        setCurrentCardIndex(lastCardIndex);

        // Extract all unique tags from cards
        const allTags = new Set<string>();
        restoredCards.forEach((card) => {
          if (card.tags) {
            card.tags.forEach((tag) => allTags.add(tag));
          }
        });
        setAvailableTags(Array.from(allTags).sort());

        // Extract all unique point values from cards
        const allPoints = new Set<number>();
        restoredCards.forEach((card) => {
          if (card.points) {
            allPoints.add(card.points);
          }
        });
        setAvailablePoints(Array.from(allPoints).sort((a, b) => a - b));
      } catch (error) {
        console.error("Error loading flashcards:", error);
        // Show user-friendly error message
        toast.error("Unable to load flashcards. Please check your connection and refresh the page.");
      }
    };

    loadFlashcards();
  }, []);

  const handleKnown = () => {
    const currentCard = isExamMode
      ? examCards[currentCardIndex]
      : cards[currentCardIndex];
    if (!currentCard) return;
    if (isExamMode) {
      setExamCorrect((prev) => prev + 1);
      if (currentCardIndex < examCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setShowAnswer(false);
      } else {
        // Show results
        setShowExamResults(true);
        setIsExamMode(false);
      }
    } else {
      const currentCard = cards[currentCardIndex];
      if (!currentCard) return;

      const updatedCards = [...cards];
      updatedCards[currentCardIndex] = {
        ...currentCard,
        timesCorrect: currentCard.timesCorrect + 1,
        lastReviewed: new Date(),
      };

      setCards(updatedCards);
      setKnownCards([...knownCards, currentCard]);
      setShowAnswer(false);

      const nextFilteredIndex =
        currentFilteredIndex < filteredCards.length - 1
          ? currentFilteredIndex + 1
          : 0;

      // If we're at the end and using random order, reshuffle
      if (nextFilteredIndex === 0 && isRandomOrder && selectedRange) {
        const cardsInRange = cards.filter(
          (card) =>
            card.id >= selectedRange.start && card.id <= selectedRange.end
        );
        const newShuffled = [...cardsInRange].sort(() => Math.random() - 0.5);
        setRandomOrderCards(newShuffled);
        const nextIndex = cards.findIndex(
          (card) => newShuffled[0] && card.id === newShuffled[0].id
        );
        setCurrentCardIndex(nextIndex);
      } else {
        const nextCard = filteredCards[nextFilteredIndex];
        if (nextCard) {
          const nextIndex = cards.findIndex((card) => card.id === nextCard.id);
          setCurrentCardIndex(nextIndex);
        }
      }

      saveProgress(updatedCards, currentCardIndex);
    }
  };

  const handleUnknown = () => {
    const currentCard = isExamMode
      ? examCards[currentCardIndex]
      : cards[currentCardIndex];
    if (!currentCard) return;
    if (isExamMode) {
      setExamIncorrect((prev) => prev + 1);
      if (currentCardIndex < examCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setShowAnswer(false);
      } else {
        // Show results
        setShowExamResults(true);
        setIsExamMode(false);
      }
    } else {
      const currentCard = cards[currentCardIndex];
      if (!currentCard) return;

      const updatedCards = [...cards];
      updatedCards[currentCardIndex] = {
        ...currentCard,
        timesIncorrect: currentCard.timesIncorrect + 1,
        lastReviewed: new Date(),
      };

      setCards(updatedCards);
      setUnknownCards([...unknownCards, currentCard]);
      setShowAnswer(false);

      const nextFilteredIndex =
        currentFilteredIndex < filteredCards.length - 1
          ? currentFilteredIndex + 1
          : 0;

      // If at end and using random order, reshuffle
      if (nextFilteredIndex === 0 && isRandomOrder && selectedRange) {
        const cardsInRange = cards.filter(
          (card) =>
            card.id >= selectedRange.start && card.id <= selectedRange.end
        );
        const newShuffled = [...cardsInRange].sort(() => Math.random() - 0.5);
        setRandomOrderCards(newShuffled);
        const nextIndex = cards.findIndex(
          (card) => newShuffled[0] && card.id === newShuffled[0].id
        );
        setCurrentCardIndex(nextIndex);
      } else {
        const nextCard = filteredCards[nextFilteredIndex];
        if (nextCard) {
          const nextIndex = cards.findIndex((card) => card.id === nextCard.id);
          setCurrentCardIndex(nextIndex);
        }
      }

      saveProgress(updatedCards, currentCardIndex);
    }
  };

  const handleCardSelect = (index: number) => {
    const selectedCard = filteredCards[index];
    if (!selectedCard) return;

    const newIndex = cards.findIndex((card) => card.id === selectedCard.id);
    setCurrentCardIndex(newIndex);
    setShowQuestionList(false);
    setShowAnswer(false);
    saveProgress(cards, newIndex);
  };

  const handleReset = () => {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(LAST_POSITION_KEY);
    window.location.reload();
  };

  const handleRefreshCache = async () => {
    if (isRefreshing || !offlineModeEnabled) return;

    setIsRefreshing(true);
    try {
      console.log("Refreshing data from network...");
      const response = await fetch("kerdesek.md");
      if (!response.ok) {
        throw new Error("Failed to refresh data");
      }
      const markdown = await response.text();
      saveCachedData(markdown);
      toast.success("Data updated successfully! The page will reload.");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data. Please check your internet connection.");
      setIsRefreshing(false);
    }
  };

  const toggleOfflineMode = () => {
    const newValue = !offlineModeEnabled;
    setOfflineModeEnabled(newValue);
    localStorage.setItem(OFFLINE_MODE_KEY, String(newValue));

    if (newValue) {
      // Offline mode enabled - cache current data
      toast.success("Offline mode enabled! The page will reload and cache data for offline use.");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      // Offline mode disabled - clear cache
      clearCachedData();
      setCacheTimestamp(null);
      setIsUsingCache(false);
      toast.info("Offline mode disabled. Cached data has been cleared.");
    }
  };

  const handleStartExam = (
    questionCount: number,
    startRange: number,
    endRange: number,
    points: number[]
  ) => {
    setSelectedRange({ start: startRange, end: endRange });
    let availableCards = cards.filter(
      (card) => card.id >= startRange && card.id <= endRange
    );

    // Apply points filter if selected
    if (points.length > 0) {
      availableCards = availableCards.filter((card) =>
        points.includes(card.points || 1)
      );
    }

    // Validate card count after filtering
    if (availableCards.length < questionCount) {
      toast.error(
        `Not enough questions available with the selected filters. Only ${availableCards.length} questions match your criteria.`
      );
      return;
    }

    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, questionCount);

    setExamCards(selected);
    setExamCorrect(0);
    setExamIncorrect(0);
    setIsExamMode(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setFilteredCards(selected);
    setShowExamSetup(false);
  };

  const handleExamClose = () => {
    setShowExamResults(false);
    setIsExamMode(false);
    setExamCards([]);

    // Restore range mode
    if (selectedRange) {
      const cardsInRange = cards.filter(
        (card) => card.id >= selectedRange.start && card.id <= selectedRange.end
      );
      setFilteredCards(cardsInRange);
      const startIndex =
        cards.findIndex((card) => card.id === cardsInRange[0]?.id) || 0;
      setCurrentCardIndex(startIndex);
    }
    setShowAnswer(false);
  };

  const handleQuitExam = () => {
    setIsExamMode(false);
    setExamCards([]);
    setExamCorrect(0);
    setExamIncorrect(0);

    // Restore previous range if it exists
    if (selectedRange) {
      const cardsInRange = cards.filter(
        (card) => card.id >= selectedRange.start && card.id <= selectedRange.end
      );
      setFilteredCards(cardsInRange);
      const startIndex =
        cards.findIndex((card) => card.id === cardsInRange[0]?.id) || 0;
      setCurrentCardIndex(startIndex);
    }
    setShowAnswer(false);
  };

  // Update toggleStudyMode function to only handle unknown/all
  const toggleStudyMode = () => {
    setStudyMode((current) => (current === "all" ? "unknown" : "all"));
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  // Add new function for marked mode
  const toggleMarkedMode = () => {
    setStudyMode((current) => (current === "marked" ? "all" : "marked"));
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const toggleMark = (cardIndex: number) => {
    const updatedCards = [...cards];
    const cardToUpdate = updatedCards[cardIndex];
    if (cardToUpdate) {
      updatedCards[cardIndex] = {
        ...cardToUpdate,
        isMarked: !cardToUpdate.isMarked,
      };
      setCards(updatedCards);
      saveProgress(updatedCards, currentCardIndex);
    }
  };


  useEffect(() => {
    if (
      showQuestionList &&
      currentQuestionRef.current &&
      questionListRef.current
    ) {
      // Wait for the modal animation to complete
      setTimeout(() => {
        currentQuestionRef.current?.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }, 100);
    }
  }, [showQuestionList]);

  useEffect(() => {
    if (!isExamMode) {
      const filtered = getFilteredCards();
      setFilteredCards(filtered);
      const newFilteredIndex = filtered.findIndex(
        (card) => card.id === cards[currentCardIndex]?.id
      );
      setCurrentFilteredIndex(newFilteredIndex >= 0 ? newFilteredIndex : 0);
    } else {
      setFilteredCards(examCards);
      setCurrentFilteredIndex(currentCardIndex);
    }
  }, [
    cards,
    selectedRange,
    studyMode,
    currentCardIndex,
    isExamMode,
    examCards,
    selectedPoints,
    isRandomOrder,
    selectedTags,
  ]);

  const currentCard = isExamMode
    ? examCards[currentCardIndex]
    : cards[currentCardIndex];

  if (cards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  // Add UI elements to render
  const renderCardControls = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {!isExamMode ? (
        <>
          <Button onClick={handleUnknown} variant="destructive">
            <XCircle className="mr-2" /> Don't Know
          </Button>
          <Button
            onClick={() => toggleMark(currentCardIndex)}
            variant="outline"
            className={currentCard?.isMarked ? "border-yellow-500" : ""}
          >
            {currentCard?.isMarked ? <BookmarkCheck /> : <Bookmark />}
            {currentCard?.isMarked ? "Marked" : "Mark"}
          </Button>
          <Button onClick={handleKnown}>
            <CheckCircle className="mr-2" /> Know It
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleUnknown} variant="destructive">
            <XCircle className="mr-2" /> Don't Know
          </Button>
          <Button
            variant="outline"
            className="text-red-400 border-red-400/50 hover:bg-red-400/10"
            onClick={handleQuitExam}
          >
            Quit Exam
          </Button>
          <Button onClick={handleKnown}>
            <CheckCircle className="mr-2" /> Know It
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Adatbázisok 2 vizsga
          </h1>
          {/* Mobile Menu Button - hide during exam */}
          {!isExamMode && (
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden border-gray-700 hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {/* Desktop controls */}
          {!isExamMode ? (
            <div className="hidden sm:flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => setShowQuestionList(!showQuestionList)}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => setDualView(!dualView)}
              >
                {dualView ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Columns className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={toggleStudyMode}
              >
                {studyMode === "all" ? "Study Unknown Only" : "Study All"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-700 hover:bg-gray-800 ${studyMode === "marked"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : ""
                  }`}
                onClick={toggleMarkedMode}
              >
                <BookmarkCheck className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={handleReset}
                title="Reset Progress"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-700 hover:bg-gray-800 ${offlineModeEnabled ? 'bg-green-500/20 text-green-400' : ''}`}
                onClick={toggleOfflineMode}
                title={offlineModeEnabled ? "Offline Mode: ON" : "Offline Mode: OFF"}
              >
                {offlineModeEnabled ? <CloudOff className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}
              </Button>
              {offlineModeEnabled && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={handleRefreshCache}
                  disabled={isRefreshing}
                  title="Refresh Questions (requires internet)"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => setShowRangeSelector(true)}
              >
                <HashIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => setShowExamSetup(true)}
              >
                <GraduationCap className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                onClick={handleQuitExam}
              >
                Quit Exam
              </Button>
            </div>
          )}
        </div>
        {/* Mobile Menu */}
        <MobileMenu
          studyMode={studyMode}
          dualView={dualView}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onToggleQuestionList={() => setShowQuestionList(!showQuestionList)}
          onToggleDualView={() => setDualView(!dualView)}
          onToggleStudyMode={toggleStudyMode}
          onToggleMarkedMode={toggleMarkedMode}
          onReset={handleReset}
          onToggleRangeSelector={() => setShowRangeSelector(true)}
          onRefreshCache={handleRefreshCache}
          isRefreshing={isRefreshing}
          offlineModeEnabled={offlineModeEnabled}
          onToggleOfflineMode={toggleOfflineMode}
        />

        {/* Add Range Selector */}
        {showRangeSelector && (
          <QuestionRangeSelector
            totalQuestions={cards.length}
            initialRange={selectedRange}
            availableTags={availableTags}
            availablePoints={availablePoints}
            onSelectRange={(start, end, randomOrder, points, tags) => {
              setSelectedRange({ start, end });
              setIsRandomOrder(randomOrder);
              setSelectedPoints(points);
              setSelectedTags(tags);

              // Filter cards by range, points, and tags
              const cardsInRange = cards.filter(
                (card) =>
                  card.id >= start &&
                  card.id <= end &&
                  (points.length === 0 || points.includes(card.points || 1)) &&
                  (tags.length === 0 ||
                    (card.tags && card.tags.some((tag) => tags.includes(tag))))
              );

              if (randomOrder) {
                const shuffled = [...cardsInRange].sort(
                  () => Math.random() - 0.5
                );
                setRandomOrderCards(shuffled);
                const startIndex = cards.findIndex(
                  (card) => shuffled[0] && card.id === shuffled[0].id
                );
                setCurrentCardIndex(Math.max(startIndex, 0));
              } else {
                setRandomOrderCards([]);
                const startIndex = cards.findIndex(
                  (card) => cardsInRange[0] && card.id === cardsInRange[0].id
                );
                setCurrentCardIndex(Math.max(startIndex, 0));
              }
              setShowAnswer(false);
            }}
            onClose={() => setShowRangeSelector(false)}
          />
        )}

        {showQuestionList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full h-[80vh] flex flex-col">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold">Select Question</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuestionList(false)}
                >
                  Close
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4" ref={questionListRef}>
                <div className="space-y-2">
                  {filteredCards.map((card, index) => (
                    <Button
                      key={card.id}
                      ref={
                        index === currentFilteredIndex
                          ? currentQuestionRef
                          : null
                      }
                      variant="outline"
                      className={`w-full justify-start ${index === currentFilteredIndex
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-700"
                        }`}
                      onClick={() => handleCardSelect(index)}
                    >
                      <span className="mr-2">{card.id}.</span>
                      <span className="truncate">{card.question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
            <span>
              {isExamMode
                ? `Question ${currentCardIndex + 1} of ${examCards.length}`
                : `Question ${currentFilteredIndex + 1} of ${filteredCards.length
                }`}
              {selectedRange && !isExamMode && (
                <span className="ml-2 text-gray-500">
                  (Range: {selectedRange.start}-{selectedRange.end})
                </span>
              )}
              {isExamMode && (
                <span className="ml-2 text-gray-500">(Exam Mode)</span>
              )}
            </span>
            {currentCard?.hasImage && (
              <span className="flex items-center">
                <ImageIcon size={16} className="mr-1" />
                Contains diagram
              </span>
            )}
          </div>
          <div className="h-1 bg-gray-800 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentFilteredIndex + 1) / filteredCards.length) * 100
                  }%`,
              }}
            />
          </div>
        </div>

        {/* Main Card */}
        {dualView ? (
          <div className="grid grid-cols-2 gap-8 mb-4">
            {/* First card - Question */}
            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="h-[60vh] max-h-[600px] flex flex-col">
                  <div className="mb-4 text-sm font-medium text-gray-400">
                    Question:
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="text-xl leading-relaxed">
                      <MarkdownRenderer
                        content={currentCard?.question}
                        imagePath={undefined}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second card - Answer */}
            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="h-[60vh] max-h-[600px] flex flex-col">
                  <div className="mb-4 text-sm font-medium text-gray-400">
                    Answer:
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="text-xl leading-relaxed">
                      <MarkdownRenderer
                        content={currentCard?.answer}
                        imagePath={currentCard?.imagePath}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <FlipCard
            question={currentCard?.question}
            answer={currentCard?.answer}
            imagePath={currentCard?.imagePath}
            onKnow={handleKnown}
            onDontKnow={handleUnknown}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            currentIndex={currentCardIndex}
          />
        )}
        {/* Action Buttons */}
        <div className="mt-4">
          {renderCardControls()}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Known</span>
              <span className="text-xl font-bold text-green-400">
                {knownCards.length}
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Need Practice</span>
              <span className="text-xl font-bold text-red-400">
                {unknownCards.length}
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Marked</span>
              <span className="text-xl font-bold text-yellow-400">
                {cards.filter((card) => card.isMarked).length}
              </span>
            </div>
          </div>

          {/* Card Stats */}
          {currentCard && (
            <div className="col-span-3 p-3">
              <div className="text-sm text-gray-500 flex justify-center gap-4">
                <span>Correct: {currentCard.timesCorrect}</span>
                <span>Incorrect: {currentCard.timesIncorrect}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Cache Status */}
        {offlineModeEnabled && cacheTimestamp && (
          <div className="mt-8 pb-4 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <div className={`w-1.5 h-1.5 rounded-full ${isUsingCache ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <span>
                {isUsingCache ? 'Offline ready' : 'Connected'} · Last sync: {new Date(cacheTimestamp).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />

      {showExamSetup && (
        <ExamSetup
          totalQuestions={cards.length}
          cards={cards}
          onStartExam={handleStartExam}
          onClose={() => setShowExamSetup(false)}
        />
      )}

      {showExamResults && (
        <ExamResults
          correct={examCorrect}
          incorrect={examIncorrect}
          onRetry={() => {
            setShowExamResults(false);
            setShowExamSetup(true);
          }}
          onClose={handleExamClose}
        />
      )}
    </div>
  );
}

export { FlashcardApp };
