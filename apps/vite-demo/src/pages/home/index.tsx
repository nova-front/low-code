import { sleep } from "@nova-fe/utils";
import { Button } from "@nova-fe/base-ui";
const Home = () => {
  const clickFn = async () => {
    await sleep(3000);
    console.log("33");
  };
  return (
    <div onClick={clickFn}>
      Home
      <Button appName="hi">ihh</Button>
    </div>
  );
};

export default Home;
