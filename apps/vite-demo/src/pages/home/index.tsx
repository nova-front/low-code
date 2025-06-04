import { sleep } from "@nova-fe/utils";
const Home = () => {
  const clickFn = async () => {
    await sleep(3000);
    console.log("33");
  };
  return <div onClick={clickFn}>Home</div>;
};

export default Home;
