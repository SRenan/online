// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    var nbGames = document.getElementById("nbGames").value;
    console.log(nbGames);
    var steamID = document.getElementById("steamID").value;
    console.log(steamID);
    var apiUrl = "https://aoe2.net/api/player/matches?game=aoe2de&steam_id=" + steamID + "&count=" + nbGames;
    console.log(apiUrl);

    // Create a new <a> element
    var linkElement = document.createElement("a");
    linkElement.href = apiUrl; // Set the href attribute to the constructed URL
    linkElement.textContent = apiUrl; // Set the text content of the link to the URL
    linkElement.target = "_blank"; // Open the link in a new tab or window

    // Clear previous content in the "cards" div and append the link
    var cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = ""; // Clear previous content
    cardsDiv.appendChild(linkElement); // Append the link
}

// Add an event listener to the form
document.getElementById("myForm").addEventListener("submit", handleFormSubmission);
