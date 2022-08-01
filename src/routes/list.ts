type command = {
  rpcMtd: string
  route: string
  params: string[] | []
  fields?: string[]
}

const commands: command[] = [
  {
    rpcMtd: 'getblock',
    route: 'block',
    params: ['hashorheight'],
    fields: [
      'hash',
      'confirmations',
      'size',
      'strippedsize',
      'weight',
      'height',
      'version',
      'versionHex',
      'merkleroot',
      'tx',
      'time',
      'mediantime',
      'nonce',
      'bits',
      'difficulty',
      'chainwork',
      'nTx',
      'previousblockhash',
      'nextblockhash',
    ],
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
    fields: [
      'avgfee',
      'avgfeerate',
      'avgtxsize',
      'feerate_percentiles',
      'height',
      'ins',
      'maxfee',
      'maxfeerate',
      'maxtxsize',
      'minfee',
      'minfeerate',
      'outs',
      'subsidy',
      'swtotal_size',
      'swtotal_weight',
      'swtxs',
      'time',
      'total_out',
      'total_size',
      'total_weight',
      'totalfee',
      'txs',
      'utxo_increase',
      'utxo_size_inc',
    ],
  },
  {
    rpcMtd: 'getblockchaininfo',
    route: 'blockchaininfo',
    params: [],
    fields: [
      'blocks',
      'headers',
      'bestblockhash',
      'difficulty',
      'softforks',
      'networkhashps',
      'pooledtx',
      'mediantime',
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
    params: [],
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
    params: ['height'],
  },
  {
    rpcMtd: 'getmininginfo',
    route: 'mininginfo',
    params: [],
  },
]

export default commands
