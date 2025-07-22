import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useApiHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(
    async <T>(
      fn: () => Promise<T>,
      {
        successMessage,
        errorMessage,
      }: {
        successMessage?: string;
        errorMessage?: string;
      } = {}
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fn();
        if (successMessage) {
          toast.success(successMessage);
        }
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(message);
        toast.error(errorMessage || "Request failed", { description: message });
        return null;
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    },
    []
  );

  return { isLoading, error, call };
}
