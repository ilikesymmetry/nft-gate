'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import ImageSvg from './svg/Image';
import OnchainkitSvg from './svg/OnchainKit';
import { useAccount, useReadContract } from 'wagmi';
import { erc721Abi, Hex } from 'viem';

export default function App() {
  const account = useAccount()
  const NFT = '0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a' // basenames
  const {data} = useReadContract({
    abi: erc721Abi, 
    address: NFT, 
    functionName: 'balanceOf', 
    args: [account?.address as Hex], 
    query: {
      enabled: !!account?.address
    }
  })

  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="w-1/3 mx-auto mb-6">
            <ImageSvg />
          </div>
          <div className="flex justify-center mb-6">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="dark:text-white text-black" />
            </a>
          </div>
          <div className="flex flex-col items-center">
                NFT balance: {data?.toString()}
          </div>
        </div>
      </main>
    </div>
  );
}
