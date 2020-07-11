function handleSubmit(event) {
  event.preventDefault();

  document.getElementById("text").innerHTML = "";
  document.getElementById("status").innerHTML = "";
  document.getElementById("polarity").innerHTML = "";

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  const validURL = Client.checkForURL(formText);

  if (validURL) {
    console.log("::: Form Submitted :::");
    document.getElementById("status").innerHTML = "Loading...";

    postData("/addUserEntry", {
      url: formText,
    }).then(
      //update UI with alyien text API response
      async () => {
        updateUI();
      }
    );
  } else {
    alert("invalid url");
  }
}

const updateUI = async () => {
  try {
    const request = await fetch("/projectData");
    const projectData = await request.json();
    document.getElementById("status").innerHTML = projectData.status;
    document.getElementById("polarity").innerHTML = projectData.polarity;
    document.getElementById("text").innerHTML = projectData.text;
  } catch (error) {
    console.log("error", error);
  }
};

//Boilerplate POST documentation
const postData = async (url = " ", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
