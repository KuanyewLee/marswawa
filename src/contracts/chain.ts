import Web3 from "web3";

export const TestMode = true;

export const MainChainId = 1;
export const MainAddress = "";
// export const TestChainId = 1337
// export const TestAddress = "0xb9c4259dCAa3688DE5de8E1B5a23fdB824fca14a";
export const TestChainId = 80001;
export const TestAddress = "0xF8759b8575cbFEee5667094B032384c3c326eE7f";
export const ChainId = TestMode ? TestChainId : MainChainId;
export const Address = TestMode ? TestAddress : MainAddress;

// @ts-ignore
export const ethereum = window["ethereum"] || undefined;
export const web3 = new Web3(ethereum);

export type Chain = {
  chainId: string,
  chainName: string,
  rpcUrls: string[],
  blockExplorerUrls: string[],
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number
  }
}

export const MainChainDetail = {
  chainId: web3.utils.toHex(MainChainId),
  chainName: 'Ethereum',
  rpcUrls: ['https://mainnet.infura.io/v3/'],
  blockExplorerUrls: ['https://etherscan.io'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  }
}
export const TestChainDetail: Chain = {
  chainId: web3.utils.toHex(TestChainId),
  chainName: 'Mumbai',
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
  blockExplorerUrls:['https://mumbai.polygonscan.com/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  }
}
// export const TestChainDetail: Chain = {
//   chainId: web3.utils.toHex(TestChainId),
//   chainName: 'LocalTestnet',
//   rpcUrls: ['http://127.0.0.1:7545/'],
//   blockExplorerUrls:[''],
//   nativeCurrency: {
//     name: 'ETH',
//     symbol: 'ETH',
//     decimals: 18,
//   }
// }

export const ChainDetail = TestMode ? TestChainDetail : MainChainDetail

