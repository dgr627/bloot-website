import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import "./styles.css";
import { FaXTwitter } from "react-icons/fa6";

const TOKEN_ADDRESS = "0xEf9fc2fa22F8c0EF8bcE8415fc7527448919b633";
const DEX_URL = "https://app.uniswap.org/swap?outputCurrency=0xEf9fc2fa22F8c0EF8bcE8415fc7527448919b633&chain=base";

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState("...");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const address = accounts[0];
    setWallet({ provider, address });
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet) return;
      const contract = new ethers.Contract(TOKEN_ADDRESS, ABI, wallet.provider);
      const raw = await contract.balanceOf(wallet.address);
      const dec = await contract.decimals();
      const sym = await contract.symbol();
      setSymbol(sym);
      setBalance(ethers.formatUnits(raw, dec));
    };
    fetchBalance();
  }, [wallet]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Baloo Sploot ($BLOOT)</h1>

      <div style={styles.iconRow}>
        <a href="https://x.com/Baloo_Sploot" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
          <FaXTwitter size={28} />
        </a>
        <a href="https://discord.gg/dcttFhX2Tr" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
          <FaDiscord size={28} />
        </a>
      </div>

      <div style={styles.buttonRow}>
        <button onClick={connectWallet} style={styles.connectButton}>
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <button onClick={() => window.open(DEX_URL, "_blank")} style={styles.buyButton}>
          Buy on Uniswap
        </button>
      </div>

      {
      <div style={styles.chartWrapper}>
        <iframe
          src="https://www.geckoterminal.com/base/pools/0xYOURPOOLADDRESS"
          height="400"
          width="100%"
          style={{ border: "none", borderRadius: "12px", marginTop: "40px" }}
          title="BLOOT Chart"
        />
      </div>
      }

      {wallet && (
        <div style={styles.info}>
          <p>{wallet.address}</p>
          <p>Your {symbol} Balance: {balance}</p>
        </div>
      )}

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Who is Baloo?</h2>
        <p style={styles.paragraph}>Baloo is a 100-pound English Yellow Labrador; a force of nature.</p>
        <p style={styles.paragraph}>
          For six years, he has brought joy to everyone around him. It's time we honored him,
          and every other wonderful dog in our lives. That's what this project is all about.
        </p>
        <p style={styles.paragraph}>
          No gimmicks, no tricks, just a token to honor our best friends and form the basis of a community that takes care of them.
        </p>
        <img src="/baloo_fountain.jpeg" alt="Baloo the Labrador" style={styles.image} />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Tokenomics</h2>
        <ul style={styles.list}>
          <li>🪙 Total Supply: 716,000,000 BLOOT</li>
          <li>💰 60% Public (429.6M)</li>
          <li>🐾 20% Charity & Dog Initiatives (143.2M)</li>
          <li>👨‍💻 20% Founding Team (143.2M)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Dog-First Mission</h2>
        <p style={styles.paragraph}>
          20% of supply is dedicated to real-world dog charities, rescues, and shelters.
          It's time we took care of our best friends. Details to follow.
        </p>
      </section>

      <footer style={styles.footer}>
        <p>Built with love for Baloo 🐾</p>
        <a href="https://basescan.org/token/0xEf9fc2fa22F8c0EF8bcE8415fc7527448919b633" target="_blank" rel="noopener noreferrer">BaseScan</a>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#d8ecf3",
    color: "#1e4b7e",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "8vw",
    fontWeight: "bold",
    fontFamily: "'Fredoka', sans-serif",
    maxWidth: "100%",
  },
  iconRow: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",
  },
  iconLink: {
    color: "#1e4b7e",
    textDecoration: "none",
  },
  connectButton: {
    width: "100%",
    maxWidth: "300px",
    padding: "14px",
    fontSize: "16px",
    backgroundColor: "#FFD700",
    color: "#1e4b7e",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontFamily: "'Fredoka', sans-serif",
    whiteSpace: "nowrap",
  },
  buyButton: {
    width: "100%",
    maxWidth: "300px",
    padding: "14px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontFamily: "'Fredoka', sans-serif",
    whiteSpace: "nowrap",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginTop: "24px",
    width: "100%",
  },
  chartWrapper: {
    width: "100%",
    maxWidth: "800px",
    marginTop: "24px",
  },
  info: {
    fontSize: "16px",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
    marginTop: "12px",
  },
  section: {
    padding: "24px 16px",
    maxWidth: "800px",
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "'Fredoka', sans-serif",
    marginBottom: "16px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    fontFamily: "'Inter', sans-serif",
    marginBottom: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "16px",
    lineHeight: "1.8",
    fontFamily: "'Inter', sans-serif",
  },
  image: {
    width: "min(300px, 80vw)",
    height: "min(300px, 80vw)",
    objectFit: "cover",
    borderRadius: "50%",
    marginTop: "20px",
  },
  footer: {
    padding: "40px 20px",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "'Inter', sans-serif",
    color: "#1e4b7e",
  },
};
