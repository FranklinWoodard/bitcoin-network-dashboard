from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hashrate")
async def get_hashrate():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://mempool.space/api/v1/mining/hashrate/3d"
        )
        data = response.json()
        return {
            "hashrate": data["currentHashrate"],
            "unit": 'H/s'
        }

@app.get("/api/miningdifficulty")
async def get_mining_difficulty():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://blockchain.info/q/getdifficulty"
        )
        return {"difficulty": float(response.text)}

@app.get("/api/difficulty")
async def get_difficulty():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://mempool.space/api/v1/difficulty-adjustment"
        )
        data = response.json()
        return {
            "difficulty": data["difficultyChange"],
            "progressPercent": data["progressPercent"],
            "remainingBlocks": data["remainingBlocks"],
            "estimatedRetargetDate": data["estimatedRetargetDate"]
        }

@app.get("/api/blockheight")
async def get_blockheight():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://mempool.space/api/blocks/tip/height"
        )
        return {"blockHeight": response.json()}

@app.get("/api/nodes")
async def get_nodes():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://bitnodes.io/api/v1/snapshots/?limit=1"
        )
        data = response.json()
        return {"nodeCount": data["results"][0]["total_nodes"]}

@app.get("/api/supply")
async def get_supply():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.coingecko.com/api/v3/coins/bitcoin"
        )
        data = response.json()
        circulating = data["market_data"]["circulating_supply"]
        return {
            "circulatingSupply": circulating,
            "percentMined": round((circulating / 21_000_000) * 100, 2)
        }