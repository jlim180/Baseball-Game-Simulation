const simulationStartBtn = document.getElementById("submitStart");
const team1 = document.getElementById("teams1");
const team2 = document.getElementById("teams2");
let fileHandle;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const playerStats = {
    // Kia Tigers
    "펭귄": { hit: 75, single: 20, double: 25, BE: 75, minPower: 80, maxPower: 100, accuracy: 75,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0
    },
    "쉐이머스": { hit: 35, single: 55, double: 40, BE: 50, minPower: 50, maxPower: 80, accuracy: 80,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "풀범": { hit: 30, single: 55, double: 35, BE: 35, minPower: 40, maxPower: 80, accuracy: 80,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "도티": { hit: 50, single: 30, double: 30, BE: 50, minPower: 85, maxPower: 90, accuracy: 90,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},

    // Samsung Lions
    "토토": { hit: 50, single: 25, double: 45, BE: 75, minPower: 70, maxPower: 95, accuracy: 90,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "쵸파": { hit: 30, single: 60, double: 10, BE: 25, minPower: 50, maxPower: 90, accuracy: 65,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "꿀순": { hit: 40, single: 30, double: 40, BE: 50, minPower: 65, maxPower: 90, accuracy: 90,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "판다": { hit: 35, single: 40, double: 40, BE: 75, minPower: 70, maxPower: 95, accuracy: 85,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},

    // LG Twins
    "꿀뚱": { hit: 80, single: 50, double: 30, BE: 30, minPower: 70, maxPower: 100, accuracy: 95,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "잠뜰": { hit: 50, single: 10, double: 40, BE: 50, minPower: 80, maxPower: 95, accuracy: 75,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "끼끼": { hit: 20, single: 70, double: 25, BE: 30, minPower: 30, maxPower: 80, accuracy: 40,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "꿀복": { hit: 30, single: 25, double: 40, BE: 50, minPower: 80, maxPower: 95, accuracy: 70,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},

    // Lotte Giants
    "바토로": { hit: 20, single: 40, double: 35, BE:45, minPower: 60, maxPower: 85, accuracy: 60,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "돌돌": { hit: 25, single: 25, double: 50, BE: 50, minPower: 70, maxPower: 85, accuracy: 85,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "꿀땡": { hit: 70, single: 20, double: 30, BE: 75, minPower: 75, maxPower: 100, accuracy: 75,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0},
    "소소": { hit: 45, single: 40, double: 40, BE: 75, minPower: 70, maxPower: 95, accuracy: 85,
        singleCount: 0, doubleCount: 0, homerCount: 0, totalCount: 0}
}

const savedStats = localStorage.getItem("baseballPlayerStats");
if (savedStats) {
    const parsed = JSON.parse(savedStats);
    for (const player in parsed) {
        if (playerStats[player]) {
            playerStats[player].singleCount = parsed[player].singleCount || 0;
            playerStats[player].doubleCount = parsed[player].doubleCount || 0;
            playerStats[player].homerCount = parsed[player].homerCount || 0;
            playerStats[player].totalCount = parsed[player].totalCount || 0;
        }
    }
}

const pitcherStats = {
    //Kia Tigers
    "수달": {strike: 55, ball: 45, stuff: 70, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "더락": {strike: 60, ball: 40, stuff: 55, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "또또": {strike: 70, ball: 30, stuff: 40, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},

    //Samsung Lions
    "딘": {strike: 50, ball: 50, stuff: 55, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "골드버그": {strike: 70, ball: 30, stuff: 70, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "로만": {strike: 50, ball: 50, stuff: 25, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},

    //LG Twins
    "HHH": {strike: 55, ball: 45, stuff: 55, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "파이리": {strike: 70, ball: 30, stuff: 25, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "오스틴": {strike: 45, ball: 55, stuff: 55, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},

    //Lotte Giants
    "돌": {strike: 60, ball: 40, stuff: 55, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "류현진": {strike: 70, ball: 30, stuff: 25, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0},
    "지방": {strike: 50, ball: 50, stuff: 40, earnedRuns: 0, walksCount: 0, hitsCount: 0, strikeOutCount: 0, outsCount: 0}
}

const savedPitcherStats = localStorage.getItem("baseballPitcherStats");
if (savedPitcherStats) {
    const parsedPitchers = JSON.parse(savedPitcherStats);
    for (const pitcher in parsedPitchers) {
        if (pitcherStats[pitcher]) {
            pitcherStats[pitcher].earnedRuns = parsedPitchers[pitcher].earnedRuns || 0;
            pitcherStats[pitcher].walksCount = parsedPitchers[pitcher].walksCount || 0;
            pitcherStats[pitcher].hitsCount = parsedPitchers[pitcher].hitsCount || 0;
            pitcherStats[pitcher].strikeOutCount = parsedPitchers[pitcher].strikeOutCount || 0;
            pitcherStats[pitcher].outsCount = parsedPitchers[pitcher].outsCount || 0;
        }
    }
}

let customTeam1Lineup = [];
let customPitcher1Lineup = [];

let customTeam2Lineup = [];
let customPitcher2Lineup = [];

let teamOneInningScores = new Array(9).fill(0);
let teamTwoInningScores = new Array(9).fill(0);

function updateScoreboardUI(team1Name, team2Name){
        let html = `<table class="scoreboard">
        <tr>`;
    for(let i = 1; i <= 9; i++)
    {
        html += `<th>${i}</th>`;
    }
    html += `<th>R</th></tr>`;

    let team1Total = teamOneInningScores.reduce((a, b) => a + b, 0);
    let team2Total = teamTwoInningScores.reduce((a, b) => a + b, 0);

    html += `<tr><td>${team1Name}</td>`;
    for (let i = 0; i < 9; i++) {
        html += `<td>${teamOneInningScores[i] !== undefined ? teamOneInningScores[i] : ""}</td>`;
    }
    html += `<td><strong>${team1Total}</strong></td></tr>`;

    // Team 2 Row
    html += `<tr><td>${team2Name}</td>`;
    for (let i = 0; i < 9; i++) {
        html += `<td>${teamTwoInningScores[i] !== undefined ? teamTwoInningScores[i] : ""}</td>`;
    }
    html += `<td><strong>${team2Total}</strong></td></tr>`;

    html += `</table>`;

    document.getElementById("scoreDisplay").innerHTML = html;
}

simulationStartBtn.onclick = async function()
{ 
    document.getElementById("score").textContent = "";
    document.getElementById("result").textContent = "";

    const teamOne = team1.value; 
    const teamTwo = team2.value;

    
    if(teamOne==teamTwo)
    {
        document.getElementById("cantStart").textContent = "You've selected the same team. Please choose distinct teams to start the simulation.";
    }
    else
    {
        document.getElementById("cantStart").textContent = "Simulation in progress...";

        teamOneInningScores.fill(0);
        teamTwoInningScores.fill(0);

        updateScoreboardUI(teamOne, teamTwo);
        let teamOneScore = 0;
        let teamTwoScore = 0;

        let pitcher1PointLoss = [0,0,0];
        let pitcher2PointLoss = [0,0,0];

        let pitcher1OutsCount = [0,0,0];
        let pitcher2OutsCount = [0,0,0];

        let playerIndexA = 0;
        let pitcherIndexA = 0;
        let playerIndexB = 0;
        let pitcherIndexB = 0;

        let strikeCount = 0;
        let ballCount = 0;

        let inning = 1;
        let gameOver = false;
        
        let playerIndexAObj = { val: 0 };
        let playerIndexBObj = { val: 0 };
        let pitcherIndexAObj = { index: 0 };
        let pitcherIndexBObj = { index: 0 };

        while(!gameOver && inning <= 9)
        {
            document.getElementById("displayTopInning").innerHTML ="";
            document.getElementById("displayBottomInning").innerHTML ="";
            document.getElementById("bottomInning").textContent = "";
            document.getElementById("inningScoreTop").textContent = "";
            document.getElementById("inningScoreBottom").textContent = "";
            document.getElementById("topInning").textContent = `Top of Inning ${inning}`;
            await sleep(1500);
            teamOneScore = await simulateHalfInning(
                true, teamOne, teamTwo, 
                customTeam1Lineup, customPitcher2Lineup, 
                pitcher2PointLoss, teamOneInningScores, 
                teamTwoScore, teamOneScore, 
                pitcherIndexBObj, playerIndexAObj, inning
            );

            document.getElementById("inningScoreTop").textContent = `Current score is ${teamOneScore} : ${teamTwoScore}`;
            await sleep(1500);

            if(inning == 5 && teamOneScore < teamTwoScore) {
                break;
            }

            // --- BOTTOM OF INNING ---
            document.getElementById("bottomInning").textContent = `Bottom of Inning ${inning}`;
            await sleep(1500);

            teamTwoScore = await simulateHalfInning(
                false, teamOne, teamTwo, 
                customTeam2Lineup, customPitcher1Lineup, 
                pitcher1PointLoss, teamTwoInningScores, 
                teamOneScore, teamTwoScore, 
                pitcherIndexAObj, playerIndexBObj, inning
            );

            document.getElementById("inningScoreBottom").textContent = `Current score is ${teamOneScore} : ${teamTwoScore}`;
            await sleep(1500);

            if(inning >= 5)
            {
                if(!(teamOneScore == teamTwoScore))
                {
                    gameOver = true;
                }
                else if(inning == 9)
                {
                    gameOver = true;
                }
            }
            inning++;
        }
            
        
        for(let i = 0; i < pitcher1PointLoss.length; i++)
        {
            pitcherStats[customPitcher1Lineup[i]].earnedRuns += pitcher1PointLoss[i];
        }
        for(let i = 0; i < pitcher2PointLoss.length; i++)
        {
            pitcherStats[customPitcher2Lineup[i]].earnedRuns += pitcher2PointLoss[i];
        }


        let result = "";

        if(teamOneScore > teamTwoScore)
        {
            result = teamOne + ` wins!`;
        }
        else if(teamOneScore < teamTwoScore)
        {
            result = teamTwo + ` wins!`;
        }
        else
        {
            result = "draw";
        }
        document.getElementById("topInning").textContent = "";
        document.getElementById("displayTopInning").innerHTML ="";
        document.getElementById("displayBottomInning").innerHTML ="";
        document.getElementById("bottomInning").textContent = "";
        document.getElementById("inningScoreTop").textContent = "";
        document.getElementById("inningScoreBottom").textContent = "";

        setTimeout(() => 
            {
            document.getElementById("cantStart").textContent = "Simulation Complete!";
            setTimeout(() => 
                {
                    document.getElementById("score").textContent = `Final Score: ${teamOneScore} : ${teamTwoScore}`;
                    document.getElementById("result").textContent = result;

                    localStorage.setItem("baseballPlayerStats", JSON.stringify(playerStats));
                    localStorage.setItem("baseballPitcherStats", JSON.stringify(pitcherStats));
                    document.getElementById("saveStatsBtn").style.display = "block";
                }, 1000)

            }, 500)
    }
}

async function simulateHalfInning(isTeamOne, 
    teamOne, 
    teamTwo, 
    battingLineup, 
    pitcherLineup, 
    pitcherPointLossArr, 
    inningScoresArr, 
    otherTeamScore, 
    currentTeamScore, 
    pitcherIndexObj, 
    playerIndexRef, 
    inning)
{
    let outCount = 0;
    let base = [0,0,0];
    let actionText = "";

    let pitcherIndex = pitcherIndexObj.index;
    let pitcherName = pitcherLineup[pitcherIndex];
    let pitcherStatsObj = pitcherStats[pitcherName];


    while(outCount < 3)
    {
        if(pitcherPointLossArr[pitcherIndex] >= 5 && pitcherIndex < pitcherLineup.length - 1)
        {
            pitcherIndex ++;
            pitcherIndexObj.index = pitcherIndex;
            pitcherName = pitcherLineup[pitcherIndex];
            pitcherStatsObj = pitcherStats[pitcherName];

            let displayID = "";
            if(isTeamOne) displayID = "displayTopInning";
            else displayID = "displayBottomInning";

            document.getElementById(displayID).innerHTML += `<i>// Pitcher changed to ${pitcherName} //</i><br>`;
            await sleep(600);
        }
        if(playerIndexRef.val >= battingLineup.length)
        {
            playerIndexRef.val = 0;
        }

        const playerName = battingLineup[playerIndexRef.val];
        const stats = playerStats[playerName];

        if(outCount>=3)
        {
            break;
        }

        let strikeCount = 0;
        let ballCount = 0;
        let basedOnBalls = false;

        while(true)
        {
            let throww = (Math.floor(Math.random() * 100) + 1);
            if(strikeCount == 3)
            {
                outCount++;
                actionText = `${playerName} strike out!`;
                pitcherStatsObj.strikeOutCount++;
                break;
            }
            if(ballCount == 4)
            {
                base.unshift(1);
                if(checkHome(base))
                {
                    currentTeamScore++;
                    pitcherPointLossArr[pitcherIndex]++;
                    base[2] = 0;
                    inningScoresArr[inning - 1]++;
                    updateScoreboardUI(teamOne, teamTwo);
                }
                base.pop();
                basedOnBalls = true;
                actionText = `${playerName} based on balls!`;
                pitcherStatsObj.walksCount++;
                break;
            }

            let acc = (Math.floor(Math.random() * 100) + 1);
            let pow = (Math.floor(Math.random() * (stats.maxPower - stats.minPower + 1)) + stats.minPower +1);
            let be = Math.floor(Math.random() * 100) + 1;
            let Stuff = Math.floor(Math.random() * (100 - pitcherStatsObj.stuff +1)) + pitcherStatsObj.stuff;
            let hit = Math.floor(Math.random() * 100) + 1;

            if(throww <= pitcherStatsObj.strike)
            {
                if(be <= stats.BE) //선구안 성공
                {
                    if(acc <= stats.accuracy) //정확 성공
                    {
                        if(pow >= Stuff)
                        {
                            let hitType = "";
                            if(hit <= stats.single) hitType = "single";
                            else if(hit <= stats.single + stats.double) hitType = "double";
                            else hitType = "homer";

                            let result = handleHit(
                                hitType, playerName, base, currentTeamScore, 
                                pitcherPointLossArr[pitcherIndex], inningScoresArr, 
                                inning, teamOne, teamTwo, 
                                pitcherStatsObj, pitcherName, 
                                playerStats[playerName]
                            );

                            currentTeamScore = result.teamScore;
                            pitcherPointLossArr[pitcherIndex] = result.pitcherPointLoss;
                            base = result.base;
                            actionText = result.actionText;
                            break; 
                        }
                        else
                        {
                            let dubOutValue = Math.floor(Math.random() * 10) + 1;
                            let result = doubleOut(
                                dubOutValue, currentTeamScore, pitcherStatsObj, 
                                outCount, base, playerName, 
                                inningScoresArr, inning, teamOne, teamTwo
                            );

                            currentTeamScore = result.teamScore;
                            base = result.base;
                            actionText = result.actionText;
                            outCount = result.outCount;
                            break;
                        }
                    }
                    else
                    {
                        if(pow >= Stuff)
                        {
                            if(Math.floor(Math.random() * 10) + 1 <= 5)
                            {
                                let flyOutVal = Math.floor(Math.random() * 10) + 1;
                                let result = flyOut(
                                    flyOutVal, outCount, base, pitcherStatsObj, currentTeamScore,
                                    teamOne, teamTwo, playerName,
                                    inningScoresArr, inning
                                );

                                currentTeamScore = result.teamScore;
                                outCount = result.outCount;
                                actionText = result.actionText;
                                base = result.base;
                            }
                            else
                            {
                                let dubOutValue = Math.floor(Math.random() * 10) + 1;
                                let result = doubleOut(
                                    dubOutValue, currentTeamScore, pitcherStatsObj, 
                                    outCount, base, playerName, 
                                    inningScoresArr, inning, teamOne, teamTwo
                                );

                                currentTeamScore = result.teamScore;
                                base = result.base;
                                actionText = result.actionText;
                                outCount = result.outCount;
                            }
                            break;
                        }
                        else
                        {
                            //foul
                            if(strikeCount<2)
                            {
                                strikeCount++;
                            }
                        }
                    }
                }
                else
                {
                    strikeCount++;
                }
            }
            else
            {
                if(be <= stats.BE)
                {
                    ballCount++;
                }
                else
                {
                    if(acc <= stats.accuracy)
                    {
                        //foul
                        if(strikeCount<2)
                        {
                            strikeCount++;
                        }
                    }
                    else
                    {
                        if(hit < stats.hit / 3)
                        {
                            if(pow >= Stuff)
                            {
                                let hitType = "";
                                if(hit <= stats.single) hitType = "single";
                                else if(hit <= stats.single + stats.double) hitType = "double";
                                else hitType = "homer";

                                let result = handleHit(
                                    hitType, playerName, base, currentTeamScore, 
                                    pitcherPointLossArr[pitcherIndex], inningScoresArr, 
                                    inning, teamOne, teamTwo, 
                                    pitcherStatsObj, pitcherName, 
                                    playerStats[playerName]
                                );

                                currentTeamScore = result.teamScore;
                                pitcherPointLossArr[pitcherIndex] = result.pitcherPointLoss;
                                base = result.base;
                                actionText = result.actionText;
                                break; 
                            }
                            else
                            {
                                let dubOutValue = Math.floor(Math.random() * 10) + 1;
                                let result = doubleOut(
                                    dubOutValue, currentTeamScore, pitcherStatsObj, 
                                    outCount, base, playerName, 
                                    inningScoresArr, inning, teamOne, teamTwo
                                );

                                currentTeamScore = result.teamScore;
                                base = result.base;
                                actionText = result.actionText;
                                outCount = result.outCount;
                                break;
                            }
                        }
                        else
                        {
                            strikeCount++;
                        }
                    }
                }
            }
        }
        if(!basedOnBalls)
        {
            playerStats[playerName].totalCount++;
        }

        let displayID = "";
        if(isTeamOne) displayID = "displayTopInning";
        else displayID = "displayBottomInning";

        document.getElementById(displayID).innerHTML += actionText+`<br>`;
        await sleep(600);
        playerIndexRef.val++;
    }
    return currentTeamScore;
}

function flyOut(flyOutValue, outCount, base, pitcherStatsObj, teamScore, teamOne, teamTwo, playerName, inningScores, inning){
    let actionText = "";
    if(flyOutValue <= 5)
    {
        if(base[1] == 1 && outCount < 2)
        {
            let tagUp = Math.floor(Math.random() * 10) + 1;
            if(tagUp <= 6)
            {
                actionText = `${playerName} flied out, and the runner on
                2nd base tags up and scores!`;
                teamScore++;
                inningScores[inning - 1]++;
                updateScoreboardUI(teamOne, teamTwo);
                base[1] = 0;
            }
            else
            {
                actionText = `${playerName} flied out; runner holds at 2nd`;
            }
        }
        else
        {
            actionText = `${playerName} flied out`;
        }
        
    }
    else
    {
        actionText = `${playerName} infield fly out.`;
    }
    pitcherStatsObj.outsCount ++;
    outCount++; 
    return {teamScore, outCount, actionText, base};
}

function doubleOut(dubOutValue, teamScore, pitcherStatsObj, outCount, base, playerName, inningScores, inning, teamOne, teamTwo)
{
    let actionText = "";
    if(dubOutValue <= 2 && outCount < 2 && base[0] == 1)
    {
        if(base[1] == 1 && outCount == 0)
        {
            teamScore++;
            base[1] = 0;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
            actionText = `${playerName} double out, but the runner on
            second base scores!`;
        }
        else
        {
            actionText = `${playerName} double out`;
        }
        base[0] = 0;
        outCount += 2;
        pitcherStatsObj.outsCount += 2;
    }
    else
    {
        if(base[1] == 1 && outCount < 2)
        {
            teamScore++;
            base[1] = 0;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
            actionText = `${playerName} ground out, but the runner on
            second base scores!`;
        }
        else
        {
            actionText = `${playerName} ground out`;
        }
        outCount++;
        pitcherStatsObj.outsCount++;
    }
    return {teamScore, base, actionText, outCount};
}

function handleHit(hitType, playerName, base, teamScore, pitcherPointLoss, inningScores, inning, teamOne, teamTwo, pitcherStatsObj, pitchername, playerStatsObj)
{
    let actionText = "";

    if(hitType == "single")
    {
        base.unshift(1);
        if(checkHome(base))
        {
            teamScore++;
            pitcherPointLoss++;
            base[2] = 0;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        base.pop();
        actionText = `${playerName} hit a single hit!`;
        playerStatsObj.singleCount++;
        pitcherStatsObj.hitsCount++;
    }
    else if (hitType === "double") {
        if (base[0] == 1) {
            teamScore++;
            pitcherPointLoss++;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        if (base[1] == 1) {
            teamScore++;
            pitcherPointLoss++;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        base = [0, 1, 0];
        actionText = `${playerName} hit a double hit!`;
        playerStatsObj.doubleCount++;
        pitcherStatsObj.hitsCount++;
    } 
    else if (hitType === "homer") {
        if (base[0] == 1) {
            teamScore++;
            pitcherPointLoss++;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        if (base[1] == 1) {
            teamScore++;
            pitcherPointLoss++;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        if (base[2] == 1) {
            teamScore++;
            pitcherPointLoss++;
            inningScores[inning - 1]++;
            updateScoreboardUI(teamOne, teamTwo);
        }
        teamScore++;
        pitcherPointLoss++;
        base = [0, 0, 0];
        actionText = `${playerName} hit a homer!`;
        playerStatsObj.homerCount++;
        pitcherStatsObj.hitsCount++;
        inningScores[inning - 1]++;
        updateScoreboardUI(teamOne, teamTwo);
    }

    return { teamScore, pitcherPointLoss, base, actionText };
}

document.getElementById("saveStatsBtn").onclick = function() {
    saveDirectToFile();
};

function checkHome(element){
    return element[2]==1;
}

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
}

// If the player has reassigned anyone in the Team Manager page, use that
// lineup instead of the default rosters above.
const savedTeamRosters = localStorage.getItem("customTeamRosters");
const savedTeamPitchers = localStorage.getItem("customTeamPitchers");

const teamRosters = savedTeamRosters ? JSON.parse(savedTeamRosters) : defaultTeamRosters;
const teamPitchers = savedTeamPitchers ? JSON.parse(savedTeamPitchers) : defaultTeamPitchers;
const rosterDisplayBtn = document.getElementById("submitTeams");
const lineupDisplay1 = document.getElementById("lineupDisplay1");
const lineupDisplay2 = document.getElementById("lineupDisplay2");


rosterDisplayBtn.onclick = function(){

    if(team1.value == "Choose a team" || team2.value == "Choose a team")
    {
        document.getElementById("noSubmitTeam").textContent = "Please choose a team";
        return;
    }
    else
    {
        document.getElementById("noSubmitTeam").textContent = "";
        document.getElementById("submitRoster").style.display = "block";
        const roster1 = teamRosters[team1.value];
        const pitcher1 = teamPitchers[team1.value];

        const roster2 = teamRosters[team2.value];
        const pitcher2 = teamPitchers[team2.value];
        let lineupHTML1 = `<h3>${team1.value} Lineup:</h3><ul>`;
        let lineupHTML2 = `<h3>${team2.value} Lineup:</h3><ul>`;

        roster1.forEach((_, index) => {
            lineupHTML1 += `
            <div>
                <label for="team1_pos${index}">Batter ${index + 1}: </label>
                <select id="team1_pos${index}">
            `;
            roster1.forEach((playerName, playerIndex) => {
                let isSelected = playerIndex === index ? "selected" : "";
                lineupHTML1 += `<option value="${playerName}" ${isSelected}>${playerName}</option>`;
            });
            lineupHTML1 += `</select></div>`;
        });

        pitcher1.forEach((_, index) => {
            lineupHTML1 += `
            <div>
                <label for="team11_pos${index}">Pitcher ${index + 1}: </label>
                <select id="team11_pos${index}">
            `;
            pitcher1.forEach((playerName, playerIndex) => {
                let isSelected = playerIndex === index ? "selected" : "";
                lineupHTML1 += `<option value="${playerName}" ${isSelected}>${playerName}</option>`;
            });
            lineupHTML1 += `</select></div>`;
        });



        roster2.forEach((_, index) => {
            lineupHTML2 += `
            <div>
                <label for="team2_pos${index}">Batter ${index + 1}: </label>
                <select id="team2_pos${index}">
            `;
            roster2.forEach((playerName, playerIndex) => {
                let isSelected = playerIndex === index ? "selected" : "";
                lineupHTML2 += `<option value="${playerName}" ${isSelected}>${playerName}</option>`;
            });
            lineupHTML2 += `</select></div>`;
        });

        pitcher2.forEach((_, index) => {
            lineupHTML2 += `
            <div>
                <label for="team22_pos${index}">Pitcher ${index + 1}: </label>
                <select id="team22_pos${index}">
            `;
            pitcher2.forEach((playerName, playerIndex) => {
                let isSelected = playerIndex === index ? "selected" : "";
                lineupHTML2 += `<option value="${playerName}" ${isSelected}>${playerName}</option>`;
            });
            lineupHTML2 += `</select></div>`;
        });

        lineupDisplay1.innerHTML = lineupHTML1;
        lineupDisplay2.innerHTML = lineupHTML2;
    }
    
}

document.getElementById("submitRoster").onclick = function(){
    document.getElementById("rosterSubmitted").style.display = "block";
    document.getElementById("submitStart").style.display = "block";

    customTeam1Lineup = [];
    customPitcher1Lineup = [];

    customTeam2Lineup = [];
    customPitcher2Lineup = [];

        for(let i = 0; i < 4; i++)
        {
            const selectElement1 = document.getElementById(`team1_pos${i}`);
            const selectElement2 = document.getElementById(`team2_pos${i}`);
            if (selectElement1) {
                customTeam1Lineup.push(selectElement1.value);
            } 
            if(selectElement2)
            {
                customTeam2Lineup.push(selectElement2.value);
            }
        }

        for(let i = 0; i < teamPitchers[team1.value].length; i++)
        {
            const selectElement = document.getElementById(`team11_pos${i}`);
            if(selectElement)
            {
                customPitcher1Lineup.push(selectElement.value);
            }
        }

        for(let i = 0; i < teamPitchers[team2.value].length; i++)
        {
            const selectElement = document.getElementById(`team22_pos${i}`);
            if(selectElement)
            {
                customPitcher2Lineup.push(selectElement.value);
            }
        }       
}
document.getElementById("refresh").onclick = function(){
    window.location.href = "simulationPage.html";
}
document.getElementById("goBack").onclick = function(){
    window.location.href = "main.html";
}


async function saveDirectToFile() {
    try{
        if(!fileHandle)
        {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: 'player_stats.txt',
                types: [{
                    description: 'Text Documents',
                    accept: {'text/plain': ['.txt']},
                }],
            });
        }

        let textContent = "=== PLAYER STATS RECORD ===\n\n";
        for(const [playerName, stats] of Object.entries(playerStats)){
            textContent += `Player: ${playerName}\n`;
            textContent += `  Singles: ${stats.singleCount || 0}\n`;
            textContent += `  Doubles: ${stats.doubleCount || 0}\n`;
            textContent += `  Home Runs: ${stats.homerCount || 0}\n`;

            const totalHits = (stats.singleCount || 0) + (stats.doubleCount || 0) + (stats.homerCount || 0);
            const totalAtBats = stats.totalCount || 0;
            const avg = totalAtBats > 0 ? (totalHits / totalAtBats).toFixed(3) : "0.000";
            textContent += ` Hitting Average: ${avg}\n`;
            textContent += `-----------------------------\n`;
        }

        textContent += "\n\n=== PITCHER STATS RECORD ===\n\n";

        for(const [pitcherName, stats] of Object.entries(pitcherStats)){
            const totalOuts = (stats.strikeOutCount || 0) + (stats.outsCount || 0);
            const decimalInnings = totalOuts / 3;

            const era = decimalInnings > 0 ? (5 * (stats.earnedRuns || 0) / decimalInnings).toFixed(2) : "0.00";
            const whip = decimalInnings > 0 ? (((stats.walksCount || 0) + (stats.hitsCount || 0)) / decimalInnings).toFixed(2) : "0.00";
            textContent += `Pitcher: ${pitcherName}\n`;
            textContent += `  Innings Pitched: ${decimalInnings.toFixed(1)}\n`;
            textContent += `  ERA: ${era}\n`;
            textContent += `  WHIP: ${whip}\n`;
            textContent += `-----------------------------\n`;
        }

        const writable = await fileHandle.createWritable();
        await writable.write(textContent);
        await writable.close();

        alert("Player stats saved successfully!");
    }
    catch(err)
    {
        console.error("Save canceled or failed: ", err);
    }
}

document.getElementById("resetStatsBtn").onclick = function() {
    localStorage.removeItem("baseballPlayerStats");
    localStorage.removeItem("baseballPitcherStats");
    alert("Stats reset! Refresh the page to start clean.");
};