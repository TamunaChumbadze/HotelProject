document.addEventListener("DOMContentLoaded", function () {
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
  });
  
  let section = document.querySelector("section");
  let priceRange = document.getElementById("priceRange");
  let priceMin = document.getElementById("priceMin");
  let priceMax = document.getElementById("priceMax");
  let roomType = document.getElementById("roomType");
  let guests = document.getElementById("guests");
  let checkIn = document.getElementById("checkIn");
  let checkOut = document.getElementById("checkOut");
  let applyFilter = document.getElementById("applyFilter");
  let resetFilter = document.getElementById("resetFilter");
  
  let roomsTypes = document.getElementById("roomsTypes");
  let today = new Date().toISOString().split("T")[0];
  checkIn.setAttribute("min", today);
  checkOut.setAttribute("min", today);
  
  document.getElementById("roomsTypes").addEventListener("click", function (event) {
    event.preventDefault(); 
  
    if (event.target.tagName === "A") {
        document.querySelectorAll("#roomsTypes a").forEach(a => a.classList.remove("active")); 
        event.target.classList.add("active"); 
  
        let selectedType = event.target.dataset.type; 
        
        let filters = {}; 
  
        if (selectedType !== "All") {
            filters.roomTypeId = getRoomTypeId(selectedType);
        }
  
        console.log("Filtering by type:", filters);
        fetchRooms(filters); 
    }
  });
  function getRoomTypeId(typeName) {
    const roomTypes = {
        "Single Room": 1,
        "Double Room": 2,
        "Deluxe Room": 3
    };
    return roomTypes[typeName] || null;
  }
  
  function fetchRoomTypes() {
    let url = "https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes";
    console.log();
    
    fetch(url)
      .then((response) => response.json())
      .then((types) => {
        roomType.innerHTML = '<option value="0">All</option>';
        types.forEach((type) => {
          roomType.innerHTML += `<option value="${type.id}">${type.name}</option>`;
        });
      })
      .catch((error) => console.error("Error fetching room types:", error));
  }
  
  priceRange.addEventListener("input", () => {
    priceMax.textContent = priceRange.value;
  });
  
  function fetchRooms(filters = {}) {
    let url = "https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered";
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((rooms) => {
        console.log("Rooms Response:", rooms); 
        
        section.innerHTML = "";
        if (rooms.length === 0) {
          section.innerHTML = "<p>No rooms found matching your criteria.</p>";
        } else {
          rooms.forEach((room) => {
            section.innerHTML += card(room);
          });
        }
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }
  
  function card(room) {
    return `
    <div class="card" style="width: 350px;">
        <img src="${room.images?.[0]?.source || "placeholder.jpg"}" class="card-img-top" alt="${room.name}">
        <div class="card-body">
        
         <div class="card-description"> <h5 class="card-title">${room.name}</h5>
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
  
  applyFilter.addEventListener("click", () => {
    let priceFromValue = parseInt(priceMin.textContent);
    let priceToValue = parseInt(priceMax.textContent);
  
    let filters = {};
  
    if (!isNaN(priceFromValue) && !isNaN(priceToValue)) {
      filters.priceFrom = priceFromValue;
      filters.priceTo = priceToValue;
    }
  
    if (roomType.value && roomType.value !== "0") {
      filters.roomTypeId = roomType.value; 
      //  filters.roomType = roomType.options[roomType.selectedIndex].text;
  }
    
    if (guests.value) {
      filters.maximumGuests = parseInt(guests.value);
    }
  
    if (checkIn.value) {
      filters.checkIn = checkIn.value;
    }
  
    if (checkOut.value) {
      filters.checkOut = checkOut.value;
    }
  
    console.log("Filters Sent:", filters); 
    
    fetchRooms(filters);
  });
  
  resetFilter.addEventListener("click", () => {
    priceRange.value = 1000;
    priceMax.textContent = "1000";
    roomType.value = "0";
    guests.value = "";
    checkIn.value = "";
    checkOut.value = "";
    fetchRooms();
  });
  
  fetchRoomTypes();
  fetchRooms();
  
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