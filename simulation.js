const simulationBtn = document.getElementById("mySimulator");
const fantasySimulationBtn = document.getElementById("fantasySimulator");
const manageTeamsBtn = document.getElementById("manageTeams");
simulationBtn.onclick = function(){
    window.location.href = "simulationPage.html";
}
fantasySimulationBtn.onclick = function(){
    window.location.href = "fantasySimulationPage.html";
}
manageTeamsBtn.onclick = function(){
    window.location.href = "teamManager.html";
}

