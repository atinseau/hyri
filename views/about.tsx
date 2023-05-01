import Wait from "../components/Wait";


interface Props {
  name: string;
}

async function About() {
  return <div>
    <h1>About !</h1>
    <Wait time={1} />
    <a href="/">Home</a>
  </div>
}

const route = {
  path: "/about"
}

export default {
  component: About,
  route
};