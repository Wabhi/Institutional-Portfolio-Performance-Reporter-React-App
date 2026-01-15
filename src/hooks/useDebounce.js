import { useState, useEffect } from "react";

const useDebounce = (value, delay = 300) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timeoutHandler)
        }
    }, [value, delay])

    return debounceValue;

}

export default useDebounce;