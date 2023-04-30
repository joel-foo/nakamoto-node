# nakamoto node

A NodeJS wrapper to interface with your personal Bitcoin full node. Built with ExpressJS and Typescript.

## Installation

```bash
git clone https://github.com/joel-foo/nakamoto-node.git

cd nakamoto-node

#Input your rpcuser and rpcpassword as defined in bitcoin.conf
echo -e "RPC_USER=${user}\nRPC_PASSWORD=${password}" >> .env

npm i && npm run build

# To run as background service, else 'npm run start' will suffice 
nohup npm run start >/dev/null 2>&1 &

# OR recommended:
forever start -c "npm start" ./ 
```
