export interface Asset {
  key: string;
  path: string;
}

export interface AssetMap {
  [key: string]: Asset;
}

export const imageAssetMap: AssetMap = {
  menuBGImg: {
    key: "menuBGImg",
    path: "/assets/ui/menu_screen_bg_720x1280.png",
  },
  playBtnImg: { key: "playBtnImg", path: "/assets/ui/play_button_400x110.png" },
  gameBGImg: { key: "gameBGImg", path: "/assets/ui/black_bg_720x1280.png" },
  gameTitle: { key: "gameTitle", path: "/assets/ui/title_720x100.png" },
  pfpFrame: { key: "pfp_frame", path: "/assets/ui/pfp_frame_300x300.png" },
  profilePic: { key: "profile_pic", path: "/assets/ui/user_pics/1.png" },
  opponentPic: { key: "opponent_pic", path: "/assets/ui/user_pics/2.png" },
  superFunCoin: { key: "superFunCoin", path: "/assets/ui/sf_demo_coin.png" },
  storeIcon: { key: "storeIcon", path: "/assets/ui/store_icon.png" },
  storeItemBG: { key: "storeItemBG", path: "/assets/ui/storeitem_bg.png" },
  missileIcon: { key: "missileIcon", path: "/assets/ui/missile.png" },
  railGunIcon: { key: "railGunIcon", path: "/assets/ui/railgun.png" },
  nukeIcon: { key: "nukeIcon", path: "/assets/ui/nuke.png" },
  itemPriceBG: { key: "itemPriceBG", path: "/assets/ui/item_price_bg.png" },
  returnBtn: { key: "returnBtn", path: "/assets/ui/return_button.png" },
  blackBG: { key: "blackBG", path: "/assets/ui/black_bg_720x1280.png" },
  poweredBy: { key: "poweredBy", path: "/assets/ui/powered.png" },
  usernameBox: { key: "usernameBox", path: "/assets/ui/username_box.png" },
  scoreBox: { key: "scoreBox", path: "/assets/ui/score_box.png" },
  highscoreBox: { key: "highscoreBox", path: "/assets/ui/highscore_box.png" },
  lobbyTitle: { key: "lobbyTitle", path: "/assets/ui/lobby_title.png" },
  botProfilePic: { key: "botProfilePic", path: "/assets/ui/bot_pfp.png" },
  vsText: { key: "vsText", path: "/assets/ui/vs_text.png" },
  playerInfoBox: {
    key: "playerInfoBox",
    path: "/assets/ui/main_player_info.png",
  },
  opponentInfoBox: {
    key: "opponentInfoBox",
    path: "/assets/ui/opp_player_info.png",
  },
};

export const profilePicMap: AssetMap = {
  profilePic1: { key: "profilePic1", path: "/assets/ui/user_pics/1.png" },
  profilePic2: { key: "profilePic2", path: "/assets/ui/user_pics/2.png" },
  profilePic3: { key: "profilePic3", path: "/assets/ui/user_pics/3.png" },
  profilePic4: { key: "profilePic4", path: "/assets/ui/user_pics/4.png" },
  profilePic5: { key: "profilePic5", path: "/assets/ui/user_pics/5.png" },
  profilePic6: { key: "profilePic6", path: "/assets/ui/user_pics/6.png" },
  profilePic7: { key: "profilePic7", path: "/assets/ui/user_pics/7.png" },
};

export const audioAssetMap: AssetMap = {
  playBtnClkSound: {
    key: "playBtnClkSound",
    path: "/assets/audio/play_btn_sound.mp3",
  },
};
