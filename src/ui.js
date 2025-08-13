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
const buttons = document.querySelectorAll(".btn_level");

let selectedLevel = null;
let selectedButton = null;

async function getUserDataFromDB() {
  return userData;
}

async function getLevelData() {
  return levelData;
}

selectedLevel = userData[0].currentLevel;

async function displayUserData() {
  const userData = await getUserDataFromDB();
  const userLevel = userData[0].level;

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

    const isUnlocked = userLevel >= item.level;

    div.innerHTML = `
  <div class="block">
     <button 
        class="level_btn  border-2 rounded-lg px-7 text-[60px] font-bold text-gray-300 font-serif transition-colors duration-200" 
        ${!isUnlocked ? "disabled" : ""}
        value="${item.level}"
      >
        ${isUnlocked ? item.level : `<i class="fa-solid fa-lock"></i>`}
      </button>
  </div>
`;

    const btn = div.querySelector(".level_btn");
    const preselectedBtn = document.querySelector(
      `button[value="${selectedLevel}"]`
    );
    if (preselectedBtn) {
      preselectedBtn.classList.add("border-orange-500");
      selectedButton = preselectedBtn;
    }


    if (isUnlocked) {
      btn.addEventListener("click", () => {
        // Remove orange border from previous selection
        if (selectedButton) {
          selectedButton.classList.remove("border-orange-500");
        }

        // Mark new selection
        btn.classList.add("border-orange-500");
        selectedButton = btn;
        selectedLevel = selectedButton.value; // Update the selected level
      });
    }

    userLevelDiv.appendChild(div);
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove 'active' from all
    buttons.forEach((b) => b.classList.remove("active"));

    // Add 'active' to the clicked button
    btn.classList.add("active");

    // Store the selected value (like React's state)
    const selected = btn.textContent;
    console.log("Selected:", selected);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  //   const modal = document.getElementById("noticeModal");
  // displayUserData();

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
