import Web3 from "web3";
export const TestMode = true;
export const MainChainId = 1;
export const TestChainId = 1337;
export const ChainId = TestMode ? TestChainId : MainChainId;
// @ts-ignore
export const ethereum = window["ethereum"] || undefined;
export const web3 = new Web3(ethereum);
export const TestChainDetail = {
    chainId: web3.utils.toHex(TestChainId),
    chainName: 'LocalTestnet',
    rpcUrls: ['http://127.0.0.1:7545/'],
    blockExplorerUrls: [''],
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    }
};
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
};
export const ChainDetail = TestMode ? TestChainDetail : MainChainDetail;
