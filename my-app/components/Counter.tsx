"use client";

import { useCallback, useMemo, useState } from "react";

const Counter = () => {

  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(n => n + 1);
  }, [])

  const memoTest = useMemo(() => {
    return "test"
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment {memoTest}</button>
    </div>
  );
};


export default Counter;