import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionViewerProps {
  question: string;
  romaji?: string;
  meaning?: string;
  answer?: string;
  answerRomaji?: string;
  answerMeaning?: string;
  isSuggestion?: boolean;
}

/**
 * Component to display a speaking question with optional answer suggestions
 */
export function QuestionViewer({
  question,
  romaji,
  meaning,
  answer,
  answerRomaji,
  answerMeaning,
  isSuggestion = false,
}: QuestionViewerProps) {
  const [showAnswer, setShowAnswer] = useState(!isSuggestion);
  const [showQuestionRomaji, setShowQuestionRomaji] = useState(false);
  const [showQuestionMeaning, setShowQuestionMeaning] = useState(false);

  return (
    <div className="p-3 sm:p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Question */}
      <div className="mb-4">
        {/* Toggle Buttons for Question */}
        {(romaji || meaning) && (
          <div className="flex gap-2 mb-3">
            {romaji && (
              <Button
                variant={showQuestionRomaji ? "default" : "outline"}
                size="sm"
                onClick={() => setShowQuestionRomaji(!showQuestionRomaji)}
                className="gap-2 text-xs sm:text-sm"
              >
                {showQuestionRomaji ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                {showQuestionRomaji ? "Ẩn Romaji" : "Hiện Romaji"}
              </Button>
            )}
            {meaning && (
              <Button
                variant={showQuestionMeaning ? "default" : "outline"}
                size="sm"
                onClick={() => setShowQuestionMeaning(!showQuestionMeaning)}
                className="gap-2 text-xs sm:text-sm"
              >
                {showQuestionMeaning ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                {showQuestionMeaning ? "Ẩn Nghĩa" : "Hiện Nghĩa"}
              </Button>
            )}
          </div>
        )}

        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{question}</p>
        {showQuestionRomaji && romaji && (
          <p className="text-sm text-gray-600 italic mb-1">
            <span className="font-medium">Romaji: </span>
            {romaji}
          </p>
        )}
        {showQuestionMeaning && meaning && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Nghĩa: </span>
            {meaning}
          </p>
        )}
      </div>

      {/* Answer (collapsible for suggestions) */}
      {answer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {isSuggestion && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex items-center gap-2 mb-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
            >
              {showAnswer ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ẩn gợi ý trả lời
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Xem gợi ý trả lời
                </>
              )}
            </Button>
          )}

          {showAnswer && (
            <div className="p-3 sm:p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <p className="text-base text-gray-900 font-medium mb-2">{answer}</p>
              {answerRomaji && (
                <p className="text-sm text-gray-600 italic mb-1">
                  <span className="font-medium">Romaji: </span>
                  {answerRomaji}
                </p>
              )}
              {answerMeaning && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Nghĩa: </span>
                  {answerMeaning}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
