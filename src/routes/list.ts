type command = {
  rpcMtd: string
  route:string
  params: string[] | []
  fields?: string[]
}

const commands: command[] = [
  {
    rpcMtd: 'getblock',
    route: 'block',
    params: ['hashorheight'],
  },
  {
    rpcMtd: 'getblockheader',
    route: 'header',
    params: ['hashorheight'],
  },
    {
    rpcMtd: 'getblockstats',
    route: 'blockstats',
    params: ['hashorheight'],
  },
  {
    rpcMtd: 'getblockchaininfo',
    route: 'blockchaininfo',
    params: [],
    fields: [
      'blocks',
      'bestblockhash',
      'difficulty',
      'softforks',
    ],
  },
  {
    rpcMtd: 'scantxoutset',
    route: 'txoutset',
    params: ['type', 'addr'],
  },
  {
    rpcMtd: 'gettxout',
    route: 'txout',
    params: ['txid', 'vout'],
  },
  {
    rpcMtd: 'gettxoutsetinfo',
    route: 'alltxoutset',
    params: []
  },
  {
    rpcMtd: 'getmempoolinfo',
    route: 'mempoolinfo',
    params: [],
  },
  {
    rpcMtd: 'getrawmempool',
    route: 'rawmempool',
    params: [],
  },
  {
    rpcMtd: 'getblockhash',
    route: 'blockhash',
    params: ['height']
  }
]

export default commands
