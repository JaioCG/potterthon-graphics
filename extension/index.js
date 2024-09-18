const tmi = require('tmi.js');
require('dotenv').config({
    path: __dirname + '/../.env' // nodecg has the path set to itself, not the bundle
});

module.exports = function (nodecg) {
    // Set up chat bot client
    // Use https://twitchapps.com/tmi/ to find oauth token
    const client = new tmi.Client({
        identity: {
            username: process.env.BOT_USERNAME,
            password: process.env.BOT_TOKEN
        },
        channels: ['potterthon']
    });
    client.connect();

    // Arrays for chat commands
    var runnerInfo = [];
    var commentaryInfo = [];

    // Update variables for chat commands based on speedcontrol data
    var runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
    runDataActiveRun.on('change', (runData) => {
        if (runData) {
            // Runner data
            for (let i = 0; i < runData.teams[0].players.length; i++) {
                var currentPlayer = {
                    name: runData.teams[0].players[i].name,
                    twitch: runData.teams[0].players[i].social.twitch
                };
                runnerInfo[i] = currentPlayer;
            }
            console.log(runnerInfo);

            // Commentary data
            for (let i = 0; i < runData.teams[1].players.length; i++) {
                var currentPlayer = {
                    name: runData.teams[1].players[i].name,
                    twitch: runData.teams[1].players[i].social.twitch
                };
                commentaryInfo[i] = currentPlayer;
            }
            console.log(commentaryInfo);
        }
    });

    // Handle chat commands
    client.on('message', (channel, tags, message, self) => {
        if (!message.startsWith('!')) return; // avoid non-commands

        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'runner' || command === 'runners') {
            let message = '';
            for (let i = 0; i < runnerInfo.length; i++) {
                message += `${runnerInfo[i].name}: https://twitch.tv/${runnerInfo[i].twitch}`;
                if (i < runnerInfo.length - 1) message += ', ';
            }
            client.say(channel, message);
        } else if (command === 'commentary' || command === 'host') {
            let message = '';
            for (let i = 0; i < commentaryInfo.length; i++) {
                message += (i == 0) ?
                    `Host: ${commentaryInfo[i].name}: https://twitch.tv/${commentaryInfo[i].twitch}` :
                    `Commentary: ${commentaryInfo[i].name}: https://twitch.tv/${commentaryInfo[i].twitch}`;
                if (i < commentaryInfo.length - 1) message += ', ';
            }
            client.say(channel, message);
        }
    });
};
