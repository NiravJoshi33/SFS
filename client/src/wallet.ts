import TonConnect, { Wallet } from '@tonconnect/sdk';
import { toUserFriendlyAddress } from '@tonconnect/sdk';

const connector = new TonConnect({
    manifestUrl: 'https://sfs-manifest.vercel.app/tonconnect-manifest.json'
});

// Function to update the button text or display the wallet address
function updateButtonDisplay(walletInfo: Wallet | null) {
  const connectButton = document.getElementById('connectButton') as HTMLButtonElement | null;
  if (walletInfo && connectButton) {

      const userFriendlyAddress = toUserFriendlyAddress(walletInfo.account.address, true);
      const shortenedAddress = `${userFriendlyAddress.substring(0, 6)}...${userFriendlyAddress.substring(userFriendlyAddress.length - 4)}`;
      connectButton.textContent = `${shortenedAddress}`;
      connectButton.onclick = async () => {
          await connector.disconnect(); // Disconnect the wallet
          updateButtonDisplay(null); // Update display to show connect button
      };
  } else if (connectButton) {
      connectButton.textContent = 'Connect wallet';
      connectButton.onclick = () => {
          const walletConnectionSource = {
              jsBridgeKey: 'tonkeeper'
          };
          connector.connect(walletConnectionSource);
      };
  }
}

// Listen for wallet status changes
connector.onStatusChange(walletInfo => {
    if (walletInfo) {
        console.log('Connected wallet address:', walletInfo.account.address);
        updateButtonDisplay(walletInfo);
    }
});

// Attempt to restore any previous connection and update the button accordingly
connector.restoreConnection().then(() => {
    if (connector.wallet) {
        updateButtonDisplay(connector.wallet);
    }
});

// Ensure the DOM is fully loaded before accessing the button element
document.addEventListener('DOMContentLoaded', () => {
    updateButtonDisplay(connector.wallet);
});

async function handlePurchase(itemPrice: number, destinationAddress: string) {
  if (!connector.wallet) {
      alert('Please connect your wallet first.');
      return;
  }

  // Define the transaction with the item's price and the recipient's address
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360, // Set the transaction to be valid for the next 360 seconds
    messages: [
        {
            address: destinationAddress, // The actual contract address for the item
            amount: (itemPrice * 1e9).toString(), // The item price in nanotons
            // Include additional properties like payload or stateInit if necessary
        },
        // Include any other messages if needed
    ],
};

  try {
      await connector.sendTransaction(transaction);
      alert('Transaction sent successfully!');
  } catch (error) {
      console.error('Transaction failed:', error);
  }
}

// ... (existing connector.onStatusChange and connector.restoreConnection code)

// Ensure the DOM is fully loaded before attaching event listeners to "Buy" buttons
document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.card .btn-primary') 
  buyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemPriceAttr = button.getAttribute('data-price')!;
        const itemPrice = parseFloat(itemPriceAttr);
                  const destinationAddress = '0QBZSLwTlJQ87Eb8Ts0REVRo3Z7xZx09yEh0bgLqtvsIyC2d'; // Replace with the actual contract address
          handlePurchase(itemPrice, destinationAddress);
      });
  }); 


});
