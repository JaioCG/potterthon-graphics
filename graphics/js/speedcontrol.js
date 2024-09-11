'use strict';
$(() => {
    // JQuery selectors
	var gameTitle = $('#game-title');
	var gameSystem = $('#game-platform');
    var runCategory = $('#run-category');
	var runEstimate = $('#run-estimate');
	var p1Name = $('#p1-name');
    var p2Name = $('#p2-name');
    var p3Name = $('#p3-name');
    var p4Name = $('#p4-name');
	
    // Runs whenevever speedcontrol run data changes
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});

    // Updates graphics
	function updateSceneFields(runData) {
        // Game / run data
		gameTitle.html(runData.game);
		gameSystem.html(runData.system);
        runCategory.html(runData.category);
		runEstimate.html(runData.estimate);
		
        // Player data
        var playerNames = [];
        for (let i = 0; i < runData.teams.players.length; i++) {
            var currentPlayer = (runData.teams[0].players[i].pronouns === undefined) ?
                runData.teams[0].players[i].name :
                runData.teams[0].players[i].name + ' [' + runData.teams[0].players[i].pronouns + ']';  
            playerNames[i] = currentPlayer;
        }
        p1Name.html(playerNames[0]);
        p2Name.html(playerNames[1]);
        p3Name.html(playerNames[2]);
        p4Name.html(playerNames[3]);
	}
});