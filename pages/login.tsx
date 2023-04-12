import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Login.module.css";


const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


const Home: NextPage = () => {
  const { program } = useProgram(
    "7DmkGzdsBpL1QpbwCpZhjvRzCiVY27hBZhwgn7wD8Ah1",
    "nft-drop"
  );

  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  const {data: conditions, isLoading:conditionsIsLoading}= useClaimConditions(program);
  const {data: metadata, isLoading:metadataIsLoading}= useProgramMetadata(program);
  const {publicKey}= useWallet();
    

  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconContainer}>
          <Image
           className={styles.solloto}
            src="/SOLLOTOnobg.png"
            height={175}
            width={150}
            style={{
              objectFit: "contain",
            }}
            alt="Solloto"
          />
        </div>
        <div className={styles.wallet}>
          <WalletMultiButtonDynamic />
        </div>
      </header>

      <div className={styles.container}>
        <h1 className={styles.h1}>
          Unlock your luck with the highest winning chances on Loto Quine!
        </h1>
        <br />
        <Image
          src="/lotto.png"
          height={375}
          width={715}
          style={{
            objectFit: "contain",
          }}
          alt="loto"
        />{" "}
        <br />
        <br />
        {!publicKey ? <p>Connect your Wallet.</p> : <> 

        <p>
          Claimed : {conditions?.claimedSupply}/
          {conditions?.totalAvailableSupply}
        </p>
        <div>
          <button className={styles.btn} onClick={() => {}}>
            Login
          </button>
        </div>
        <p>You Can Access only if you own a Solloto Ticket.</p>

        <button
          className={styles.mb}
          disabled={isLoading}
          onClick={async () => {
            try {
              await claim({ amount: 1 });
              console.log("Claim Successful");
            } catch (err) {
              console.log(
                "User rejected the request or Wallet is not connected"
              );
            }
          }}
        >
          Claim a Ticket
        </button>
        </>
        }</div>
    </>
  
  );
};


export default Home;
