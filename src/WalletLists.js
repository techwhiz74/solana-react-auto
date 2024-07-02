import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import WalletConnect from './asset/walletConnect.png';
import MetaMask from './asset/MetaMask.png';
import Phantom from './asset/phantom.svg';
import AllWallet from './asset/four-dots-square.svg';
import './App.css';

const WalletLists = ({ handleConnect }) => {
  const [modal1Open, setModal1Open] = useState(false);

  return (
    <div className='connectButton'>
      <Button type="primary" onClick={() => setModal1Open(true)}>
        SolanaPay
      </Button>
      <Modal
        title={
          <div className='walletListTitle'>
            Connect Wallet
          </div>
        }
        style={{
          top: 30,
          maxWidth: '350px',
        }}
        open={modal1Open}
        footer={null}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <div className='walletListDiv'>
          <img src={WalletConnect} alt='WalletConnect' style={{width: '40px', height: '40px'}}></img>
          <span className='walletListText'>WalletConnect</span>
          <Button style={{ fontSize:'12px', color:'blue', fontWeight:'bold', height:'20px', padding:'5px' }}>QR CODE</Button>
        </div>
        <div className='walletListDiv'>
          <img src={MetaMask} alt='WalletConnect' style={{width: '40px', height: '40px'}}></img>
          <span className='walletListText'>Browser Wallet</span>
        </div>
        <div className='walletListDiv' onClick={handleConnect}>
          <img src={Phantom} alt='WalletConnect' style={{width: '40px', height: '40px'}}></img>
          <span className='walletListText'>Phantom</span>
        </div>
        <div className='walletListDiv'>
          <img src={MetaMask} alt='WalletConnect' style={{width: '40px', height: '40px'}}></img>
          <span className='walletListText'>MetaMask</span>
        </div>
        <div className='walletListDiv'>
          <img src={AllWallet} alt='WalletConnect' style={{width: '40px', height: '40px'}}></img>
          <span className='walletListText'>All Wallets</span>
        </div>
      </Modal>
    </div>
  );
};
export default WalletLists;