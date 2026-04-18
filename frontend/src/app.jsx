import { useState, useEffect } from "react"

const API = "http://127.0.0.1:8000"

function MetricCard({ title, value, sub }) {
  return (
    <div style={{
      background: "#1a1a1a",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}>
      <p style={{ color: "#888", margin: 0, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
      <p style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}>{value ?? "Loading..."}</p>
      {sub && <p style={{ color: "#666", margin: 0, fontSize: "13px" }}>{sub}</p>}
    </div>
  )
}

export default function App() {
  const [hashrate, setHashrate] = useState(null)
  const [miningDifficulty, setMiningDifficulty] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [blockHeight, setBlockHeight] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [supply, setSupply] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/hashrate`)
      .then(r => r.json())
      .then(d => setHashrate((d.hashrate / 1e18).toFixed(1) + " EH/s"))

    fetch(`${API}/api/miningdifficulty`)
      .then(r => r.json())
      .then(d => setMiningDifficulty(
        (d.difficulty / 1e12).toFixed(2) + " T"
      ))

    fetch(`${API}/api/difficulty`)
      .then(r => r.json())
      .then(d => setDifficulty({
        change: (d.difficulty >= 0 ? "+" : "") + d.difficulty.toFixed(2) + "%",
        sub: `~${d.remainingBlocks} blocks remaining`
      }))

    fetch(`${API}/api/blockheight`)
      .then(r => r.json())
      .then(d => setBlockHeight(d.blockHeight.toLocaleString()))

    fetch(`${API}/api/nodes`)
      .then(r => r.json())
      .then(d => setNodes(d.nodeCount.toLocaleString()))

    fetch(`${API}/api/supply`)
      .then(r => r.json())
      .then(d => setSupply({
        value: Math.floor(d.circulatingSupply).toLocaleString() + " BTC",
        sub: d.percentMined + "% of 21,000,000 mined"
      }))
  }, [])

  return (
    <div style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "white",
      padding: "48px",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
        Bitcoin Network
      </h1>
      <p style={{ color: "#666", marginBottom: "40px", fontSize: "14px" }}>
        Live data from the Bitcoin blockchain
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "16px"
      }}>
        <MetricCard title="Hashrate" value={hashrate} />
        <MetricCard title="Mining Difficulty" value={miningDifficulty} />
        <MetricCard
          title="Next Difficulty Adjustment"
          value={difficulty?.change}
          sub={difficulty?.sub}
        />
        <MetricCard title="Block Height" value={blockHeight} />
        <MetricCard title="Node Count" value={nodes} />
        <MetricCard
          title="Circulating Supply"
          value={supply?.value}
          sub={supply?.sub}
        />
      </div>
    </div>
  )
}