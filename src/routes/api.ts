import express, { Request, Response } from 'express'
import 'dotenv/config'
import axios from 'axios'
import commands from './list'

const app = express()
const router = express.Router()

const USER = process.env.RPC_USER
const PASSWORD = process.env.RPC_PASSWORD

commands.forEach((command) => {
  let path = `/${command.name}`
  if (command.params) path += `/:${command.params}`
  if (command.name === 'scantxoutset') {
    router.get(path, async (req: Request, res: Response) => {
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        command.name
      }", "params": ["start '["addr(${req.params[command.params]})"]'"]}`
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
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        command.name
      }", "params": ["${req.params[command.params]}"]}`
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
  }
})

export default router
