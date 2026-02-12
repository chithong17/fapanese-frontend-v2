import { useState, useEffect } from "react";

interface UseFlashcardButtonOptions {
  activeTab: "lesson" | "exercise";
  contentType: "vocab" | "grammar";
}

export const useFlashcardButton = ({
  activeTab,
  contentType,
}: UseFlashcardButtonOptions) => {
  const [showFlashcardButton, setShowFlashcardButton] = useState(false);

  useEffect(() => {
    // Always show button when on lesson tab with vocab content
    if (activeTab === "lesson" && contentType === "vocab") {
      setShowFlashcardButton(true);
    } else {
      setShowFlashcardButton(false);
    }
  }, [activeTab, contentType]);

  return { showFlashcardButton };
};
