import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Dot } from 'react-animated-dots';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Grid, 
  GridItem
} from '@chakra-ui/react';
import { useState, useEffect, SetStateAction } from 'react';
import erc3525 from "public/erc3525_diagram.png"; 
import { toast, ToastContainer } from "react-toastify";
import { ethers, BrowserProvider} from "ethers";
import abi from "../contracts/abi.json";

const inter = Inter({ subsets: ['latin'] })

const contractAddress = "0x55c212247e5d9F3A95795326946651A6b6AB4b7B";

declare global {
  interface Window {
    ethereum?: BrowserProvider;
  }
  interface ABIFace {
    ABI: ethers.InterfaceAbi
  }
}

// let abi = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_approved",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_operator",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "bool",
// 				"name": "_approved",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "ApprovalForAll",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_operator",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "_value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ApprovalValue",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_minter",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_sourceId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_targetId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "merge",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "slot_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "mint",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bytes",
// 				"name": "data_",
// 				"type": "bytes"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "operator_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "approved_",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "setApprovalForAll",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "metadataDescriptor",
// 				"type": "address"
// 			}
// 		],
// 		"name": "SetMetadataDescriptor",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_oldSlot",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_newSlot",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "SlotChanged",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "split",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "_to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "fromTokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "newTokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "fromTokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "toTokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_fromTokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "_toTokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "_value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "TransferValue",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "operator_",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allowance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner_",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "balance",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "contractURI",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getApproved",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "operator_",
// 				"type": "address"
// 			}
// 		],
// 		"name": "isApprovedForAll",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "metadataDescriptor",
// 		"outputs": [
// 			{
// 				"internalType": "contract IERC3525MetadataDescriptor",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ownerOf",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner_",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "index_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "slotByIndex",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "slotCount",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "slotOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "slot_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "slotURI",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes4",
// 				"name": "interfaceId",
// 				"type": "bytes4"
// 			}
// 		],
// 		"name": "supportsInterface",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "index_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenByIndex",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "slot_",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "index_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenInSlotByIndex",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner_",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "index_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenOfOwnerByIndex",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "slot_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenSupplyInSlot",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId_",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenURI",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "valueDecimals",
// 		"outputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

