interface Asset {
  key: string;
  path: string;
}

interface AssetMap {
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
  storeIcon: { key: "storeIcon", path: "/assets/ui/store_icon_256px.png" },
  storeItemBG: { key: "storeItemBG", path: "/assets/ui/storeitem_bg.png" },
  missileIcon: { key: "missileIcon", path: "/assets/ui/missile.png" },
  railGunIcon: { key: "railGunIcon", path: "/assets/ui/railgun.png" },
  nukeIcon: { key: "nukeIcon", path: "/assets/ui/nuke.png" },
  itemPriceBG: { key: "itemPriceBG", path: "/assets/ui/item_price_bg.png" },
  returnBtn: { key: "returnBtn", path: "/assets/ui/return_button.png" },
};

export const audioAssetMap: AssetMap = {
  playBtnClkSound: {
    key: "playBtnClkSound",
    path: "/assets/audio/play_btn_sound.mp3",
  },
};
