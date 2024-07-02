/**
 * Retrieves the Phantom Provider from the window object
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
function getProvider() {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
}

export default getProvider;
