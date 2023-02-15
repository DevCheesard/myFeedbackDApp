//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import 'hardhat/console.sol';

contract SnippetsDApp {
    uint256 totalSnippets;
    uint256 private seed;

    event newSnippet(address indexed from, uint256 timestamp, string message);

    // struct is a datatype that lets us customize what we want
    struct Snippet {
        address user; //address of user who leaves a snippet
        string message; //message sent by user
        uint256 timestamp; //timestamp when snippet was sent
    }

    //this variable stores the snippets in an array of structs
    Snippet[] snippets;

     mapping(address => uint256) public lastSnippedAt;
    constructor() payable {
        console.log("I am DevCheese and this is my first DApp");

        seed = (block.timestamp + block.difficulty) %100;
    }
    function snippet(string memory _message) public {

        require(lastSnippedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");

        lastSnippedAt[msg.sender] = block.timestamp;

        totalSnippets += 1;
        console.log("%s left a snippet w/ message %s!", msg.sender, _message);
    

        snippets.push(Snippet(msg.sender,_message, block.timestamp));

         //Generate a new seed for the next user that sends a snippet
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

    
    uint256 prizeAmount = 0.0001 ether;
    require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
    );
    (bool success, ) = (msg.sender).call{value: prizeAmount}("");
    require(success, "Failed to withdraw money from contract.");
    } //an emitted event stores the arguments passed in a transaction log
    emit newSnippet(msg.sender, block.timestamp, _message);
    }

    /*string public message;

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }*/ // allows a wallet address to leave a string message

    //function getAllWaves which will return the struct array, waves, to us.
    //This will make it easy to retrieve the waves from our website!
    function getAllSnippets() public view returns (Snippet[] memory) {
        return snippets;
    }

    function getTotalSnippets() public view returns (uint256) {
        console.log("Yay! we've got %d total snippets!", totalSnippets);
        return totalSnippets;
    }
    address[] public senderAddresses;

    function addSenderAddress() public {
        senderAddresses.push(msg.sender); // this function stores the address of the senders in an array
    }
}