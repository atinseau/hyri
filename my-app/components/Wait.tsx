

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface Props {
  time: number;
}

async function Wait(props: Props) {
  await timer(props.time);
  return <p>J'ai attendu {props.time}ms</p>
}

export default Wait;