# TRC10 Interface Wrapper for TRC20

The following declares a contract which when initialised wraps a given TRC10 token into its wrapped equivalent.

For Example to wrap BTT (Token ID: 1002000) it would look as follows:

```
pragma solidity >=0.4.22 <0.6.0;

import "./WrappedTRC10.sol";

contract WBTT is WrappedTRC10(
  "Wrapped BitTorrent",
  "WBTT",
  6,
  1002000
) {}
```
Deploy this contract on the network, take the contract address & parent token id, go to `src/wrapper-config.js` and declare your new wrapped token with the following format.

```
{
    token: "BTT",
    wrapped_token: "WBTT",
    tokenId: 1234,
    contractAddress: "0x212121212211221"
  }
```

This should automatically be pulled into the frontend, which you need to setup by:
```
yarn install
```

and to run the server (will automatically open) at `http://localhost:3000`

```
yarn run start
```

You can use this tool to wrap any TRC10 token into TRC20 and vice-versa. Hope you enjoy!

for questions email `harjyot7@gmail.com`