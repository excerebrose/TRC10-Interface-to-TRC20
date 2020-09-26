pragma solidity >=0.4.22 <0.6.0;

import "./ITRC20.sol";

contract WrappedTRC10 is ITRC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    trcToken public trcTokenId;

    uint256 private totalSupply_;
    mapping(address => uint256) private  balanceOf_;
    mapping(address => mapping(address => uint)) private  allowance_;
    
    event  Deposit(address indexed dst, uint256 sad);
    event  Withdrawal(address indexed src, uint256 sad);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _trcTokenId) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        trcTokenId = trcToken(_trcTokenId);
    }

    function() external payable {
        deposit();
    }

    function deposit() public payable {
        require(msg.tokenid == trcTokenId, "deposit tokenId incorrect");
        // tokenvalue is long value
        balanceOf_[msg.sender] += msg.tokenvalue;
        totalSupply_ += msg.tokenvalue;
        emit Transfer(address(0x00), msg.sender, msg.tokenvalue);
        emit Deposit(msg.sender, msg.tokenvalue);
    }

    function withdraw(uint256 sad) public {
        require(balanceOf_[msg.sender] >= sad, "not enough Token balance");
        require(totalSupply_ >= sad, "not enough Token totalSupply");
        balanceOf_[msg.sender] -= sad;
        totalSupply_ -= sad;
        msg.sender.transferToken(sad, trcTokenId);

        emit Transfer(msg.sender, address(0x00), sad);
        emit Withdrawal(msg.sender, sad);
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address guy) public view returns (uint256){
        return balanceOf_[guy];
    }

    function allowance(address src, address guy) public view returns (uint256){
        return allowance_[src][guy];
    }

    function approve(address guy, uint256 sad) public returns (bool) {
        allowance_[msg.sender][guy] = sad;
        emit Approval(msg.sender, guy, sad);
        return true;
    }

    function approve(address guy) public returns (bool) {
        return approve(guy, uint256(- 1));
    }

    function transfer(address dst, uint256 sad) public returns (bool) {
        return transferFrom(msg.sender, dst, sad);
    }

    function transferFrom(address src, address dst, uint256 sad)
    public returns (bool)
    {
        require(balanceOf_[src] >= sad, "src balance not enough");

        if (src != msg.sender && allowance_[src][msg.sender] != uint256(- 1)) {
            require(allowance_[src][msg.sender] >= sad, "src allowance is not enough");
            allowance_[src][msg.sender] -= sad;
        }
        balanceOf_[src] -= sad;
        balanceOf_[dst] += sad;

        emit Transfer(src, dst, sad);
        return true;
    }
}


