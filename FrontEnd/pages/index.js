import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, GOERLI_CONTRACT_ADDRESS, ARBITRUM_CONTRACT_ADDRESS, FUJI_CONTRACT_ADDRESS } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const [ens, setENS] = useState("");
  const [address, setAddress] = useState("");
  const web3ModalRef = useRef();

  let NFT_CONTRACT_ADDRESS;

  const setENSOrAddress = async (address, web3Provider) => {
    var _ens = await web3Provider.lookupAddress(address);

    if (_ens) {
      setENS(_ens);
    } else {
      setAddress(address);
    }
  };

  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await nftContract.mint({
        value: utils.parseEther("0.001"),
      });

      setLoading(true);
      const txReceipt = await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Punk Aliens! Transaction Hash: " + txReceipt.transactionHash);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const { chainId } = await web3Provider.getNetwork();
  
    if (chainId === 5) {
      NFT_CONTRACT_ADDRESS = GOERLI_CONTRACT_ADDRESS;
      await setENSOrAddress(address, web3Provider);
    }
    else if (chainId === 421613) {
      NFT_CONTRACT_ADDRESS = ARBITRUM_CONTRACT_ADDRESS;
      setAddress(address);
    }
    else if (chainId === 43113) {
      NFT_CONTRACT_ADDRESS = FUJI_CONTRACT_ADDRESS;
      setAddress(address);
    }
    else {
      window.alert("Change the network to Etherem / Arbitrum / Avalanche C-Chain");
      throw new Error("You are on wrong Network");
    }
    if (needSigner) {
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();

      getTokenIdsMinted();

      setInterval(async function () {
        await getTokenIdsMinted();
      }, 7 * 1000);
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }

    return (
      <button className={styles.button} onClick={publicMint}>
        Public Mint 🚀
      </button>
    );
  };

  return (
    <div>
      <Head>
        <title>Punk Aliens</title>
        <meta name="description" content="Punks-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Punk Aliens 👽 
            <b className={styles.ens}>{ens ? ens : address}!</b>
          </h1>
          <div className={styles.description}>
            It&#39;s an NFT collection of Punk Aliens.
          </div>
          <div className={styles.description}>
            <b className={styles.ens}>{tokenIdsMinted}</b>/50 have been minted
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./1.jpg" />
        </div>
      </div>

      <footer className={styles.footer}>Made with <b className={styles.ens}> &#10084; </b> by Meharab</footer>
    </div>
  );
}