export default function Home() {

  const [inputValue, setInputValue] = useState('');

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');

  const [splitId, setSplitId] = useState('');
  const [mergeSrcId, setMergeSrcId] = useState('');
  const [splitAmount, setSplitAmount] = useState('');
  const [mergeTgtId, setMergeTgtId] = useState('');

  const [tokenSupplyId, setTokenSupplyId] = useState('');
  const [slotOfId, setSlotOfId] = useState('');

  const [currentAccount, setCurrentAccount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [minting, setMinting] = useState(false); 
  const [minted, setMinted] = useState(false); 
  const [spliting, setSplitting] = useState(false); 
  const [merging, setMerging] = useState(false);
  const [slotCountNum, setSlotCount] = useState(""); 
  const [name, setName] = useState(""); 
  const [myBalance, setMyBalance] = useState(""); 
  const [totalSupply, setTotalSupply] = useState(""); 
  const [totalSupplyInSlot, setTotalSupplyInSlot] = useState(""); 
  const [resquerySlotOfId, setQuerySlotOfId] =  useState(""); 
  const [resqueryTokenSupplyId, setQueryTokenSupplyId] =  useState(""); 

  const connectWallet = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = (await signer).getAddress();
    console.log(await address)
    setWalletAddress(await address);
  };

  useEffect(() => {
    if (window.ethereum) {
      
      connectWallet(); 
    }
    slotCount(); 
    getName(); 
    getBalance(); 
    getTokenSupply(); 

  }, [slotCountNum]);

   const mint = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    console.log(await signer)
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.mint(walletAddress, inputValue3, inputValue4);
      setMinted(false); 
      setMinting(true); 
      await res.wait(); 
      setMinting(false); 
      setMinted(true); 
      window.location.reload();
      toast.success("Minting success!", {
        position: toast.POSITION.TOP_RIGHT, 
        autoClose: 2000,
    })
    } catch (err) {
      console.log(err); 
    }
  };

  const split = async () => {
    console.log("okok"); 
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    console.log(await signer)
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.split(walletAddress, splitId, splitAmount);
      setSplitting(true); 
      await res.wait(); 
      setSplitting(false); 
      console.log("split ok")
    } catch (err) {
      console.log(err); 
    }
  };

  const merge = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    console.log(await signer)
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.merge(walletAddress, mergeSrcId, mergeTgtId);
      setMerging(true); 
      await res.wait(); 
      setMerging(false); 
      console.log("merge ok")
    } catch (err) {
      console.log(err); 
    }
  };

  const slotCount = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.slotCount(); 
      //await res.wait(); 
      console.log("slot count" + res); 
      var count = res; 
      var t = count.toString(); 
      setSlotCount(t); 
      console.log(typeof(slotCountNum)); 
    } catch (err) {
      console.log(err); 
    }
  }

  const getName = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.name(); 
      //await res.wait(); 
      console.log("name" + res); 
      setName(res); 
    } catch (err) {
      console.log(err); 
    }
  }

  const getBalance = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{

      // Function name and arguments
      const functionName = "balanceOf(address)";
      const functionArgs = [(walletAddress)];

      // Encode the function call using the ABICoder
      const encodedFunction = contract.interface.encodeFunctionData(functionName, functionArgs);

      // Call the function using the encoded data
      const result = await provider.send("eth_call", [{
          to: contractAddress,
          data: encodedFunction
      }]);

      // Decode the result using the ABICoder
      const decodedResult = contract.interface.decodeFunctionResult(functionName, result);
      //await decodedResult; 
   
      console.log(decodedResult);
     
      //setMyBalance(t); 
    } catch (err) {
      console.log(err); 
    }
  }

  const getTokenSupply = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.totalSupply(); 
      //await res.wait(); 
      console.log("total supply" + res); 
      var count = res; 
      var t = count.toString(); 
      setTotalSupply(t); 
    } catch (err) {
      console.log(err); 
    }
  }

  const getTokenSupplyInSlot = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.totalSupplyInSlot(); 
      //await res.wait(); 
      console.log("total supply" + res); 
      var count = res; 
      var t = count.toString(); 
      setTotalSupplyInSlot(t); 
    } catch (err) {
      console.log(err); 
    }
  }

  const querySlotOfId = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.slotOf(slotOfId); 
      //await res.wait(); 
      console.log("slot of id" + res); 
      var count = res; 
      var t = count.toString(); 
      setQuerySlotOfId(t); 
    } catch (err) {
      console.log(err); 
    }
  }

  const queryTokenSupplyId = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, await signer);
    try{
      const res = await contract.tokenSupplyInSlot(tokenSupplyId); 
      //await res.wait(); 
      console.log("token supply id" + res); 
      var count = res; 
      var t = count.toString(); 
      setQueryTokenSupplyId(t); 
    } catch (err) {
      console.log(err); 
    }
  }

  

  const handleInputChange1 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue1(event.target.value);
  };
  
  const handleInputChange2 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue2(event.target.value);
  };
  
  const handleInputChange3 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue3(event.target.value);
  };
  
  const handleInputChange4 = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue4(event.target.value);
  };

  const handleInputSplitId = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSplitId(event.target.value);
  };

  const handleInputSplitAmount = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSplitAmount(event.target.value);
  };

  const handleInputMergeSrcId = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMergeSrcId(event.target.value);
  };

  const handleInputMergeTgtId = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMergeTgtId(event.target.value);
  };

  const handleInputTokenSupplyId = (event: { target: { value: SetStateAction<string>; }; }) => {
    setTokenSupplyId(event.target.value);
  };

  const handleInputSlotOfId = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSlotOfId(event.target.value);
  };

  const handleButtonClick = () => {
    console.log('Button clicked with input value:', inputValue);
    // Do something with input value, such as sending to server
  };
  
  return (
    <>
      <Head>
      
        <title>ERC3525 Data Market Demo</title>
        <meta name="description" content="Demo for ERC3525 Data Market" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        
        <div className={styles.description}>
          <p>
            
            <code className={styles.code}>ERC3525 Data Market Demo</code>
          </p>
          <div>
            <p>
              Wallet Address: {walletAddress}
            </p>
            
          </div>
        </div>
      
        <div className={styles.center}>
          
          <div className={styles.leftPart}>
            
              <div className={styles.displayData}>
              <div className={styles.gridContainer}>
                <Grid gap={12}>
                  <div>Data Name: {inputValue1}</div>
                  <div>Data Value: {inputValue2}</div>
                  <div>Slot : {inputValue3}</div>
                  <div>Token Amount: {inputValue4}</div>
                  </Grid>
              </div>
              </div>
              <div className={styles.imageContainer}>
            <Image
                  className = {styles.erc3525}
                  src={erc3525}
                  alt="erc3525"  
                  width={100}
                  height={100}
                  priority
                />
                </div>
          </div>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} className={styles.dataInput}>
          <GridItem>
            <FormControl>
              <FormLabel>Data Name</FormLabel>
              <Input value={inputValue1} onChange={handleInputChange1} 
              id="dataName"
              name="dataName"
              autoComplete="off"
              required
              className={styles.inputBox}
              />
            </FormControl>
            
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Data Value</FormLabel>
              <Input value={inputValue2} onChange={handleInputChange2} className={styles.inputBox}/>
             
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Slot</FormLabel>
              <Input value={inputValue3} onChange={handleInputChange3} type="number" className={styles.inputBox}/>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Token Amount</FormLabel>
              <Input value={inputValue4} onChange={handleInputChange4} type="number" className={styles.inputBox}/>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2} >
            <Button className={styles.submitButton} onClick={mint}>
            <>{minting ? <p>minting<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></p>: <p>Mint</p>}</>
             </Button>
        
            <>{minted ? <p>minted successfully!</p>: <p></p>}</>
          </GridItem>
        </Grid>

        </div>
        <div className={styles.center}>
          <div
            className={styles.card}
          >
            <h2 className={inter.className}>
              NFT Overview <span>-&gt;</span>
            </h2>
            <p>NFT Name: <span>{name} </span></p>
            <p>Total slot created: <span>{slotCountNum} </span></p>
            <p>Token Total Supply: {totalSupply}</p>
          </div>
          <div
            className={styles.card}
          >
            <h2 className={inter.className}>
              Manage NFT<span>-&gt;</span>
            </h2>
            <p>My Balance: {totalSupply}</p>
            <p>Split NFT 
              <div>
                <input className={styles.queryInput} placeholder="token id" 
                  value={splitId} onChange={handleInputSplitId}/> 
                <input className={styles.queryInput} placeholder="amount"
                  value={splitAmount} onChange={handleInputSplitAmount}/>
                <button className={styles.actionButton} onClick={split}>
                  <>{spliting ? <p>splitting<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></p>: <p>split</p>}</>
                </button> 
              </div>
            </p>
            <p>Merge NFT
              <div>
                <input className={styles.queryInput} placeholder="source id"
                value={mergeSrcId} onChange={handleInputMergeSrcId}/> 
                <input className={styles.queryInput} placeholder="target id"
                value={mergeTgtId} onChange={handleInputMergeTgtId}/> 
                <button className={styles.actionButton} onClick={merge}>
                <>{merging ? <p>merging<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></p>: <p>merge</p>}</>
                  </button>
              </div>
            </p>
          </div>

          <div
            className={styles.card}
          >
            <h2 className={inter.className}>
              NFT Status Query<span>-&gt;</span>
            </h2>
            
            <div>
              <p>Token Supply in Slot: {resqueryTokenSupplyId}
                <div>
                  <input className={styles.queryInput} placeholder="token id"
                  value={tokenSupplyId} onChange={handleInputTokenSupplyId}/> 
                  <button className={styles.actionButton} onClick={queryTokenSupplyId}>query</button> 
                </div>
              </p>
            </div>
            <div>
              <p>Slot of: {resquerySlotOfId}
                <div>
                  <input className={styles.queryInput} placeholder="token id"
                   value={slotOfId} onChange={handleInputSlotOfId}/> 
                  <button className={styles.actionButton} onClick={querySlotOfId}>query</button> 
                </div>
              </p>
            </div>     
          </div>
          
        </div>
        
      </main>
    </>
  )
}
