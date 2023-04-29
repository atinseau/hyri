import Counter from "../components/Counter";
import Wait from "../components/Wait";


interface Props {
  name: string;
}

async function Page () {
  return <div>
    <h1>Salut !</h1>
    <Wait time={1}/>
    <Counter/>
    <a href="/about">About</a>
  </div>
}

const route = {
  path: "/"
}

export default {
  component: Page,
  route
};