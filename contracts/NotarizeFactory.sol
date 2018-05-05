pragma solidity ^0.4.18;

import './Notarize.sol';

contract NotarizeFactory {
    address[] public deployedNotarizes; // deployed notarize list

    function addNotarize(address givenUserA, address givenUserB, string givenContent, uint givenValidDays) public {
        address newNotarize = new Notarize(givenUserA, givenUserB, givenContent, givenValidDays);
        deployedNotarizes.push(newNotarize);
    }

    function getDeployedNotarizes() public view returns (address[]) {
        return deployedNotarizes;
    }
}