type command = {
  name: string
  params: string[] | []
  fields?: string[]
}

const commands: command[] = [
  {
    name: 'blockchaininfo',
    params: [],
    fields: [
      'blockcount',
      'bestblockhash',
      'difficulty',
      'softforks',
      'mediantime',
    ],
  },
  {
    name: 'blockheader',
    params: ['blockhash'],
  },
  {
    name: 'gettxoutsetinfo',
    params: [],
    fields: ['transactions', 'txouts', 'total_amount'],
  },
  {
    name: 'getblockstats',
    params: ['hash-height'],
  },
  {
    name: 'scantxoutset',
    params: ['addr', 'act-addr'],
  },
  {
    name: 'getmempoolinfo',
    params: [],
  },
  {
    name: 'getrawmempool',
    params: [],
  },
  {
    name: 'gettxout',
    params: ['txid', 'vout'],
  },
  {
    name: 'getblock',
    params: ['blockhash'],
  },
  {
    name: 'getblockhash',
    params: ['blockheight'],
  },
]

export default commands
