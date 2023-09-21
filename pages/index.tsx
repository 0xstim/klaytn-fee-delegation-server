import Image from 'next/image'
import { Inter } from 'next/font/google'
import { CodeBlock, atomOneDark } from "react-code-blocks";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const senderClientCodeBlock = 
`const Caver = require('caver-js');
const caver = new Caver('https://public-en-baobab.klaytn.net');
const senderAddress = "0x07dsadjwqbiudew2138921421fdsf243221325a8";
const senderPrivateKey = "0x1sadqw3io091023201jiort39023049";
const toAddress = "0x35653e324t429a323d3352f24231d123423213a14d15";

sendFeeDelegateTx = async() => {
    // sign transaction with private key of sender
    const transactionData = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_VALUE_TRANSFER',
      from: senderAddress,
      to: toAddress,
      gas: '300000',
      value: caver.utils.toPeb('0.001', 'KLAY'),
    }, senderPrivateKey)

    // console.log(transactionData);

    var result = fetch('http://localhost:3000/api/delegate-fee-from-whitelist', {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(json => console.log(json));
}

sendFeeDelegateTx();`

  const h1 = "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
  const h2 = "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  const p = "leading-7 [&:not(:first-child)]:mt-6"
  const h3 = "scroll-m-20 text-2xl font-semibold tracking-tight"
  const list = "my-6 ml-6 list-disc [&>li]:mt-2"

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="max-w-5xl">
        <h1 className={h1}>Klaytn Fee Delegation Server example</h1>
        <h2 className={h2}>What is Fee Delegation on Klaytn?</h2>
        <p className={p}>Fee delegation is a feature on Klaytn that allows users to delegate the payment of transaction fees to another user. This can be useful for users who do not have enough KLAY to pay the transaction fee themselves, or for users who want to avoid the hassle of paying transaction fees.</p>
        <p className={p}>To use fee delegation, the sender of the transaction creates a fee delegated transaction. This transaction specifies the recipient of the transaction, the amount of KLAY to be transferred, and the address of the fee payer. The sender then signs the transaction with their private key.</p>
        <p className={p}>The fee payer then signs the transaction with their private key. Once both the sender and fee payer have signed the transaction, it can be submitted to the Klaytn network.</p>
        <p className={p}>When the transaction is submitted, the fee payer&apos;s balance is debited by the amount of the transaction fee. The sender&apos;s balance is credited with the amount of KLAY that was transferred.</p>
        <p className={p}>Fee delegation can be a useful tool for users who want to save money on transaction fees or who want to avoid the hassle of paying transaction fees. However, it is important to note that the fee payer is responsible for paying the transaction fee, even if the sender does not have enough KLAY to cover the fee.</p>
        <h2 className={h2}>Benefits of Fee delegation on Klaytn</h2>
        <ul className={list}>
          <li>Allows users to save money on transaction fees</li>
          <li>Allows users to avoid the hassle of paying transaction fees</li>
          <li>Can be used by users who do not have enough KLAY to pay the transaction fee themselves</li>
          <li>Can be used by users who want to delegate the payment of transaction fees to a trusted third party</li>
        </ul>
        <h2 className={h2}>Risks of Fee delegation on Klaytn</h2>
        <ul className={list}>
          <li>The fee payer is responsible for paying the transaction fee, even if the sender does not have enough KLAY to cover the fee</li>
          <li>The fee payer can refuse to pay the transaction fee, which could result in the transaction being rejected</li>
          <li>The fee payer could be malicious and steal the KLAY that is being transferred</li>
        </ul>
        <p className={p}>Overall, fee delegation is a useful tool that can be used to save money on transaction fees and to avoid the hassle of paying transaction fees. However, it is important to be aware of the risks involved before using this feature.</p>
        <h2 className={h2}>How to use this Fee Delegation Server</h2>
        <ul className={list}>
          <li>Deploy the server on Vercel or other hosting providers.</li>
          <li>Test with the code block below
            <div>
              <CodeBlock
                text={senderClientCodeBlock}
                language='javascript'
                showLineNumbers={true}
                startingLineNumber={1}
                theme={atomOneDark}
              />
            </div>
          </li>
          <li>Customize the server to fit your needs</li>
          <li>Build your own application!</li>
        </ul>
     </div>
    </main>
  )
}
