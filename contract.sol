pragma solidity ^0.4.19;


contract Collectors{

  address public author;
  uint public qtyOfCollectors;
  address public latestCollector;
  uint public pieceValue = 0.001 ether; // Initial Price of Piece.
  uint public increaseValueWithNewCollector = 0.010 ether; // Piece will increase value with every new collector.
  uint public increaseValueWithEveryNewVisit = 0.0001 ether; // Piece will increase value with every new IP address that access to it.


  mapping(address => bool) allCollectors;

//   event Buyer(string name, string buyer);

  function buyPiece() public payable {
    require(msg.sender != author); // author can't buy his own piece
    require(msg.sender != latestCollector); // lastowner can't buy his own buyPiece
    require(msg.value >= pieceValue);
    allCollectors[msg.sender] = true;
    latestCollector = msg.sender;
    qtyOfCollectors++;
    pieceValue = pieceValue + increaseValueWithNewCollector;
    // buyer = _buyer;
    // fName = _fName;
    // Buyer(_fName, _buyer);

  }

  function collectorsList (address addr) public view returns (bool) {
    return allCollectors[addr];
  }

//   function get() constant returns (uint public) {
//         return qtyOfCollectors;
//   }

//   function newVisit() public {}

  //todo :
  // when a new collector buy the piece, the latest Value is sent to the previuos collector.
  // a small fee is sent to the author with every new transaction.
  // Increase value with every new visit.


}
