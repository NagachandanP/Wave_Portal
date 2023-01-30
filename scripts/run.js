const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  // console.log("Contract deployed by:", owner.address);
  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();
  // console.log(waveCount.toNumber());
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance));



  ///////////////////////////Wave//////////////////////////////////
  let waveTxn = await waveContract.wave("1st message");

  await waveTxn.wait();//wait for transaction to be mined

  // Random user 
  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait();

  //Same user to check cooldown mechanism
  let waveTxn2 = await waveContract.wave("2nd message");

  await waveTxn2.wait();
  // wait for transaction to be mined

  ////////////////////////////////////////////////////////////////////
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance));

  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  // await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
  // await waveContract.getTotalWaves();

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

