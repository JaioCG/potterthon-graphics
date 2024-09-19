// Live clock
var clock = $('#clock');
setInterval(() => {
    clock.html(luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED_WITH_WEEKDAY));
}, 1000);

// Commentary Data
var commentary = $('#commentary');
var host = $('#host');
nodecg.listenFor('updateCommentary', (data) => {
    let commentaryNames = '';
    if (data.comm1.name !== '') {
        commentaryNames += (data.comm1.pronouns == '') ?
            data.comm1.name :
            `${data.comm1.name} [${data.comm1.pronouns}]`;
    }
    if (data.comm2.name !== '') {
        commentaryNames += (data.comm2.pronouns == '') ?
            `, ${data.comm2.name}` :
            `, ${data.comm2.name} [${data.comm2.pronouns}]`;
    }

    let hostName = (data.host.pronouns == '') ?
        data.host.name :
        `${data.host.name} [${data.host.pronouns}]`;

    commentary.html(commentaryNames);
    host.html(hostName);
});