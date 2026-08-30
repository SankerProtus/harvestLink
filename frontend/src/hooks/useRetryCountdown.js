import { useEffect, useRef, useState } from "react";

export function useRetryCountdown(error) {
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const deadlineRef = useRef(null);

  const retryAfterSeconds =
    error?.code === "RATE_LIMIT_EXCEEDED"
      ? error?.details?.retryAfterSeconds
      : null;

  useEffect(() => {
    if (!retryAfterSeconds || retryAfterSeconds <= 0) {
      deadlineRef.current = null;
      setRemainingSeconds(null);
      return;
    }

    deadlineRef.current = Date.now() + retryAfterSeconds * 1000;
    setRemainingSeconds(retryAfterSeconds);

    const interval = setInterval(() => {
      const secondsLeft = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000),
      );
      setRemainingSeconds(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
    // Re-arm whenever a fresh rate-limit error comes in (a new failed
    // attempt), not just when the numeric value happens to change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, retryAfterSeconds]);

  return remainingSeconds;
}