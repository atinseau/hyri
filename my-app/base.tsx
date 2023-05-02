import Counter from "./components/Counter";

interface Props {
  name: string;
}

async function Base () {
  return <div>
    <h1>Salut !</h1>
    {/* <Wait time={1}/> */}
    <Counter/>
    <a href="/about">About</a>
  </div>
}

export default Base;