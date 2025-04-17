export const WasmDemo = () => {
  const onClick = async () => {
    // const wasm = await import("../../WasmDemo-core/pkg/WasmDemo_core");
    // wasm.greet();
  };
  return <div onClick={onClick}>WasmDemo</div>;
};
