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

And that's all.