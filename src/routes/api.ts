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
  console.log(path)
  if (route === 'txoutset') {
    router.get(path, async (req: Request, res: Response) => {
      console.log(req.params[params[0]], req.params[params[1]])
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        rpcMtd
      }", "params": ["start", ["${req.params[params[0]]}(${
        req.params[params[1]]
      })"]]}`
      console.log(data)
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
            if((/[a-z]/).test(p)){
              arr.push(p)
            }else{
              if(route === 'block' || route === 'header'){
                p = await convertHeightToHash(parseInt(p))
                arr.push(p)
              }else{
                arr.push(parseInt(p))
              }
            }
          }
        
      }
      const data = `{"jsonrpc": "1.0", "id": "curltest", "method": "${
        rpcMtd
      }", "params": ${JSON.stringify(arr)}}`
      console.log(data)
      try {
        const resp = await axios({
          method: 'POST',
          url: `http://${USER}:${PASSWORD}@127.0.0.1:8332/`,
          headers: { 'content-type': 'text-plain' },
          data,
        })
        const resp2 = await resp.data['result']
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

async function convertHeightToHash(height:number):Promise<string>{
  try{
  const res = await axios(`http://localhost:3000/api/blockhash/${height}`)
  return res.data
  }catch(e){
    console.log(e)
  }
}

export default router
