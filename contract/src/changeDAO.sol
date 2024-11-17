// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChangeDAO {
    struct Petition {
        string heading;
        string story;
        string imageURL;
        uint256 signatureCount;
        uint256 targetSignatures;
        bool isVictory;
        address payable donationAddress;
        uint256 donationAmount;
        address creator;
        bool exists;
    }

    mapping(uint256 => Petition) public petitions;
    

    mapping(uint256 => mapping(address => bool)) public hasSigned;
    

    mapping(address => uint256[]) public userPetitions;
    
    uint256 public petitionCount;
    
    event PetitionCreated(uint256 indexed petitionId, address indexed creator);
    event PetitionSigned(uint256 indexed petitionId, address indexed signer);
    event PetitionVictory(uint256 indexed petitionId);
    event DonationReceived(uint256 indexed petitionId, address indexed donor, uint256 amount);

    modifier petitionExists(uint256 _petitionId) {
        require(petitions[_petitionId].exists, "Petition does not exist");
        _;
    }

    modifier onlyPetitionCreator(uint256 _petitionId) {
        require(petitions[_petitionId].creator == msg.sender, "Only petition creator can perform this action");
        _;
    }

    function createPetition(
        string memory _heading,
        string memory _story,
        string memory _imageURL,
        uint256 _targetSignatures,
        address payable _donationAddress
    ) public returns (uint256) {
        require(bytes(_heading).length > 0, "Heading cannot be empty");
        require(_targetSignatures > 0, "Target signatures must be greater than 0");
        require(_donationAddress != address(0), "Invalid donation address");

        uint256 petitionId = petitionCount;
        
        Petition storage petition = petitions[petitionId];
        petition.heading = _heading;
        petition.story = _story;
        petition.imageURL = _imageURL;
        petition.targetSignatures = _targetSignatures;
        petition.donationAddress = _donationAddress;
        petition.creator = msg.sender;
        petition.exists = true;

        userPetitions[msg.sender].push(petitionId);
        
        emit PetitionCreated(petitionId, msg.sender);
        
        petitionCount++;
        return petitionId;
    }

    function signPetition(uint256 _petitionId) public petitionExists(_petitionId) {
        require(!hasSigned[_petitionId][msg.sender], "Already signed this petition");
        require(!petitions[_petitionId].isVictory, "Petition already marked as victory");

        petitions[_petitionId].signatureCount++;
        hasSigned[_petitionId][msg.sender] = true;
        
        emit PetitionSigned(_petitionId, msg.sender);
    }

    function markAsVictory(uint256 _petitionId) 
        public 
        petitionExists(_petitionId)
        onlyPetitionCreator(_petitionId) 
    {
        require(!petitions[_petitionId].isVictory, "Petition already marked as victory");
        
        petitions[_petitionId].isVictory = true;
        emit PetitionVictory(_petitionId);
    }

    function donate(uint256 _petitionId) public payable petitionExists(_petitionId) {
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(!petitions[_petitionId].isVictory, "Cannot donate to completed petition");

        petitions[_petitionId].donationAmount += msg.value;
        (bool sent, ) = petitions[_petitionId].donationAddress.call{value: msg.value}("");
        require(sent, "Failed to send donation");

        emit DonationReceived(_petitionId, msg.sender, msg.value);
    }

    // View functions
    function getPetition(uint256 _petitionId) 
        public 
        view 
        petitionExists(_petitionId)
        returns (
            string memory heading,
            string memory story,
            string memory imageURL,
            uint256 signatureCount,
            uint256 targetSignatures,
            bool isVictory,
            address donationAddress,
            uint256 donationAmount,
            address creator
        ) 
    {
        Petition storage petition = petitions[_petitionId];
        return (
            petition.heading,
            petition.story,
            petition.imageURL,
            petition.signatureCount,
            petition.targetSignatures,
            petition.isVictory,
            petition.donationAddress,
            petition.donationAmount,
            petition.creator
        );
    }

    function getUserPetitions(address _user) public view returns (uint256[] memory) {
        return userPetitions[_user];
    }

    function getPetitionSignatureStatus(uint256 _petitionId, address _user) 
        public 
        view 
        returns (bool) 
    {
        return hasSigned[_petitionId][_user];
    }
}