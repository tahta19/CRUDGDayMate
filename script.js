document.addEventListener("DOMContentLoaded", function () {
    let itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
    renderItineraries();

    document.getElementById("addItineraryBtn").addEventListener("click", addItinerary);

    function addItinerary() {
        let tripName = document.getElementById("trip-name").value;
        let startDate = document.getElementById("start-date").value;
        let days = document.getElementById("days").value;
        let preferences = document.getElementById("preferences").value;
        let hotel = document.getElementById("hotel").value;
        let kuliner = document.getElementById("culinary").value;
        let tempatWisata = document.getElementById("destination").value;
        let transportasi = document.getElementById("transportation").value;

        if (!tripName || !startDate || !days) {
            alert("Harap isi semua bidang wajib!");
            return;
        }

        let itinerary = { 
            id: Date.now(), 
            tripName, 
            startDate, 
            days, 
            preferences, 
            hotel, 
            kuliner, 
            tempatWisata, 
            transportasi 
        };

        itineraries.push(itinerary);
        saveItineraries();
        renderItineraries();
        resetForm();
    }

    function renderItineraries() {
        let tableBody = document.getElementById("itinerary-list");
        tableBody.innerHTML = "";

        itineraries.forEach(itinerary => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><strong>${itinerary.tripName}</strong></td>
                <td>${itinerary.startDate}</td>
                <td>${itinerary.days} hari</td>
                <td>${itinerary.hotel}</td>
                <td>${itinerary.kuliner}</td>
                <td>${itinerary.tempatWisata}</td>
                <td>${itinerary.transportasi}</td>
                <td>
                    <button onclick="editItinerary(${itinerary.id})">Edit</button>
                    <button onclick="deleteItinerary(${itinerary.id})">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editItinerary = function (id) {
        let itinerary = itineraries.find(it => it.id === id);
        document.getElementById("trip-name").value = itinerary.tripName;
        document.getElementById("start-date").value = itinerary.startDate;
        document.getElementById("days").value = itinerary.days;
        document.getElementById("preferences").value = itinerary.preferences;
        document.getElementById("hotel").value = itinerary.hotel;
        document.getElementById("culinary").value = itinerary.kuliner;
        document.getElementById("destination").value = itinerary.tempatWisata;
        document.getElementById("transportation").value = itinerary.transportasi;
        
        deleteItinerary(id);
    };

    window.deleteItinerary = function (id) {
        itineraries = itineraries.filter(it => it.id !== id);
        saveItineraries();
        renderItineraries();
    };

    function saveItineraries() {
        localStorage.setItem("itineraries", JSON.stringify(itineraries));
    }

    function resetForm() {
        document.getElementById("trip-name").value = "";
        document.getElementById("start-date").value = "";
        document.getElementById("days").value = "";
        document.getElementById("preferences").value = "adventure";
        document.getElementById("hotel").value = "";
        document.getElementById("culinary").value = "";
        document.getElementById("destination").value = "";
        document.getElementById("transportation").value = "";
    }
});
