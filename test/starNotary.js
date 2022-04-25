const StarNotary = artifacts.require("StarNotary"); 

var accounts; // List of development Accounts provided by Truffle 
var owner; // Global variable use it in the tests cases 


contract('StarNotary', (accs)=> {
    accounts = accs;
    owner = accounts[0]; 
})

it('has correct name', async()=> {
    let instance = await StarNotary.deployed();  // Making Sure the Smart Contracts is deployed and getting the instance 
    let starName = await instance.starName.call(); // Call the Name of the Star Name 
    assert.equal(starName, "Awesome Sulav Star"); 
})

it('can be claimed', async()=> {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from:owner}); 
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner,owner); 
})

it('can change owners', async()=> {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1] 
    await instance.claimStar({from:owner}); 
    let starOwner = await instance.starOwner.call(); 
    assert.equal(starOwner,owner);
    await instance.claimStar({from:secondUser}); 
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner,secondUser);
})