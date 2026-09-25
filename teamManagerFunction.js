// Same default rosters used by simulationFunction.js, kept in sync manually.
const defaultTeamRosters = {
  "Kia Tigers": ["펭귄", "쉐이머스", "풀범", "도티"],
  "Samsung Lions": ["토토", "쵸파", "꿀순", "판다"],
  "LG Twins": ["꿀뚱", "잠뜰", "끼끼", "꿀복"],
  "Lotte Giants": ["바토로", "돌돌", "꿀땡", "소소"]
};
const defaultTeamPitchers = {
    "Kia Tigers": ["더락", "수달", "또또"],
    "Samsung Lions": ["딘", "골드버그", "로만"],
    "LG Twins": ["HHH", "파이리", "오스틴"],
    "Lotte Giants": ["돌", "류현진", "지방"]
};

const teamNames = Object.keys(defaultTeamRosters);

function loadCurrentAssignments() {
    const savedRosters = localStorage.getItem("customTeamRosters");
    const savedPitchers = localStorage.getItem("customTeamPitchers");
    return {
        rosters: savedRosters ? JSON.parse(savedRosters) : JSON.parse(JSON.stringify(defaultTeamRosters)),
        pitchers: savedPitchers ? JSON.parse(savedPitchers) : JSON.parse(JSON.stringify(defaultTeamPitchers))
    };
}

function teamSelectOptions(currentTeam) {
    return teamNames.map(name => {
        const selected = name === currentTeam ? "selected" : "";
        return `<option value="${name}" ${selected}>${name}</option>`;
    }).join("");
}

function renderBoard() {
    const { rosters, pitchers } = loadCurrentAssignments();
    const board = document.getElementById("teamBoard");
    let html = "";

    teamNames.forEach(team => {
                html += `<div class="teamPanel" data-team="${team}"><h2>${team}</h2>`;

        html += `<h3>Batters</h3>`;
        rosters[team].forEach(player => {
            html += `
            <div class="playerRow">
                <span>${player}</span>
                <select data-role="batter" data-player="${player}" id="assign_batter_${player}">
                    ${teamSelectOptions(team)}
                </select>
            </div>`;
        });

        html += `<h3>Pitchers</h3>`;
        pitchers[team].forEach(player => {
            html += `
            <div class="playerRow">
                <span>${player}</span>
                <select data-role="pitcher" data-player="${player}" id="assign_pitcher_${player}">
                    ${teamSelectOptions(team)}
                </select>
            </div>`;
        });

        html += `</div>`;
    });

    board.innerHTML = html;
}

function collectAssignmentsFromUI() {
    const newRosters = {};
    const newPitchers = {};
    teamNames.forEach(team => {
        newRosters[team] = [];
        newPitchers[team] = [];
    });

    document.querySelectorAll('select[data-role="batter"]').forEach(select => {
        newRosters[select.value].push(select.dataset.player);
    });
    document.querySelectorAll('select[data-role="pitcher"]').forEach(select => {
        newPitchers[select.value].push(select.dataset.player);
    });

    return { newRosters, newPitchers };
}

document.getElementById("saveTeamsBtn").onclick = function () {
    const { newRosters, newPitchers } = collectAssignmentsFromUI();

    const emptyBatterTeam = teamNames.find(team => newRosters[team].length === 0);
    const emptyPitcherTeam = teamNames.find(team => newPitchers[team].length === 0);

    if (emptyBatterTeam || emptyPitcherTeam) {
        document.getElementById("warning").textContent =
            `Every team needs at least one batter and one pitcher. ${emptyBatterTeam ? emptyBatterTeam + " has no batters. " : ""}${emptyPitcherTeam ? emptyPitcherTeam + " has no pitchers." : ""}`;
        document.getElementById("savedMsg").textContent = "";
        return;
    }

    document.getElementById("warning").textContent = "";
    localStorage.setItem("customTeamRosters", JSON.stringify(newRosters));
    localStorage.setItem("customTeamPitchers", JSON.stringify(newPitchers));
        document.getElementById("savedMsg").textContent = "Saved! The simulation page will use these teams now.";
    renderBoard();
};

document.getElementById("resetTeamsBtn").onclick = function () {
    localStorage.removeItem("customTeamRosters");
    localStorage.removeItem("customTeamPitchers");
    document.getElementById("warning").textContent = "";
    document.getElementById("savedMsg").textContent = "Reset to default teams.";
    renderBoard();
};

document.getElementById("goBack").onclick = function () {
    window.location.href = "main.html";
};

renderBoard();
