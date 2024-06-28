// console.log(navigator.geolocation);
// console.log(navigator.geolocation);
const showDetails = document.querySelector(".showDetails");
const fullAddress = document.querySelector(".fullAddress")
const forAddress = document.querySelector(".forAddress");

let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json"
let apiKey = "aec9723ee6d74361b7c3888dd3962a40"
const getuserCurrentAddress = async (latitude, longitude) => {
    // console.log(latitude);
    let query = `${latitude}, ${longitude}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const { city, state, postcode, country } = data.results[0].components;
        fullAddress.textContent = `user address: ${city}, ${postcode} ${state} ,${country} `;
        forAddress.textContent = `User full adress: ${data.results[0].formatted}`;
        // console.log(data.results[0]);
        // fullAddress.textContent=document
    } catch (error) {
        console.log(error);
    }
};

// const showDetails = document.querySelector(".showDetails");
document.querySelector(".but").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (postion) => {


                // console.log(postion.coords.latitude);
                const { latitude, longitude } = postion.coords;
                showDetails.textContent = `The latitude ${latitude} & longitude ${longitude}`;
                getuserCurrentAddress(latitude, longitude);
                let query = `${latitude}, ${longitude}`;

            },
            (error) => {
                showDetails.textContent = error.message;
                console.log(error.message);
            }

        );
    }
});