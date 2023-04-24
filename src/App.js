import QRCode from 'qrcode'
import { useState } from 'react'
import { Button, Input } from 'antd'
import 'antd/dist/antd'


function App() {
  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) return console.error(err)

      console.log(url)
      setQr(url)
    })
  }

  return (
    <div className="app">
      <h1>QR Generator</h1>
      <Input
        placeholder="e.g. https://google.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ maxWidth: '300px', marginRight: '1rem' }}
      />
      <Button type="primary" onClick={GenerateQRCode}>Generate</Button>
      {qr && <>
        <img src={qr} alt="QR Code" style={{ display: 'block', maxWidth: '480px', margin: '2rem auto' }} />
        <Button type="link" href={qr} download="qrcode.png">Download</Button>
      </>}
    </div>
  )
}

export default App
