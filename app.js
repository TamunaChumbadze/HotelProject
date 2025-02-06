document.addEventListener("DOMContentLoaded", function () {
    let hamburger = document.querySelector(".hamburger");
    let navLinks = document.querySelector(".nav-links");
  
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  
    let navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        let targetPage = item.getAttribute("data-target");
        window.location.href = targetPage;
      });
    });
  });
  
  window.addEventListener("load", function () {
    let img = document.querySelector(".backgrImg");
    setTimeout(() => {
      img.classList.add("show");
    }, 500);
  });
  
  window.addEventListener("load", function () {
    let overlay = document.querySelector(".overlay");
    setTimeout(() => {
      overlay.classList.add("show");
    }, 500);
  });
  
  let section = document.querySelector("section");
  
  fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
    .then((pasuxi) => pasuxi.json())
    .then((rooms) => {
      console.log(rooms);
  
      let randomRooms = rooms.sort(() => Math.random() - 0.5).slice(0, 6);
  
      randomRooms.forEach((room) => {
        section.innerHTML += card(room);
      });
    });
  
  function card(room) {
    return `
        <div class="card" style="width: 350px;">
        <img src="${
          room.images?.[0]?.source || "placeholder.jpg"
        }" class="card-img-top" alt="${room.name}">
        <div class="card-body">
        
         <div class="card-description"> <h5 class="card-title">${room.name}</h5>
          <p class="card-text">Price: $${room.pricePerNight}</p>
          </div>
          <button onclick="gotoDetails(${
            room.id
          })" class="btn btn-primary">Book Now</button>
        </div>
      </div>`;
  }
  
  function gotoDetails(id) {
    sessionStorage.setItem("roomId", id);
    window.location.href = "./details.html";
  }
  
  let backToTopButton = document.getElementById("back-to-top");
  
  window.onscroll = function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };
  
  backToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  let boxIcons = document.querySelectorAll(".box-icon");
  
  boxIcons.forEach((boxIcon) => {
    let circle = boxIcon.querySelector(".circle");
    let icon = boxIcon.querySelector(".circle i");
  
    
    boxIcon.addEventListener("mouseover", () => {
      
      circle.style.transform = "scale(1.1)";
  
      icon.style.animation = "shake 0.5s ease-in-out";
    });
  
    boxIcon.addEventListener("mouseout", () => {
     
      circle.style.transform = "scale(1)";
  
      icon.style.animation = "none";
    });
  });
  
  
  let styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `,
    styleSheet.cssRules.length
  );
  