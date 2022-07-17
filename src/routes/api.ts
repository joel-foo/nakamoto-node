import express, { Request, Response } from 'express'
import 'dotenv/config'
import axios from 'axios'
import commands from './list'

const app = express()
const router = express.Router()

const USER = process.env.RPC_USER
const PASSWORD = process.env.RPC_PASSWORD

commands.forEach((command) => {
  const { name, params, fields } = command
  let path = `/${name}`
  if (params.length !== 0) {
    for (let p of params) {
      path += `/${p}`
    }
  }
  if (command.name === 'scantxoutset') {
    router.get(path, async (req: Request, res: Response) => {
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        command.name
      }", "params": ["start '["${req.params[params[0]]}(${
        req.params[params[1]]
      })"]'"]}`
      try {
        const resp = await axios({
          method: 'POST',
          url: `http://${USER}:${PASSWORD}@127.0.0.1:8332/`,
          headers: { 'content-type': 'text-plain' },
          data,
        })
        const resp2 = await resp.data
        res.json(resp2)
      } catch (e) {
        res.status(404).send(e.data)
      }
    })
  } else {
    router.get(path, async (req: Request, res: Response) => {
      const arr = []
      if (params.length !== 0) {
        for (let p of params) {
          arr.push(req.params[p])
        }
      }
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        command.name
      }", "params": ${JSON.stringify(arr)}}`
      try {
        const resp = await axios({
          method: 'POST',
          url: `http://${USER}:${PASSWORD}@127.0.0.1:8332/`,
          headers: { 'content-type': 'text-plain' },
          data,
        })
        const resp2 = await resp.data
        const modifiedResp = resp2['result']
        if (!fields || !req.query.q) res.json(modifiedResp)
        for (let f of fields) {
          if (req.query.q === f) res.json({ f: modifiedResp[f] })
        }
        //if req.query.q is some garbage
        res.json(modifiedResp)
      } catch (e) {
        res.status(404).send(e.data)
      }
    })
  }
})

export default router
