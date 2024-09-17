import { ethers } from "hardhat";

async function main() {
  const [owner ] = await ethers.getSigners();


//   const useSwapAddress = "0x38B27C025503Bd286252B216c3031a59282262B3";
  const useSwapAddress2 = "0xfaA7b3a4b5c3f54a934a2e33D34C7bC099f96CCE";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const UseSwap = await ethers.getContractAt("UseSwap", useSwapAddress2, owner);

  const amountOut = ethers.parseUnits("1.0", 18);
  const amountInMax = ethers.parseUnits("10.0", 18);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const path = [USDC, DAI];


  const randomWallet = ethers.Wallet.createRandom();
  const recipient = randomWallet.address;

  const usdcContract = await ethers.getContractAt("IERC20", USDC, owner);
  const approveTx = await usdcContract.approve(useSwapAddress2, amountInMax);
  console.log({ usdcContract });
  console.log({ approveTx  });
  await approveTx.wait();
  console.log("Tokens approved for swap.");


  const swapTx = await UseSwap.handleSwap(
    amountOut,
    amountInMax,
    path,
    recipient,
    deadline
  );
  await swapTx.wait();
  console.log("Swap executed successfully.");

  const swapCount = await UseSwap.swapCount();
  console.log(`Total swaps executed: ${swapCount.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
