export const ALL_TOKENS: string[] = [
  "avax",
  "bnb",
  "btc",
  "eth",
  "matic",
  "shib",
  "sol",
  "ton",
  "uni",
  "usdc",
  "usdt",
];

// 1440 x 2560 is 9:16 resolution which is closer to the resolution of iPhone devices
// on higher end. At this moment we dont have much experience with mobile browser game
// development, so we will go with this and optimize the resolution for low-end devices.
// Reference: https://www.reddit.com/r/gamedev/comments/aacdib/mobile_game_resolution/
// Since 1440 x 2560 resolution is too large for the laptop, we will be building the game
// for 720 x 1280 resolution for now.
export const canvasSize = {
  width: 720,
  height: 1280,
};

// Grid parameters/configuration
export const numOfRows = 10;
export const numOfCols = 8;
export const tileSpacing = 72;
export const tileScale = 0.25; // Scale down from 256px to 64px
export const gridWidth = numOfCols * tileSpacing;
export const gridHeight = numOfRows * tileSpacing;
export const horizontalMargin = (canvasSize.width - gridWidth) / 2; //Centering Grid Horizontally
export const verticalMargin = (canvasSize.height - gridHeight) / 2 + 100; // 100px offset from center
export const swapTriggerDistance = tileSpacing * 0.5; // After the cursor travels this distance, swap is triggered

export const presetScores = {
  threeMatch: 10, // when 3 tiles are matched
  fourMatch: 30, // when 4 tiles are matched
  fiveMatch: 50, // when 5 tiles are matched
  railGun: 100, // when 'railGun' tile is matched with 2 other same color tiles
  bomb: 100, // when 'bomb' tile is matched with 2 other same color tiles
  railGunBomb: 200, // when 'railGun' tile is matched with 'bomb' tile
};

export const timerConfig = {
  lobbyTimeOut: 5000, // 10 seconds
  turnTimeOut: 10000, // 10 seconds
};

export const sampleProfilePicKeys = ["profilePic1", "profilePic2"];

export const MAX_PLAYERS = 2;
