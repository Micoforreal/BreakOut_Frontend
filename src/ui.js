// import Toastify from "toastify-js";
// // import "toastify-js/src/toastify.css";

import { levelData, userData } from "./helpers/data";
import { createAccount } from "./honeyComb/user";

import xp from "./assets/xp.png";
import gold from "./assets/gold.png";
import { _APP } from "./main";

const pauseBtn = document.getElementById("pause_btn");




pauseBtn.addEvetListener("click", () => {
  
  _APP.Pause()
  
});

const modal = document.getElementById("noticeModal");
const closeBtn = document.getElementById("closeModalBtn");
const userDataDiv = document.getElementById("userData");

const userLevelDiv = document.getElementById("userLevel");
const buttons = document.querySelectorAll(".btn_level");

