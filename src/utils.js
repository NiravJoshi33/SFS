export const ALL_TOKENS = [
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
