function myFunction(event) {
    event.preventDefault(); // Prevent form submission default behavior

    var nbGames = document.getElementById("nbGames").value;
    console.log(nbGames);
    var steamID = document.getElementById("steamID").value;
    console.log(steamID);
    var apiUrl = "https://aoe2.net/api/player/matches?game=aoe2de&steam_id=" + steamID + "&count=" + nbGames;
    console.log(apiUrl);

    document.getElementById("cards").innerHTML = '<iframe src="' + apiUrl + '"></iframe>';
}
