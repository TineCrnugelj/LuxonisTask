import {ReactElement, useState} from "react";

/***
 * This is good, always use hooks to share such
 * logic across the app, not sure why you pass as argument
 * ReactElement, when you can simply pass number
 */
export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) {
        return i;
      }
      return i + 1;
    })
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) {
        return i;
      }
      return i - 1;
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0
  }
}
