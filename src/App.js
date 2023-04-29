import React, { useState } from 'react';
import { Button, Input } from 'antd';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleGenerateButtonClick = () => {
    if (inputValue.trim() === '') {
      toast.error('Missing text!');
      return;
    }

    QRCode.toDataURL(inputValue, {
      width: 800,
      margin: 2,
      color: {
        dark: '#335383FF',
        light: '#EEEEEEFF'
      }
    }, (err, url) => {
      if (err) {
        console.error(err);
        toast.error('Error generating QR code.');
        return;
      }

      setQrCode(url);
      toast.success('QR code generated successfully!');
    });
  }

  const handleDownloadButtonClick = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCode;
    downloadLink.download = 'qr-code.png';
    downloadLink.click();
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <div className="input-container">
        <Input className="text-input" placeholder="Enter text" value={inputValue} onChange={handleInputChange} />
        <Button className="generate-button" type="primary" onClick={handleGenerateButtonClick}>Generate</Button>
      </div>
      {qrCode && (
        <div className="qr-code-container">
          <img className="qr-code" src={qrCode} alt="QR code" />
          <Button className="download-button" type="primary" onClick={handleDownloadButtonClick}>Download QR Code</Button>
        </div>
      )}
    </div>
  );
}

export default App;
