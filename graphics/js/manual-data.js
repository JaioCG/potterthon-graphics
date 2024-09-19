// Live clock
var clock = $('#clock');
setInterval(() => {
    clock.html(luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED_WITH_WEEKDAY));
}, 1000);