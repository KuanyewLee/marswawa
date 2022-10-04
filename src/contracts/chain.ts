import Web3 from "web3";

export const TestMode = false;

export const MainChainId = 1;
export const TestChainId = 1337;
export const ChainId = TestMode ? TestChainId : MainChainId;

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

export const TestChainDetail: Chain = {
  chainId: web3.utils.toHex(TestChainId),
  chainName: 'LocalTestnet',
  rpcUrls: ['http://127.0.0.1:7545/'],
  blockExplorerUrls:[''],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
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

export const ChainDetail = TestMode ? TestChainDetail : MainChainDetail

