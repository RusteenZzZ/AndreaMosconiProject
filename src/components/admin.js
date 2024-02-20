import Navbar from "./Navbar";
import Factoryabi from "../factory.json";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import address from "./Address";
import "../App.css";

export default function Admin() {
  const [dataFetched, updateFetched] = useState(false);
  const [ArtistAddress,setArtistAddress] = useState([]);
  const [List_price_array] = useState([]);
  const [ArtistFetched, updateArtistFetched] = useState(false);
  const [ifArtistAllowed, updateIfArtistAllowed] = useState(false);
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  const FactortAddressTemp= address;
  // const addr = await signer.getAddress();
  let contract = new ethers.Contract(
    FactortAddressTemp,
    Factoryabi,
    signer
  );

  async function getAnArtistData() {
    // const addr = await signer.getAddress();
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let GETALLArtsits = await contract_factory.getallartists();
    let j=[];
    await Promise.all(
      GETALLArtsits.map(async (i) => {
        if (i !== "0x0000000000000000000000000000000000000000") {
          j.push(i);
        }
      })
    );
    setArtistAddress(j);

    let category = ["Artwork", "Desgin Masterpeice", "Interior Designs"];
    await Promise.all(
      category.map(async (i) => {
        let y = await contract_factory.getListPrice(i);
        List_price_array.push(y.toString());
      })
    );
    updateFetched(true);
  }
  if (!dataFetched) getAnArtistData();
  const [formParams, updateFormParams] = useState({
    AddressArtist: "",
  });

  const [RemoveArtistformParams, updateRemoveArtistFormParams] = useState({
    AddressArtist: "",
  });
  const [onlyOwner, updateOwnerOnly] = useState();
  async function SetArtist(e) {
    e.preventDefault();
    const { AddressArtist } = formParams;
    if (!AddressArtist) return;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    //actually Set The Artist
    let SETTING = await contract.setanartists(
      ethers.utils.getAddress(AddressArtist.toString())
    );
    await SETTING.wait();
    updateFormParams({ AddressArtist: "" });
    window.location.replace("/");
  }

  async function RemoveArtist(e) {
    e.preventDefault();
    const { AddressArtist } = RemoveArtistformParams;
    if (!AddressArtist) return;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    //actually Set The Artist
    let SETTING = await contract.removeAnArtist(
      ethers.utils.getAddress(AddressArtist.toString())
    );
    await SETTING.wait();
    updateFormParams({ AddressArtist: "" });
    window.location.replace("/");
  }

  const [ChangeOwnerformParams, updateChangeOwnerformParams] = useState({
    ChangeOwner: "",
  });
  async function ChangeOwner(e) {
    e.preventDefault();
    const { ChangeOwner } = ChangeOwnerformParams;
    if (!ChangeOwner) return;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    //actually Set The Artist
    let SETTING = await contract.changeOwner(
      ethers.utils.getAddress(ChangeOwner.toString())
    );
    await SETTING.wait();
    updateFormParams({ ChangeOwner: "" });
    window.location.replace("/");
  }

  const [listformParams, updateListFormParams] = useState({
    List_price: "",
    Select_category: "",
  });

  async function Update_LISTPRICES(e) {
    e.preventDefault();
    let { List_price, Select_category } = listformParams;
    if (List_price.includes(".")) {
      let length = List_price.split(".")[1].length;
      List_price = List_price.split(".")[0] + List_price.split(".")[1];

      List_price = List_price + "000000000000000000".slice(length);
    } else {
      List_price = List_price + "000000000000000000";
    }
    if (!List_price || !Select_category) return;
    let SETTING = await contract
      .update_listprice(
        ethers.BigNumber.from(List_price).toBigInt(),
        Select_category.toString()
      )
      .catch((err) => {
        updateOwnerOnly(err);
      });
    await SETTING.wait();
    updateListFormParams({
      List_price: "",
      Select_category: "",
    });
    window.location.replace("/");
  }
  const handleSelect = (e) => {
    updateListFormParams({
      ...listformParams,
      Select_category: e.target.value,
    });
  };

  async function IsAllowedArtistOrNOT(tokenId) {
    const ethers = require("ethers");
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider._isProvider) {
        console.log("Provider:", provider._isProvider);
      }
      const signer = provider.getSigner();
      const addr = await signer.getAddress(); 
      let contract = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );
      let SETTING = await contract.getOwner();
      if (SETTING.toString() === addr.toString()) {
        updateIfArtistAllowed(true);
      } else {
        updateIfArtistAllowed(false);
      }
      updateArtistFetched(true);
    } catch (err) {
      // console.log("Errorr:", err);
    }
  }
  if (!ArtistFetched) IsAllowedArtistOrNOT();
  return (
    <div className="profileClass">
      <Navbar></Navbar>
      {/* {ifArtistAllowed ? ( */}
        <>
          <div
            className="container mx-auto ProfilePage"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <h1
                  style={{
                    display: "block",
                    fontSize: "2.5em",
                    fontWeight: "600",
                    fontFamily: "Mak",
                  }}
                >
                  Set Artist
                </h1>
                <form>
                  <div>
                    <input
                      className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="ArtistAddress"
                      type="text"
                      placeholder="Address"
                      onChange={(e) =>
                        updateFormParams({
                          ...formParams,
                          AddressArtist: e.target.value,
                        })
                      }
                      value={formParams.AddressArtist}
                    ></input>
                  </div>
                  <div>
                    <button
                      onClick={SetArtist}
                      className="mt-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                    >
                      Set Artist
                    </button>
                  </div>
                </form>
                <h1
                  style={{
                    display: "block",
                    fontSize: "2.5em",
                    fontWeight: "600",
                    fontFamily: "Mak",
                    paddingTop: "15px",
                  }}
                >
                  Remove Artist
                </h1>
                <form>
                  <div>
                    <input
                      className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="ArtistAddress"
                      type="text"
                      placeholder="Address"
                      onChange={(e) =>
                        updateRemoveArtistFormParams({
                          ...RemoveArtistformParams,
                          AddressArtist: e.target.value,
                        })
                      }
                      value={RemoveArtistformParams.AddressArtist}
                    ></input>
                  </div>
                  <div>
                    <button
                      onClick={RemoveArtist}
                      className="mt-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                    >
                      Remove Artist
                    </button>
                  </div>
                </form>
                <h1
                  style={{
                    display: "block",
                    fontSize: "2.5em",
                    fontWeight: "600",
                    fontFamily: "Mak",
                    paddingTop: "15px",
                  }}
                >
                  Change Admin
                </h1>
                <form>
                  <div>
                    <input
                      className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="ArtistAddress"
                      type="text"
                      placeholder="Address"
                      onChange={(e) =>
                        updateChangeOwnerformParams({
                          ...ChangeOwnerformParams,
                          ChangeOwner: e.target.value,
                        })
                      }
                      value={ChangeOwnerformParams.ChangeOwner}
                    ></input>
                  </div>
                  <div>
                    <button
                      onClick={ChangeOwner}
                      className="mt-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                    >
                      Change Owner
                    </button>
                  </div>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <h1
                  style={{
                    display: "block",
                    fontSize: "2.5em",
                    fontWeight: "600",
                    fontFamily: "Mak",
                  }}
                >
                  Update Listprice
                </h1>
                <form>
                  <div>
                    <input
                      className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="List_price"
                      placeholder="Set List Price"
                      onChange={(e) => {
                        updateListFormParams({
                          ...listformParams,
                          List_price: e.target.value,
                        });
                      }}
                      value={listformParams.List_price}
                    ></input>
                  </div>
                  <div className="mt-4  mb-4">
                    <label
                      style={{
                        padding: "10px 20px 10px 0px",
                        color: "rgb(109, 117, 125)",
                      }}
                    >
                      Select Category
                    </label>
                    <select
                      className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleSelect}
                    >
                      <option value="">Select Category</option>
                      <option value="Artwork">Artwork</option>
                      <option value="Design Masterpieces">
                        Design Masterpiece
                      </option>
                      <option value="Interior Designs">Interior Designs</option>
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={Update_LISTPRICES}
                      className="mt-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                    >
                      Update LISTPRICE
                    </button>
                  </div>
                  <div>
                    {onlyOwner ? (
                      <h2 style={{ color: "red" }}>
                        Only Owners Can Update List Price
                      </h2>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                Artist Address
                {ArtistAddress.map((value) => {
                  return (
                    <div>
                      <p key={value}>{value}</p>
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </>
      {/* ) : (
        <div style={{padding:'50px'}}>You are not an Admin</div>
      )} */}
    </div>
  );
}
