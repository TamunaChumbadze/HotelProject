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
  
  document.addEventListener("DOMContentLoaded", function () {
    let bookedContent = document.getElementById("booked-content");
  
    fetch("https://hotelbooking.stepprojects.ge/api/Booking")
      .then((response) => response.json())
      .then((bookings) => {
        if (bookings.length === 0) {
          bookedContent.innerHTML =
            "<p class='text-center'>No bookings found.</p>";
          return;
        }
  
        let tableHTML = `
                  <table class="table table-bordered table-striped">
                      <thead class="table-dark">
                          <tr>
                             
                              <th>Room</th>
                              <th>Customer</th>
                              <th>Status</th>
                              <th>Check-in</th>
                              <th>Check-out</th>
                              <th>Total Price</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
              `;
  
        bookings.forEach((booking) => {
          tableHTML += `
                    <tr>
        <td data-label="Room">${booking.roomID}</td>
        <td data-label="Customer">
          <strong>Name:</strong> ${booking.customerName} <br>
          <strong>Phone:</strong> ${booking.customerPhone}
        </td>
        <td data-label="Status">
          <span class="badge bg-secondary">Booked</span>
        </td>
        <td data-label="Check-in"><strong>${booking.checkInDate}</strong></td>
        <td data-label="Check-out"><strong>${booking.checkOutDate}</strong></td>
        <td data-label="Total Price">${booking.totalPrice}€</td>
        <td data-label="Actions">
          <button class="bookingBtn btn-danger btn-sm" onclick="cancelBooking(${booking.id})">CANCEL BOOKING</button>
        </td>
      </tr>
                  `;
        });
        console.log(bookings);
  
        tableHTML += `</tbody></table>`;
        bookedContent.innerHTML = tableHTML;
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        bookedContent.innerHTML =
          "<p class='text-danger'>Failed to load bookings.</p>";
      });
  });
  
  function cancelBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      fetch(`https://hotelbooking.stepprojects.ge/api/Booking/${bookingId}`, {
        method: "DELETE",
        headers: { Accept: "*/*" },
      })
        .then((response) => {
          if (response.ok) {
            alert("Booking canceled successfully.");
            location.reload();
          } else {
            alert("Failed to cancel booking.");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
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