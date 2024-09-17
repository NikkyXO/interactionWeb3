import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";


const UseSwapModule = buildModule("UseSwapModule", (m) => {

  const useSwap = m.contract("UseSwap", [uniswapRouterAddress]);

  return { useSwap };
});

export default UseSwapModule;
