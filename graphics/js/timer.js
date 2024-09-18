'use strict';
$(() => {
    // JQuery selectors
	var timerElem = $('#timer');

	var timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');
	timer.on('change', (newVal, oldVal) => {
		if (newVal)
			updateTimer(newVal, oldVal);
	});
	
	// Sets the timer text
	function updateTimer(newVal, oldVal) {
		if (oldVal) timerElem.toggleClass('timer_'+oldVal.state, false);
		timerElem.toggleClass('timer_'+newVal.state, true);
		
		timerElem.html(newVal.time);
	}
});