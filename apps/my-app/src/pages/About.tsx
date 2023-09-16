import { useState } from "hyri-preact/hooks"

const About = () => {

  const [count, setCount] = useState(0)

  return <p>
    SAlut tout le monde
    <a href="/">Home</a>
    <button onClick={() => setCount(count + 1)}>{count}</button>
  </p>
}

export default About