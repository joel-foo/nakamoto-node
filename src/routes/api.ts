import express, { Request, Response } from 'express'
import 'dotenv/config'
import axios from 'axios'
import commands from './list'

const router = express.Router()

const USER = process.env.RPC_USER
const PASSWORD = process.env.RPC_PASSWORD

commands.forEach((command) => {
  const { rpcMtd, route, params, fields } = command
  let path = `/${route}`
  if (params.length !== 0) {
    for (let p of params) {
      path += `/:${p}`
    }
  }
  if (route === 'txoutset') {
    router.get(path, async (req: Request, res: Response) => {
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${rpcMtd}", "params": ["start", ["${
        req.params[params[0]]
      }(${req.params[params[1]]})"]]}`
      try {
        const resp = await axios({
          method: 'POST',
          url: `http://${USER}:${PASSWORD}@127.0.0.1:8332/`,
          headers: { 'content-type': 'text-plain' },
          data,
        })
        const resp2 = await resp.data['result']
        delete resp2['success']
        res.json(resp2)
      } catch (e) {
        console.log(e.data)
        res.status(404).send(e.data)
      }
    })
  } else {
    router.get(path, async (req: Request, res: Response) => {
      const arr = []
      if (params.length !== 0) {
        for (let p of params) {
          p = req.params[p]
          if (/[a-z]/.test(p)) {
            arr.push(p)
          } else {
            if (route === 'block' || route === 'header') {
              p = await convertHeightToHash(parseInt(p))
              arr.push(p)
            } else {
              arr.push(parseInt(p))
            }
          }
        }
      }
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${rpcMtd}", "params": ${JSON.stringify(
        arr
      )}}`
      try {
        const resp = await axios({
          method: 'POST',
          url: `http://${USER}:${PASSWORD}@127.0.0.1:8332/`,
          headers: { 'content-type': 'text-plain' },
          data,
        })
        let resp2 = await resp.data['result']
        if (route === 'blockchaininfo') {
          const res = await axios('http://localhost:3000/api/mininginfo')
          const miningInfo = await res.data
          resp2 = {
            blocks: resp2['blocks'],
            headers: resp2['blocks'],
            bestblockhash: resp2['bestblockhash'],
            difficulty: resp2['difficulty'],
            networkhashps: miningInfo['networkhashps'],
            pooledtx: miningInfo['pooledtx'],
            softforks: resp2['softforks'],
          }
        }
        if (route === 'alltxoutset') {
          const toRemove = [
            'height',
            'bestblock',
            'bogosize',
            'hash_serialized_2',
            'disk_size',
          ]
          for (const f of toRemove) {
            delete resp2[f]
          }
        }
        if (!fields || !req.query.q) res.json(resp2)
        for (let f of fields) {
          if (req.query.q === f) res.json(resp2[f])
        }
        //if req.query.q is some garbage
        res.json(resp2)
      } catch (e) {
        res.status(404).send(e.data)
      }
    })
  }
})

async function convertHeightToHash(height: number): Promise<string> {
  try {
    const res = await axios(`http://localhost:3000/api/blockhash/${height}`)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export default router
