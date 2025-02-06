document.addEventListener("DOMContentLoaded", function () {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("check-in").setAttribute("min", today);
    document.getElementById("check-out").setAttribute("min", today);
  
    let checkInInput = document.getElementById("check-in");
    let checkOutInput = document.getElementById("check-out");
  
    
    checkInInput.addEventListener("change", function () {
      let checkInDate = new Date(checkInInput.value);
      checkOutInput.setAttribute("min", checkInInput.value);
      if (new Date(checkOutInput.value) <= checkInDate) {
        checkOutInput.value = ""; 
      }
    });
  
    let hamburger = document.querySelector(".hamburger");
    let navLinks = document.querySelector(".nav-links");
  
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
  
        
    });
  
    let navItems = document.querySelectorAll('.nav-links a');
      navItems.forEach(item => {
          item.addEventListener('click', function(event) {
              event.preventDefault();
              let targetPage = item.getAttribute('data-target');
              window.location.href = targetPage;
          });
      });
  
    let roomId = sessionStorage.getItem("roomId");
    let section = document.querySelector("section");
    let form = document.querySelector("form");
  
    fetch(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${roomId}`)
      .then((response) => response.json())
      .then((room) => {
        section.innerHTML += cardCode(room);
  
        let reservationSection = document.querySelector(".details-card .details-body");
        let roomInfoDiv = document.createElement("div");
        roomInfoDiv.classList.add("text-center", "mt-2");
        roomInfoDiv.innerHTML = `<h6>${room.name}</h6><p class="fw-bold">${room.pricePerNight}€</p>`;
  
        reservationSection.insertBefore(roomInfoDiv, reservationSection.children[1]);
      });
  
    function cardCode(room) {
      console.log(room);
  
      let imagesHtml = room.images.map((image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${image.source}" class="d-block w-100" alt="Room Image">
        </div>
      `).join("");
  
      return ` 
        <div id="roomCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${imagesHtml}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#roomCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#roomCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`;
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      let formData = new FormData(form);
      let bookingData = Object.fromEntries(formData);
      bookingData.roomId = roomId;
  
      let checkInDate = new Date(bookingData.CheckInDate);
      let checkOutDate = new Date(bookingData.CheckOutDate);
  
      if (checkInDate < checkOutDate) {
        fetch("https://hotelbooking.stepprojects.ge/api/Booking", {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        })
          .then((pasuxi) => pasuxi.text())
          .then((pas) => {
            console.log(pas);
            alert("თქვენი ნომერი წარმატებით დაიჯავშნა!");
            window.location.href = "bookedRooms.html";
          });
      } else {
        alert("ჩექაუთი ვერ იქნება წარსულში ან იმავე დღეს!!!");
      }
    });
  });
  
  function showContent(section) {
  
    let contentDivs = document.querySelectorAll('.overview-content');
    contentDivs.forEach(div => {
      div.style.display = 'none';
    });
  
    document.getElementById(section).style.display = 'block';
  }
  
  let otherRoomsSection = document.querySelector(".otherRooms");
  
  fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
    .then((response) => response.json())
    .then((rooms) => {
      console.log(rooms);
  
      let randomRooms = rooms.sort(() => Math.random() - 0.4).slice(0, 3);
  
      randomRooms.forEach((room) => {
        otherRoomsSection.innerHTML += roomCard(room);  
      });
    });
  
  function roomCard(room) {
    return `
      <div class="card" style="width: 350px;">
        <img src="${room.images?.[0]?.source || 'placeholder.jpg'}" class="card-img-top" alt="${room.name}">
        <div class="card-body">
          <div class="card-description">
            <h5 class="card-title">${room.name}</h5>
            <p class="card-text">Price: $${room.pricePerNight}</p>
          </div>
          <button onclick="gotoDetails(${room.id})" class="btn btn-primary">Book Now</button>
        </div>
      </div>`;
  }
  
  function gotoDetails(id) {
      sessionStorage.setItem("roomId", id);
      window.location.href = "./details.html";  
  }
  
  let backToTopButton = document.getElementById("back-to-top");
  
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block"; 
    } else {
      backToTopButton.style.display = "none"; 
    }
  };
  
  backToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#checkIn", {
        dateFormat: "Y-m-d",
        minDate: "today", 
        maxDate: new Date().fp_incr(365), 
        theme: "material_blue" 
    });
  
    flatpickr("#checkOut", {
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date().fp_incr(365),
        theme: "material_blue"
    });
  });