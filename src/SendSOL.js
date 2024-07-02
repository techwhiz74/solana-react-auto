import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const SendSOL = () => {
  const { sendTransaction } = useWallet();

  const handleSendSOL = async () => {
    if (!sendTransaction) {
      console.error('Wallet not connected');
      return;
    }

    try {
      // Open the Phantom wallet's send transfer UI
      await sendTransaction(
        {
          instructions: [],
          signers: [],
        },
        'confirmed'
      );
    } catch (error) {
      console.error('Error opening Phantom wallet:', error);
    }
  };

  return (
    <button onClick={handleSendSOL}>Send SOL</button>
  );
};

export default SendSOL;