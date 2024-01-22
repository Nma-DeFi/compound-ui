import { parseAbi } from "viem";

export const cometAbi = parseAbi([
    'event Supply(address indexed from, address indexed dst, uint256 amount)',
    'function supply(address asset, uint amount)',
    'function withdraw(address asset, uint amount)',
    'function balanceOf(address account) returns (uint256)',
    'function borrowBalanceOf(address account) returns (uint256)',
    'function collateralBalanceOf(address account, address asset) external view returns (uint128)',
    'function getPrice(address priceFeed) public view returns (uint)',
    'function decimals() external view returns (uint8)'
]);
