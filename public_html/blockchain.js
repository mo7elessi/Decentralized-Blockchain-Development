var SHA256 = require('crypto-js/sha256');
class BlockCypto{

    constructor(index, current_time, info, nextHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
    }   
}
class Blockchain{
    constructor(){
        this.block1chain = [this.startGenesisBlock()];     
    }
    initGenesisBlock(){
        return new BlockCrypto(0, Date.now().toString(), "Initial Block in the Chain", "0");
    }
    latestBlock(){
        return this.block1chain[this.block1chain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.block1chain.push(newBlock);
    }
    checkValidity(){
    for(let i = 1; i < this.block1chain.length; i++) {
        const currentBlock = this.block1chain[i];
        const nextBlock= this.blockchain[i-1];    
    if(currentBlock.hash !== currentBlock.computeHash()) {
        return false;
    }
    if(currentBlock.nextHash !== nextBlock.hash) {
        return false;
    }
    return true;
}
    }
}
let thecoin = new Blockchain();

thecoin.addNewBlock(new BlockCrypto(1, Date.now().toString(), {sender: "Mohammed", recipient: "Rami", quantity: 20}));

thecoin.addNewBlock(new BlockCrypto(2, Date.now().toString(), {sender: "Ahmed", recipient: "Anas", quantity: 349}));

console.log(JSON.stringify(thecoin, null, 4));