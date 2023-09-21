// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Caver from 'caver-js';
import { type } from 'os';

// type Data = {
//   messageHash: string,
//   v: string,
//   r: string,
//   s: string,
//   rawTransaction: string,
//   txHash: string,
//   senderTxHash: string,
//   signatures: string[][]
// }

type ResData = {
  data: {
    transactionHash: string,
    status: string
  }
}

type DeprecatedAccountKey = /*unresolved*/ any
type DeprecatedAccount = /*unresolved*/ any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const whitelist: string[] = [
    "0x4b1F654eb429a3D225795d3A9baE35B1D3A14d15"
  ]
  const feePayerAddress: string | object | DeprecatedAccount | DeprecatedAccountKey | undefined = process.env.FEE_PAYER_ADDRESS;
  const feePayerPrivateKey: string | object | DeprecatedAccount | DeprecatedAccountKey | undefined = process.env.FEE_PAYER_PRIVATE_KEY;
  const caver = new Caver('https://public-en-baobab.klaytn.net');
  caver.klay.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);
  const sender = caver.klay.accounts.recover(
    {
      messageHash: req.body.messageHash,
      v: req.body.v,
      r: req.body.r,
      s: req.body.s
    }
  )

  if (whitelist.includes(sender) === true) {
    caver.klay.sendTransaction({
      senderRawTransaction: req.body.rawTransaction,
      feePayer: feePayerAddress,
    })
    .then(function(receipt) {
      res.status(200).json(
        { 
          data: {
            transactionHash: receipt.transactionHash,
            status: 'success'
          }
        }
      )
    })
  } else {
    res.status(403).json(
      {
        data: {
          transactionHash: 'none',
          status: 'fail'
        }
      }
    )
  }
}
