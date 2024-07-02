import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import getProvider from './GetProvider';
import WalletLists from './WalletLists';

const sleep = (timeInMS) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMS);
  });
};

const SendSOL = () => {
  const { sendTransaction, connected, wallet, connecting, connect } = useWallet();
  const [provider, setProvider] = useState(null);

  /** Connect */
  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.connect();
    } catch (error) {
      console.log("error while connecting", error)
    }
  }, [provider]);

  /** Disconnect */
  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
    } catch (error) {
      console.log("error while disconnecting", error)
    }
  }, [ provider]);

  useEffect(() => {
    (async () => {
      // sleep for 100 ms to give time to inject
      await sleep(100);
      setProvider(getProvider());
    })();
  }, []);

  useEffect(() => {
    if (!provider) return;

    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {
      // fail silently
    });

    provider.on('connect', (publicKey) => {
      console.log('public key' , publicKey)
    });

    provider.on('disconnect', () => {
      console.log("disconnect")
    });

    provider.on('accountChanged', (publicKey) => {
      if (publicKey) {
        console.log("publicKey", publicKey)
      } else {
        /**
         * In this case dApps could...
         *
         * 1. Not do anything
         * 2. Only re-connect to the new account if it is trusted
         *
         * ```
         * provider.connect({ onlyIfTrusted: true }).catch((err) => {
         *  // fail silently
         * });
         * ```
         *
         * 3. Always attempt to reconnect
         */
        provider.connect().catch((error) => {
          console.log("error", error)
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [ provider]);

  return  <WalletLists handleConnect={handleConnect} />
};

export default SendSOL;