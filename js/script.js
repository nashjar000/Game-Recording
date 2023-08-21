const recordedGames = []; // Initialize an array to store recorded games

document.getElementById("add-player").addEventListener("click", function() {
    const playerList = document.getElementById("player-list");
    const playerEntryTemplate = document.querySelector(".template");

    const playerEntry = playerEntryTemplate.cloneNode(true);
    playerEntry.classList.remove("template");
    playerEntry.style.display = "block"; // Show the new player entry

    playerList.appendChild(playerEntry);
    
    const removeButton = playerEntry.querySelector(".remove-player");
    removeButton.addEventListener("click", function() {
        playerList.removeChild(playerEntry);
    });
});

document.getElementById("record-game").addEventListener("click", function() {
    const gameName = document.getElementById("game-name").value;
    const playerEntries = document.querySelectorAll(".player-entry:not(.template)");
    const playerNames = [];
    const playerScores = [];
    
    playerEntries.forEach(entry => {
        const playerName = entry.querySelector(".player-name").value;
        const playerScore = entry.querySelector(".player-score").value;
        
        playerNames.push(playerName);
        playerScores.push(playerScore);
    });

    const recordedGame = {
        gameName,
        playerNames,
        playerScores
    };

    recordedGames.push(recordedGame); // Add the recorded game to the array
    updateRecordedGames(); // Update the recorded games section
    
    // Clear the form fields and remove player entries
    document.getElementById("game-name").value = "";
    document.querySelectorAll(".player-entry:not(.template)").forEach(entry => entry.remove());
});

function updateRecordedGames() {
    const recordedGamesDiv = document.getElementById("recorded-games");
    recordedGamesDiv.innerHTML = "";

    // Reverse the order of recordedGames to show the most recent game first
    const reversedGames = recordedGames.slice().reverse();

    reversedGames.forEach(game => {
        const gameEntry = document.createElement("div");
        gameEntry.className = "recorded-game-entry";

        const gameInfo = document.createElement("div");
        gameInfo.className = "game-details";

        const gameLabel = document.createElement("div");
        gameLabel.className = "label";
        gameLabel.textContent = "Game:";

        const gameName = document.createElement("div");
        gameName.className = "game-name"; 
        gameName.textContent = game.gameName;

        gameInfo.appendChild(gameLabel);
        gameInfo.appendChild(gameName);
        gameEntry.appendChild(gameInfo);

        const table = document.createElement("table");
        table.className = "game-table";

        const tableHeaderRow = document.createElement("tr");

        const playerNameHeader = document.createElement("th");
        playerNameHeader.textContent = "Player Name";
        const playerScoreHeader = document.createElement("th");
        playerScoreHeader.textContent = "Player Score";

        tableHeaderRow.appendChild(playerNameHeader);
        tableHeaderRow.appendChild(playerScoreHeader);
        table.appendChild(tableHeaderRow);

        const sortedPlayers = game.playerNames.map((name, index) => ({
            name,
            score: parseInt(game.playerScores[index])
        })).sort((a, b) => b.score - a.score);

        sortedPlayers.forEach(player => {
            const playerRow = document.createElement("tr");
            const playerNameCell = document.createElement("td");
            playerNameCell.className = "player-name";
            playerNameCell.textContent = player.name;

            const playerScoreCell = document.createElement("td");
            playerScoreCell.className = "player-score";
            playerScoreCell.textContent = player.score;

            playerRow.appendChild(playerNameCell);
            playerRow.appendChild(playerScoreCell);

            if (player.score === sortedPlayers[0].score) {
                playerScoreCell.classList.add("highest-score");
            }

            table.appendChild(playerRow);
        });

        gameEntry.appendChild(table);
        recordedGamesDiv.appendChild(gameEntry);
    });
}