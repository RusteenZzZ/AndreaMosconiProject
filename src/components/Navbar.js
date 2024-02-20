// import fullLogo from '../full_logo.png';
import fullLogo from "../test.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Factoryabi from "../factory.json";
import address from "./Address";
import "../App.css";

function Navbar() {
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");
  const [ArtistFetched, updateArtistFetched] = useState(false);
  const [ifArtistAllowed, updateIfArtistAllowed] = useState(false);

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    if(currAddress === "0x")
    {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x13881") {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      }
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          updateButton();
          getAddress();
          window.location.replace(location.pathname);
        });
    }
  }

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      // MetaMask is not installed or not connected
      // Handle this case or display an error message
      // alert("Add MetaMask Extension!");
      return;
    }  
    let val = window.ethereum.isConnected();
    if (val) {
      getAddress();
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  useEffect(() => {
    const myElement = document.getElementById("navbar-sticky");
    myElement.classList.remove("hidden");
  });

  async function IsAllowedArtistOrNOT(tokenId) {
    const FactortAddressTemp= address;
    const ethers = require("ethers");
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider._isProvider) {
        console.log("Provider");
      }
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );
      let SETTING = await contract_factory.isArtistAllowed(
        ethers.utils.getAddress(addr)
      );
      updateIfArtistAllowed(SETTING);
      updateArtistFetched(true);
    } catch (err) {
      // console.log("Errorr:", err);
    }
  }
  if (!ArtistFetched) IsAllowedArtistOrNOT();

  return (
    <>
      <div className="navbarCustom">
        <nav
          className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
          style={{ backgroundColor: "white" }}
        >
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="flex items-center">
              <img src={fullLogo} alt="Logo" className="mr-3 h-6 sm:h-9" />
              <span className="self-center text-xl whitespace-nowrap text-black font-face-mk">
                NFT Marketplace
              </span>
            </a>
            <div
              className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul
                className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                style={{ backgroundColor: "transparent" }}
              >
                <li>
                  <a
                    href="/"
                    className="block py-2 pr-4 pl-3 text-black-700 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black dark:text-black-400 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700 font-face-mt"
                  >
                    {" "}
                    <Link to="/">Marketplace</Link>
                  </a>
                </li>
                {ifArtistAllowed ?
                (<><li>
                  <a
                    href="/sellNFT"
                    className="block py-2 pr-4 pl-3 text-black-700 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black dark:text-black-400 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700 font-face-mt"
                  >
                    Create NFT
                  </a>
                </li></>):(<></>)}
                
                <li>
                  <a
                    href="/profile"
                    className="block py-2 pr-4 pl-3 text-black-700 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black dark:text-black-400 dark:hover:bg-gray-700 dark:hover:text-whitemd:dark:hover:bg-transparent dark:border-gray-700 font-face-mt"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/explore"
                    className="block py-2 pr-4 pl-3 text-black-700 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black dark:text-black-400 dark:hover:bg-gray-700 dark:hover:text-whitemd:dark:hover:bg-transparent dark:border-gray-700 font-face-mt"
                  >
                    Explore
                  </a>
                </li>
                {/* <li>
                  <a
                    href="/admin"
                    className="block py-2 pr-4 pl-3 text-black-700 rounded hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black dark:text-black-400 dark:hover:bg-black-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-black-700 font-face-mt"
                  >
                    {" "}
                    <Link to="/admin">Admin</Link>
                  </a>
                </li> */}
                <li style={{ display: "grid" }}>
                  <button
                    className="enableEthereumButton bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded text-sm"
                    onClick={connectWebsite}
                  >
                    {currAddress !== "0x" ? "Connected" : "Connect Wallet"}
                  </button>
                  {currAddress !== "0x"
                    ? "Connected to"
                    : "Not Connected. Please login to view NFTs"}{" "}
                  {currAddress !== "0x"
                    ? currAddress.substring(0, 15) + "..."
                    : ""}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
