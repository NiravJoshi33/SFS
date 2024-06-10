import Phaser from "phaser";
import type Server from "../services/server";

    function toggleOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.visibility = (overlay.style.visibility === 'visible' ? 'hidden' : 'visible');
        } else {
            console.error('Overlay element not found!');
        }
        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
            closeButton.addEventListener('click', toggleOverlay);
        } else {
            console.error('Close button not found!');
        }
    }
    
export default class GameStoreScene extends Phaser.Scene {
    server!: Server;
    
    constructor() {
        super({ key: 'GameStoreScene' });
    }

    async create(data: { server: Server }) {
        const { server } = data;
        this.server = server;
        console.log("GameStoreScene created");

        // // Adding interactive text as a button
        // const storeButton = this.add.text(50, 50, 'Open Store', { 
        //     font: '20px Arial', 
        //     color: '#ffffff' // Use 'color' instead of 'fill'
        // })
        // .setInteractive();
         // Make sure it's on top
        
            toggleOverlay();
            console.log("Store opened");
       
    }
}
