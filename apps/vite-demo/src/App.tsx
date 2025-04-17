import {
  ContentEditable,
  UndoableEditor,
  Demo1,
  Demo2,
  Demo3,
  Demo4,
  Demo5,
} from "@repo/editor";

function App() {
  return (
    <div>
      <h2>一</h2>
      <Demo1 />
      <h2>二</h2>
      <Demo2 />
      <h2>三</h2>
      <Demo3 />
      <h2>四</h2>
      <Demo4 />
      <h2>五</h2>
      <Demo5 />
      <h2>成品</h2>
      <div>
        <ContentEditable />
      </div>
      <br />
      <UndoableEditor />
    </div>
  );
}

export default App;
