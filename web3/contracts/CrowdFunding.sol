// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        // target amount to acheive
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        // URL of the image
        string image;
        address[] donators;
        uint256[] donations;
    }

    // In Solidity, "mapping" is a data structure used to associate a key with a value. 
    // It's similar to a hash table or dictionary in other programming languages.
    mapping(uint256 => Campaign) public campaigns;
    
    uint256 public numberOfCampaigns = 0;

    // "public" keyword is visibility modifier, it specifies visibility of function
    // a function declared "public" can be called from outside the contract
    // and can be accessed by any other contract or externally owned account (EOA) 
    // on the Ethereum blockchain.
    // this func. returns ID of the created campaign
    function createCampaign(address _owner, string memory _title, string memory _description, 
    uint256 _target, uint256 _deadline , string memory _image) public returns (uint256){
    
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "Deadline should be a date in the future.")
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected =  0;
        campaign.image =_image;

        numberOfCampaigns++;

        return (numberOfCampaigns-1) ;

    }

    // The payable keyword indicates that this function can receive Ether. 
    // Users can send Ether to this function when they call it.
    // The amount of Ether (in Wei) sent with the transaction is accessible    
    // within the function via the msg.value variable.
    function donateToCampaign(uint256 _id) public payable {

    }

    function getDonators() {}

    function getCampaigns() {}
}