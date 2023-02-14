//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import 'hardhat/console.sol';

contract SnippetsDApp {
    uint256 totalSnippets;

    constructor() {
        console.log("I am DevCheese and this is my first DApp");
    }
    function snippet() public {
        totalSnippets += 1;
        console.log("%s left a snippet!", msg.sender);
    }
    /*string public message;

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }*/ // allows a wallet address to leave a string message
    function getTotalSnippets() public view returns (uint256) {
        console.log("Yay! we've got %d total snippets!", totalSnippets);
        return totalSnippets;
    }
    address[] public senderAddresses;

    function addSenderAddress() public {
        senderAddresses.push(msg.sender); // this function stores the address of the senders in an array
    }
}