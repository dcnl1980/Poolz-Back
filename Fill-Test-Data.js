//exec ./Fill-Test-Data.js
const ThePoolz = artifacts.require("Thepoolz");
const TestToken = artifacts.require("TestToken");

module.exports = async function(callback) {
    console.log("Start Building Test Data ...");
    let instance = await ThePoolz.deployed();
    let accounts = await web3.eth.getAccounts();
    let Test_Token = await TestToken.deployed();
    const amount = 1150;
    console.log("Cheking network...");
    let pools = await instance.GetLastPoolId();
    console.log("Got " + pools + " POOLZ Now");
    Test_Token.approve(instance.address, amount * 10, { from: accounts[0] });
    let date = new Date();
    for (let i = 0; i < 10; i++) {
        date.setDate(date.getDate() + 1);
        instance.CreatePool(Test_Token.address, date.getTime(), 1, true, amount, false, { from: accounts[0] });
        console.log("Loop counter = "+ i );
    }
    console.log("Cheking network...");
    pools = await instance.GetLastPoolId();
    console.log("Got " + pools + " POOLZ Now");
    process.exit();
}
