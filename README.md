# Bitcoin Network Dashboard

A full-stack, educational Bitcoin network dashboard displaying live blockchain data. Built to inform skeptics — not hype Bitcoin, but show what makes it fundamentally different from every financial system that came before it.

<img width="1125" height="467" alt="docs:screenshot" src="https://github.com/user-attachments/assets/e65ed44f-34b6-470e-8287-732615fee714" />

## What It Does

Six live metrics pulled from the Bitcoin blockchain update in real time: network hashrate, mining difficulty, next difficulty adjustment, block height, node count, and circulating supply. Each metric is paired with educational tooltips explaining the core concepts behind Bitcoin's security model — Proof of Work, Consensus, and Immutability.

## Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** FastAPI (Python)
- **Charts:** Plotly
- **Data:** Mempool.space, Blockchain.info, Bitnodes.io, CoinGecko (free public APIs)

## Architecture

The React frontend never calls Bitcoin APIs directly. All data flows through the FastAPI backend, which acts as a proxy and caching layer. This design allows a future swap to a self-hosted Bitcoin node with zero frontend changes required.

## Running Locally

**Requirements:** Python 3.12+, Node.js 18+

**Backend:**
```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn httpx
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## Roadmap

- [ ] Educational tooltips (Proof of Work, Consensus, Immutability)
- [ ] Block height pulse animation on new block detection
- [ ] DCA Investment Calculator (Geometric Brownian Motion model)
- [ ] Bitcoin in the Wild — real-world sovereignty stories
- [ ] Light mode toggle
- [ ] Deployment (Vercel + Render)
