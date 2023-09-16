import { useEffect, useState } from "hyri-preact/hooks";

const About = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("salut tout le monde")
  }, [])

  return (
    <div>
      <p>salut tout le monde</p>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default About;