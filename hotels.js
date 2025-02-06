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


    let hotelsSection = document.getElementById("hotelsSection");
    let hotelsTypes = document.getElementById("hotelsTypes");
    let allHotels = []; 

    
    fetch('https://hotelbooking.stepprojects.ge/api/Hotels/GetCities')
        .then(response => response.json())
        .then(cities => {
            cities.forEach(city => {
                let cityFilter = document.createElement("li");
                cityFilter.innerHTML = `<a href="#" data-type="${city}">${city}</a>`;
                hotelsTypes.appendChild(cityFilter);
            });

            addFilterListeners();
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });

    
    fetch('https://hotelbooking.stepprojects.ge/api/Hotels/GetAll')
        .then(response => response.json())
        .then(data => {
            allHotels = data;
            displayHotels(allHotels);
        })
        .catch(error => {
            console.error('Error fetching hotels:', error);
        });

   
    function displayHotels(hotels) {
        hotelsSection.innerHTML = "";

        hotels.forEach(hotel => {
            let hotelCard = `
                <div class="card" style="width: 18rem;">
                    <img src="${hotel.featuredImage}" class="card-img-top" alt="${hotel.name}">
                    <div class="card-body">
                        <h5 class="card-title">${hotel.name}</h5>
                        <p class="card-text">${hotel.city}</p>
                        <button onclick="viewRooms(${hotel.id})" class="btn btn-primary">VIEW ROOMS</button>
                    </div>
                </div>
            `;
            hotelsSection.innerHTML += hotelCard;
        });
    }

   
    function addFilterListeners() {
        document.querySelectorAll("#hotelsTypes a").forEach(filter => {
            filter.addEventListener("click", function (event) {
                event.preventDefault();
                let selectedCity = this.getAttribute("data-type");

                document.querySelectorAll("#hotelsTypes a").forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                if (selectedCity === "All") {
                    displayHotels(allHotels); 
                } else {
                    let filteredHotels = allHotels.filter(hotel => hotel.city === selectedCity);
                    displayHotels(filteredHotels);
                }
            });
        });
    }
});


function viewRooms(id) {
    sessionStorage.setItem("hotelId", id);
    window.location.href = "./rooms.html";
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