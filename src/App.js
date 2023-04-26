import QRCode from 'qrcode'
import { useState } from 'react'
import { Button, Input } from 'antd'
import 'antd/dist/antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')

  const GenerateQRCode = () => {
    if (url.trim() === '') {
      toast.error('Missing text!')
      return
    }

    QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) {
        console.error(err)
        toast.error('Missing task.')
        return
      }

      console.log(url)
      setQr(url)
      toast.success('QR Code has been generated succesfully!')
    })
  }

  return (
    <div className="app">
      <h1>QR Generator</h1>
      <Input
        placeholder="np. https://google.com"
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
