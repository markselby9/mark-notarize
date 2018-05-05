pragma solidity ^0.4.18;

contract Notarize {
    struct Participant {
        address addr;
        bool signed;
    }
    Participant public userA;   // user who starts the document
    Participant public userB;   // user who needs to accept the document
    string public content;  // content of the document
    uint256 public createTimestamp;     // timestamp of when this notarize document is created
    uint public validDays;  // how many days are the notarize valid for

    function Notarize(address givenUserA, address givenUserB, string givenContent, uint givenValidDays) public {
        userA = Participant(givenUserA, false);
        userB = Participant(givenUserB, false);
        content = givenContent;
        createTimestamp = now;
        validDays = givenValidDays;
    }

    function sign() public {
        if (msg.sender == userA.addr && isValid()) {
            // userA signs the document
            userA.signed = true;
        } else if (msg.sender == userB.addr && isValid()) {
            // userB signs the document
            userB.signed = true;
        }
    }

    function isFinished() public view returns (bool result) {
        return userA.signed && userB.signed;
    }

    function isValid() public view returns (bool result) {
        if (now <= createTimestamp + validDays * 1 days) {
            return true;
        }
        return false;
    }

    modifier isParticipant() {
        require (msg.sender == userA.addr || msg.sender == userB.addr);
        _;
    }
}