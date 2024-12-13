import { useState } from "react";

interface UseLoadingReturn {
    loading: boolean;
    stopLoading: () => void;
    startLoading: () => void;
}

/**
 * Hook to manage a boolean state variable for loading.
 *
 * @returns An object with two properties: `loading` (a boolean indicating whether the loading state is active) and `stopLoading` (a function to set the loading state to false).
 */
const useLoading = (): UseLoadingReturn => {
    const [loading, setLoading] = useState<boolean>(false);

    const stopLoading = () => {
        setLoading(false);
    }

    const startLoading = () => {
        setLoading(true);
    }

    return { loading, stopLoading, startLoading }
}

export default useLoading;
