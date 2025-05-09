const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const selectionOutput = document.getElementById("selection");

async function populateCountries() {
  const res = await fetch("https://crio-location-selector.onrender.com/countries");
  const countries = await res.json();
  countries.forEach(country => {
    const option = document.createElement("option");
    option.setAttribute("key", country);
    option.setAttribute("value", country);
    option.textContent = country;
    countrySelect.appendChild(option);
  });
}

countrySelect.addEventListener("change", async () => {
  const country = countrySelect.value;
  stateSelect.innerHTML = '<option key="" value="">Select State</option>';
  citySelect.innerHTML = '<option key="" value="">Select City</option>';
  stateSelect.disabled = true;
  citySelect.disabled = true;
  selectionOutput.textContent = "";

  if (country) {
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
    const states = await res.json();
    states.forEach(state => {
      const option = document.createElement("option");
      option.setAttribute("key", state);
      option.setAttribute("value", state);
      option.textContent = state;
      stateSelect.appendChild(option);
    });
    stateSelect.disabled = false;
  }
});

stateSelect.addEventListener("change", async () => {
  const country = countrySelect.value;
  const state = stateSelect.value;
  citySelect.innerHTML = '<option key="" value="">Select City</option>';
  citySelect.disabled = true;
  selectionOutput.textContent = "";

  if (state) {
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
    const cities = await res.json();
    cities.forEach(city => {
      const option = document.createElement("option");
      option.setAttribute("key", city);
      option.setAttribute("value", city);
      option.textContent = city;
      citySelect.appendChild(option);
    });
    citySelect.disabled = false;
  }
});

citySelect.addEventListener("change", () => {
  const country = countrySelect.value;
  const state = stateSelect.value;
  const city = citySelect.value;

  if (city && state && country) {
    selectionOutput.textContent = `You selected ${city}, ${state}, ${country}`;
  }
});

// Init
populateCountries();
