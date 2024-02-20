// require('dotenv').config();
const key = "89af0550b907b5b01771";
const secret = "2249dde61b0f06476409e5a06f38cf54713ea304396a41e12f1be60ea67ad539";
const JWT ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MTRhMGZiZS03NzE2LTQ5NGQtYTUzYS0xOTc1MWIxNmI0MWIiLCJlbWFpbCI6ImFuZHJlYW1vc2NvbmlAbGl2ZS5pdCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4OWFmMDU1MGI5MDdiNWIwMTc3MSIsInNjb3BlZEtleVNlY3JldCI6IjIyNDlkZGU2MWIwZjA2NDc2NDA5ZTVhMDZmMzhjZjU0NzEzZWEzMDQzOTZhNDFlMTJmMWJlNjBlYTY3YWQ1MzkiLCJpYXQiOjE2ODg0NzIwOTJ9.k07rqP22BaQ2h2JjzptKygvnjVkCmn56In9wkE6u4hg"; 
const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
                "Authorization": JWT
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "ipfs://" +  response.data.IpfsHash
            //    pinataURL: "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);
    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                // pinata_api_key: key,
                // pinata_secret_api_key: secret,
                Authorization: JWT
            }
        })
        .then(function (response) {
            return {
               success: true,
               pinataURL: "ipfs://" + response.data.IpfsHash
            //    pinataURL: "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const EncodeIPFS = async(metadataURL) => {
    if(metadataURL.split("/")[3] === 'ipfs')
    {
        const Hash = metadataURL.split("/")[4];
        const IPFSHash = 'ipfs://' + Hash;
        return IPFSHash;
    }
    else
    {
        const IPFSHash = metadataURL;
        return IPFSHash;
    }

}

export const DecodeIPFS = async(IPFSHash) => {
    if(IPFSHash.split("/")[1] === 'ipfs')
    {
        const IPFS = IPFSHash.split("/")[3];
        const MetaURL = 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + IPFS;
        return MetaURL;
    }
    else
    {
        return IPFSHash;
    }

}