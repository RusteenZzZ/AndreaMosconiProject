import * as React from "react";
import Grid from "@mui/material/Grid";
import Factoryabi from "../factory.json";
import Navbar from "./Navbar";
import { useState } from "react";
import Footer from "./Footer";
import address from "./Address";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Explore() {
  const navigate = useNavigate();
  const [data, updateData] = useState([]);
  const [collectiondata, updateCollectionData] = useState([]);
  const [ArtistAddress, updateArtistData] = useState([]);
  const [preArtistAddress, updatepreArtistData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [dataFetched2, updateFetched2] = useState(false);
  const FactortAddressTemp= address;
  async function get_all_collection(e) {
    const ethers = require("ethers");
      let provider=null;
      let signer=null;
      if(window.ethereum)
      {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
      }
      else
      {
        provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');
        signer = new ethers.Wallet("ac0472481b7a23f89fbc462fcd7f9d16193594001f5f33bce9bf5b3217d1de35", provider);
      }

      //Pull the deployed contract instance
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );




      // let GETALLArtsits = await contract_factory.getallartists();
      // await Promise.all(
      //   GETALLArtsits.map(async (i) => {
      //     if (i !== "0x0000000000000000000000000000000000000000") {
      //       let NFT_Collection = await contract_factory.getartistdescription(
      //         ethers.utils.getAddress(i)
      //       );
      //       const item = {
      //         artist_info:NFT_Collection.artist_info,
      //         artist_name:NFT_Collection.artist_name, 
      //         profile_image_uri:NFT_Collection.profile_image_uri, 
      //         user_banner_uri:NFT_Collection.user_banner_uri, 
      //         website: NFT_Collection.website,
      //         artitst_address: i,
      //       }
      //       preArtistAddress.unshift(item);
      //       return;
      //     }
      //   })
      // );
      // const filteredArr = preArtistAddress.reduce((acc, current) => {
      //   const x = acc.find((item) => item.artist_name === current.artist_name);
  
      //   if (!x) {
      //     return acc.concat([current]);
      //   } else {
      //     return acc;
      //   }
      // }, []);
      // updateArtistData(filteredArr);
      // updatepreArtistData(filteredArr);









      let Address_Collection =
        await contract_factory.getAllcollection_address();

      //Fetch all the details of every NFT from the contract and display
      await Promise.all(
        Address_Collection.map(async (y) => {
          if (y !== "0x0000000000000000000000000000000000000000") {
            let NFT_Collection = await contract_factory.getcollectiondescription(
              ethers.utils.getAddress(y)
            );
            const item = {
              category: NFT_Collection.category,
              // collectionId: NFT_Collection.collectionId,
              collection_URL: NFT_Collection.collection_URL,
              collection_address: NFT_Collection.collection_address,
              collection_banner: NFT_Collection.collection_banner,
              collection_description: NFT_Collection.collection_description,
              collection_image: NFT_Collection.collection_image,
              collection_name: NFT_Collection.collection_name,
              creator: NFT_Collection.creator,
            }
            data.unshift(item);
            return;
          }

          updateFetched(true);
        })
      );
      const filteredArr = data.reduce((acc, current) => {
        const x = acc.find((item) => item.collection_name === current.collection_name);
  
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      updateCollectionData(filteredArr);
      updateData(filteredArr);
    return;
  }
  if (!dataFetched) get_all_collection();

  async function get_all_address(e) {
    const ethers = require("ethers");
    let provider=null;
    let signer=null;
    if(window.ethereum)
    {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    }
    else
    {
      provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');
      signer = new ethers.Wallet("ac0472481b7a23f89fbc462fcd7f9d16193594001f5f33bce9bf5b3217d1de35", provider);
    }
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let GETALLArtsits = await contract_factory.getallartists();
    await Promise.all(
      GETALLArtsits.map(async (i) => {
        if (i !== "0x0000000000000000000000000000000000000000") {
          let NFT_Collection = await contract_factory.getartistdescription(
            ethers.utils.getAddress(i)
          );
          const item = {
            artist_info:NFT_Collection.artist_info,
            artist_name:NFT_Collection.artist_name, 
            profile_image_uri:NFT_Collection.profile_image_uri, 
            user_banner_uri:NFT_Collection.user_banner_uri, 
            website: NFT_Collection.website,
            artitst_address: i,
          }
          preArtistAddress.unshift(item);
          return;
        }
      })
    );
    const filteredArr = preArtistAddress.reduce((acc, current) => {
      const x = acc.find((item) => item.artist_name === current.artist_name);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    updateArtistData(filteredArr);
    updatepreArtistData(filteredArr);
    updateFetched2(true);
  }
  if (!dataFetched2) get_all_address();

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectOption = (e) => {
    if (e.keyCode === 13) {
      navigate('/explore/Collections/');
    }
  };

  const handleSelectOptionValue = (option) => {
      navigate("/NFT_Creator_Collection/" + option.creator+"/"+option.collection_address)
  };

  const [searchCreatorQuery, setSearchCreatorQuery] = useState('');

  const handleCreatorInputChange = (e) => {
      setSearchCreatorQuery(e.target.value);
  };

  const handleCreatorSelectOption = (e) => {
    if (e.keyCode === 13) {
      navigate('/explore/Creator/');
    }

  };

  const handleCreatorSelectOptionValue = (option) => {
    navigate("/NFT_Creator/" + option.artitst_address, { state: { collectionAddress: "N/A" } });
  };

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Navbar></Navbar>
      <div
        className="container mx-auto MarketPlacePage"
        style={{ padding: "0px 0px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1
              style={{
                display: "block",
                fontSize: "1.5em",
                fontWeight: "600",
                fontFamily: "Mak",
              }}
            >
              Collections
            </h1>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div  className="relative">
              <input
                type="text"
                placeholder="Search for a collection..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleSelectOption}
              />
              {searchQuery.length > 0 && (
                <div className="absolute top-10 left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  {collectiondata.map((option,index) => (
                    <div key={index}>
                      {option.collection_name.toLowerCase().includes(searchQuery.toLowerCase()) ?
                        <div
                          key={option.collection_name}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => handleSelectOptionValue(option)}
                        >
                        {option.collection_name}
                        </div>:<></>
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ paddingBottom: "40px" }}
          >
            {(collectiondata) ? (
              <>
                {collectiondata.map((value, index) => {
                  return  <Link 
                  to={"/NFT_Creator_Collection/" + value.creator+"/"+value.collection_address} key={index}><div
                    style={{
                      display: "inline-flex",
                      marginLeft: "10px",
                      verticalAlign: "top",
                    }}
                    className="grid grid-cols-3 mt-8"
                    key={index}
                  >
                    {(value.collection_name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0) ?
                      <div className="max-w-sm rounded overflow-hidden shadow-lg">
                      <div>
                        <img
                          className="w-full"
                          src={value.collection_image ? value.collection_image.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.collection_image.split("/")[2]: value.collection_image:'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/'}
                          alt="NO COLLECTION IMAGE FOUND"
                          style={{
                            maxWidth: "300px",
                            maxHeight: "300px",
                            width: "280px",
                            height: "250px",
                            marginRight: "auto",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      <div className="px-6 py-4">
                        <div className="font-face-mk text-xl mb-2">{value.collection_name}</div>
                      </div>
                    </div>:<></>
                    }
                    
                  </div>
                  </Link>
                })}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1
              style={{
                display: "block",
                fontSize: "1.5em",
                fontWeight: "600",
                fontFamily: "Mak",
              }}
            >
              Creators
            </h1>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for an Creator..."
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={searchCreatorQuery}
              onChange={handleCreatorInputChange}
              onKeyDown={handleCreatorSelectOption}
            />
            {searchCreatorQuery.length > 0 && (
              <div className="absolute top-10 left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                {ArtistAddress.map((option,index) => (
                  <div key={index}>
                  {option.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ?
                    <div
                      key={option.artist_name}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => handleCreatorSelectOptionValue(option)}
                    >
                    {option.artist_name}
                    </div>:<></>
                  }
                  </div>
                ))}
              </div>
            )}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ paddingBottom: "40px" }}
          >
                {(ArtistAddress) ? (
                  <>
                    {ArtistAddress.map((value, index) => {
                      return <Link key={index}
                      to={"/NFT_Creator/" + value.artitst_address} state={{ collectionAddress: "N/A" }}><div
                        style={{
                          display: "inline-flex",
                          marginLeft: "10px",
                          verticalAlign: "top",
                        }}
                        className="grid grid-cols-3 mt-8"
                      >
                        {(value.artist_name.toLowerCase().includes(searchCreatorQuery.toLowerCase()) && searchCreatorQuery.length > 0) ?
                          <div className="max-w-sm rounded overflow-hidden shadow-lg">
                          <div>
                            <img
                              className="w-full"
                              src={value.profile_image_uri ? value.profile_image_uri.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.profile_image_uri.split("/")[2]: value.profile_image_uri:'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/'}
                              alt="NO COLLECTION IMAGE FOUND"
                              style={{
                                maxWidth: "300px",
                                maxHeight: "300px",
                                width: "280px",
                                height: "250px",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                            />
                          </div>
                          <div className="px-6 py-4">
                            <div className="font-face-mk text-xl mb-2">{value.artist_name}</div>
                          </div>
                        </div>:<></>
                        }
                        
                      </div>
                      </Link>
                    })}
                  
                  </>
                ) : (
                  <></>
                )}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
