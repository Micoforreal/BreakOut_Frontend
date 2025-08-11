// import Toastify from "toastify-js";
// // import "toastify-js/src/toastify.css";

import { levelData, userData } from "./helpers/data";
import { createAccount } from "./honeyComb/user";

import xp from "./assets/xp.png";
import gold from "./assets/gold.png";

import levelBadge from "./assets/levelBadge.png";

import LockedLevelBadge from "./assets/lockedlevelBadge.png";

const modal = document.getElementById("noticeModal");
const closeBtn = document.getElementById("closeModalBtn");
const CreateAccountBtn = document.getElementById("createAccountBtn");
const userDataDiv = document.getElementById("userData");

const userLevelDiv = document.getElementById("userLevel");

let selectedLevel = 0;

async function getUserDataFromDB() {
  return userData;
}

async function getLevelData() {
  return levelData;
}

selectedLevel = userData[0].currentLevel;

async function displayUserData() {
  const userData = await getUserDataFromDB();

  // Clear old content
  userDataDiv.innerHTML = "";

  userLevelDiv.innerHTML = "";

  // Map through characters and create HTML
  userData.map((item) => {
    const div = document.createElement("div");
    // div.classList.add("character");
    div.innerHTML = `

    <div class="flex  ms-auto md:text-lg justify-between items-center gap-x-10  ">

      <div class="text-white md:text-lg flex gap-x-2">   <div class="border-2 border-amber-100 h-8 w-8 rounded-full ms-2"></div>
   ${item.username}</div>

      <div class="flex gap-x-5">
      <div class="flex gap-x-2 items-center"><img src="${xp}" class="w-9 h-9"> ${item.xp}</div>
      <div  class="flex gap-x-2 items-center"><img src="${gold}" class="w-9 h-9">  ${item.gold}</div>
      </div>
      </div>
    `;
    userDataDiv.appendChild(div);
  });

  levelData.map((item) => {
    const div = document.createElement("div");

    div.innerHTML = `

    
    <div class=" block ">
    ${
      userData[0].level >= item.level
        ? `
      <div class=" border-2 rounded-lg px-7 text-[60px] font-bold text-gray-300 font-serif">
      ${item.level}
      </div>
      `
        : `
      <div class=" border-2 rounded-lg px-7 text-[60px] font-bold text-gray-300 font-serif">
      <i class="fa-solid fa-lock"></i>
     
  
      </div>
      `
    }
   
    </div>
    
    `;

    userLevelDiv.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  //   const modal = document.getElementById("noticeModal");
  displayUserData();

  // Show immediately
  //   modal.classList.remove("hidden");
  setTimeout(() => modal.classList.remove("hidden"), 2000); // 1 second delay
  modal.classList.add("grid");

  // Toastify({
  //   text: "Account created successfully!",
  //   duration: 5000,

  //   newWindow: true,
  //   close: true,

  //   position: "right",
  //   stopOnFocus: true,

  //   style: {
  //     borderRadius: "10px",
  //     background: "linear-gradient(to right, #00b09b, #96c93d)",
  //   },
  // }).showToast();
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

CreateAccountBtn.addEventListener("click", () => {
  createAccount({ fullName: "John Doe" }); // Example fullName, replace with actual input
});
