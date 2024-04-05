document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        var nbGames = document.getElementById("nbGames").value;
        console.log(nbGames);
        var steamID = document.getElementById("steamID").value;
        console.log(steamID);
        var apiUrl = "https://aoe2.net/api/player/matches?game=aoe2de&steam_id=" + steamID + "&count=" + nbGames;
        console.log(apiUrl);

        fetch(apiUrl)
            .then(response => response.json())
            .then(completedata => {
                console.log(completedata[0]);
                let data1 = "";
                completedata.forEach(values => {
                    data1 += `
                        <div class="cards">
                            <h3 class="matchID">${values.match_id}</h3>
                            <ul>
                                <li>Average rating : ${values.average_rating}</li>
                                <li>Number of players : ${values.num_players}</li>
                                <li>Map type : ${values.map_type}</li>
                                <li>Victory : ${values.victory}</li>
                            </ul> 
                        </div>`;
                });
                document.getElementById("cards").innerHTML = data1;
            })
            .catch(error => {
                console.log(error);
            });
    });
});
