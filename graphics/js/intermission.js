// Util functions taken from https://github.com/nicnacnic/speedcontrol-layouts/blob/main/graphics/js/layouts/intermission.js

let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
    let nextRuns = [];
    let indexOfCurrentRun = findIndexInRunDataArray(runData);
    for (let i = 1; i <= amount; i++) {
        if (!runDataArray.value[indexOfCurrentRun + i]) {
            break;
        }
        nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
    }
    return nextRuns;
}

function findIndexInRunDataArray(run) {
    let indexOfRun = -1;
    if (run) {
        for (let i = 0; i < runDataArray.value.length; i++) {
            if (run.id === runDataArray.value[i].id) {
                indexOfRun = i; break;
            }
        }
    }
    return indexOfRun;
}

function loadFromSpeedControl() {
    runDataActiveRun.on('change', (newVal, oldVal) => {
        refreshNextRunsData(newVal);
    });

    runDataArray.on('change', (newVal, oldVal) => {
        refreshNextRunsData(runDataActiveRun.value);
    });

}

function refreshNextRunsData(currentRun) {
    let nextRuns = getNextRuns(currentRun, 2);
    console.log(nextRuns);

    let upNextGameElement = $('#up-next-game');
    let upNextEstimateElement = $('#up-next-estimate');
    let upNextRunnerElement = $('#up-next-runner');
    upNextGameElement.html(`${currentRun.game} (${currentRun.category})`);
    upNextEstimateElement.html(currentRun.estimate);
    upNextRunnerElement.html(currentRun.teams[0].players.map((player) => player.name).join(', '));

    let i = 0;
    for (let run of nextRuns) {
        if (i >= 1)
            break;

        let onDeckGameElement = $('#on-deck-game');
        let onDeckRunnerElement = $('#on-deck-runner');
        onDeckGameElement.html(`${run.game} (${run.category})`);
        onDeckRunnerElement.html(run.teams[0].players.map((player) => player.name).join(', '));

        i++;
    }
}