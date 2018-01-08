
  if(typeof web3 !== "undefined"){
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.eth.defaultAccount = web3.eth.accounts[0];

//ABI
  var collectorsContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_buyer",
				"type": "string"
			}
		],
		"name": "buyPiece",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "collectorsList",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "latestCollector",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "piecePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "increaseWithNewCollector",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "qtyOfCollectors",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "author",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNameBuyer",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "buyer",
				"type": "string"
			}
		],
		"name": "Buyer",
		"type": "event"
	}
])

  var collectors = collectorsContract.at("0x232e3cdd37d8ab9af3f06175a61dfe2f404ee326");
  console.log(collectors)

  var latestAddress = document.getElementById("latestCollector");
  var qtyOfCollectors = document.getElementById("qtyOfCollectors");
  var button = document.getElementById("button");
  var nameUser = document.getElementById("name");
  var address = document.getElementById("address");
  var latestCollector = document.getElementById("latestCollector");
  var contract = document.getElementById("contract");
  var price = document.getElementById("price");

  contract.innerText = " " + collectors.address;

  collectors.latestCollector(function(error, result){
    if (!error) {
      latestAddress.innerText = result
    } else {
      console.log(error)
    }
  });

  collectors.piecePrice(function(error, result){
    if (!error) {
      price.innerText = "Current Price : " + result.c[0]/10000 + " ethers";
      console.log(result)
    } else {
      console.log(error)
    }
  });

  collectors.qtyOfCollectors(function(error, result){
    if (!error) {
      qtyOfCollectors.innerText = "Previous Collectors:" + " " + result
    } else {
      console.log(error)
    }
  });


  var buyerEvent = collectors.Buyer(); // Event

  buyerEvent.watch(function(error, result) {
    if(!error) {
      console.log("listening");
      latestCollector.innerText = "Current Collector: " + result.args.name + " " +  result.args.buyer;
      button.innerText = "Buy Piece from " + result.args.name;

    } else {
      console.log("error")
    }
  });

  button.addEventListener("click", function(){

    collectors.buyPiece(nameUser.value, address.value); // Set name and address last buyer

  });
