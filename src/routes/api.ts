import express, { Request, Response } from 'express'
import 'dotenv/config'
import axios from 'axios'

const app = express()

const router = express.Router()

const USER = process.env.RPC_USER
const PASSWORD = process.env.RPC_PASSWORD

router.get('/getblockcount', async (req: Request, res: Response) => {
  const data =
    '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}'
  try {
    const resp = await axios({
      url: 'http://${USER}:${PASSWORD}@127.0.0.1:8332/',
      headers: { 'content-type': 'text-plain' },
      data,
    })
    const resp2 = await resp.data
    res.json(resp2)
  } catch (e) {
    console.log(e)
  }
})

export default router
