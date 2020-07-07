function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8082/test")
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      document.getElementById("results").innerHTML = data.title;
    })
    .then(
      getWeather(
        "https://api.openweathermap.org/data/2.5/weather?zip=01581,us&appid=5d440dcd25ae78fd3e21200458636bba&units=imperial"
      ).then(function (response) {updateUI(response)})
    );
}

const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async (response) => {
  try {
    document.getElementById("response").innerHTML = response.main.temp;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
