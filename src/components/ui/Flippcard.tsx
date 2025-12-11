import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from './Card';
import MarkdownRenderer from '../../MarkdownRenderer';

interface FlipCardProps {
  question: string | undefined;
  answer: string | undefined;
  imagePath?: string;
  onKnow: () => void;
  onDontKnow: () => void;
  showAnswer: boolean;
  setShowAnswer: (show: boolean) => void;
  currentIndex: number;
}

const FlipCard: React.FC<FlipCardProps> = ({
  question,
  answer,
  imagePath,
  onKnow,
  onDontKnow,
  showAnswer,
  setShowAnswer,
  currentIndex
}) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    controls.start({ x: 0, opacity: 1 });
  }, [currentIndex, controls]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    setIsDragging(false);
    const { offset } = info;

    if (offset.x > 100) {
      controls.start({ x: 500, opacity: 0 }).then(() => {
        onKnow();
        setShowAnswer(false);
        controls.start({ x: -500, opacity: 0, transition: { duration: 0 } }).then(() => {
          controls.start({ x: 0, opacity: 1, transition: { duration: 0.3 } });
        });
      });
    } else if (offset.x < -100) {
      controls.start({ x: -500, opacity: 0 }).then(() => {
        onDontKnow();
        setShowAnswer(false);
        controls.start({ x: 500, opacity: 0, transition: { duration: 0 } }).then(() => {
          controls.start({ x: 0, opacity: 1, transition: { duration: 0.3 } });
        });
      });
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  const handleClick = () => {
    if (!isDragging && !isFlipping) {
      setIsFlipping(true);
      // Use requestAnimationFrame to defer state update
      requestAnimationFrame(() => {
        setShowAnswer(!showAnswer);
        setTimeout(() => {
          setIsFlipping(false);
        }, 600);
      });
    }
  };

  return (
    <div className="mb-2 md:mb-4 relative h-full md:h-[500px]">

      <motion.div
        style={{ x, rotate, opacity, willChange: 'transform' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="cursor-pointer relative h-full"
        onClick={handleClick}
        animate={controls}
      >
        <div className="perspective-1000 h-full">
          <motion.div
            animate={{
              rotateY: showAnswer ? 180 : 0,
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="w-full h-full preserve-3d relative"
            style={{
              transformOrigin: "center center",
              willChange: 'transform'
            }}
          >
            {/* Question side */}
            <Card className="mb-2 md:mb-4 bg-gray-800 border-gray-700 absolute w-full h-full backface-hidden inset-0">
              <CardContent className="p-3 sm:p-4 md:p-6 h-full">
                <div className="h-full flex flex-col">
                  <div className="mb-2 md:mb-3 text-xs md:text-sm font-medium text-gray-400 flex-shrink-0">
                    Question:
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                    <div className="text-base md:text-lg leading-relaxed">
                      <MarkdownRenderer content={question} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer side */}
            <Card className="mb-2 md:mb-4 bg-gray-800 border-gray-700 absolute w-full h-full backface-hidden inset-0"
              style={{ transform: 'rotateY(180deg)' }}>
              <CardContent className="p-3 sm:p-4 md:p-6 h-full">
                <div className="h-full flex flex-col">
                  <div className="mb-2 md:mb-3 text-xs md:text-sm font-medium text-gray-400 flex-shrink-0">
                    Answer:
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                    <div className="text-base md:text-lg leading-relaxed">
                      <MarkdownRenderer
                        content={answer}
                        imagePath={imagePath}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;