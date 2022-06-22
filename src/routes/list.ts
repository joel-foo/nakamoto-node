const commands = [
  {
    name: 'getblockchaininfo',
    params: '',
  },
  {
    name: 'getblockcount',
    params: '',
  },
  {
    name: 'getdifficulty',
    params: '',
  },
  {
    name: 'getblockheader',
    params: '',
  },
  {
    name: 'gettxoutsetinfo',
    params: 'blockhash',
  },
  {
    name: 'getblockstats',
    params: 'hash-height',
  },
  {
    name: 'scantxoutset',
    params: 'address',
  },
  {
    name: 'getmempoolinfo',
    params: '',
  },
  {
    name: 'getrawmempool',
    params: '',
  },
  {
    name: 'gettxout',
    params: 'txid',
  },
  {
    name: 'getblock',
    params: 'blockhash',
  },
  {
    name: 'getblockhash',
    params: 'blockheight',
  },
]

export default commands
