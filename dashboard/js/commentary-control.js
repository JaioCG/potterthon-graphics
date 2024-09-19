// JQuery selectors
var hostName = $('#host-name');
var hostTwitch = $('#host-twitch');
var hostPronouns = $('#host-pronouns');
var comm1Name = $('#comm1-name');
var comm1Twitch = $('#comm1-twitch');
var comm1Pronouns = $('#comm1-pronouns');
var comm2Name = $('#comm2-name');
var comm2Twitch = $('#comm2-twitch');
var comm2Pronouns = $('#comm2-pronouns');

// Update commentary
document.getElementById('submit-comms').addEventListener('click', function () {
    nodecg.sendMessage('updateCommentary', {
        host: {
            name: hostName.val(),
            twitch: hostTwitch.val(),
            pronouns: hostPronouns.val()
        },
        comm1: {
            name: comm1Name.val(),
            twitch: comm1Twitch.val(),
            pronouns: comm1Pronouns.val()
        },
        comm2: {
            name: comm2Name.val(),
            twitch: comm2Twitch.val(),
            pronouns: comm2Pronouns.val()
        }
    });
});