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

    // Update runner data
    var runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
    runDataActiveRun.on('change', (runData) => {
        if (runData) {
            runnerInfo = [];
            for (let i = 0; i < runData.teams[0].players.length; i++) {
                var currentPlayer = {
                    name: runData.teams[0].players[i].name,
                    twitch: runData.teams[0].players[i].social.twitch
                };
                runnerInfo[i] = currentPlayer;
            }
            console.log(runnerInfo);
        }
    });

    // Update commentary data
    nodecg.listenFor('updateCommentary', (data) => {
        commentaryInfo = [];
        commentaryInfo[0] = {
            name: data.host.name,
            twitch: data.host.twitch
        };
        if (data.comm1.name) {
            commentaryInfo[1] = {
                name: data.comm1.name,
                twitch: data.comm1.twitch
            };
        }
        if (data.comm2.name) {
            commentaryInfo[2] = {
                name: data.comm2.name,
                twitch: data.comm2.twitch
            };
        }
        console.log(commentaryInfo);
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
                if (commentaryInfo.length > 1) {
                    message += (i == 0) ?
                        `Host: ${commentaryInfo[i].name}: https://twitch.tv/${commentaryInfo[i].twitch} | Commentary: ` :
                        `${commentaryInfo[i].name}: https://twitch.tv/${commentaryInfo[i].twitch}`;
                } else {
                    message += `Host: ${commentaryInfo[i].name}: https://twitch.tv/${commentaryInfo[i].twitch}`
                }
                if (i > 0 && i < commentaryInfo.length - 1) message += ' & ';
            }
            client.say(channel, message);
        }
    });
};
