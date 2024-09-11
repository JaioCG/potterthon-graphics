'use strict';
$(() => {
	// JQuery selectors
	var timer = $('#timer'); // timer.html
	
    // Runs whenevever speedcontrol run data changes
	var timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');
	timer.on('change', (newVal, oldVal) => {
		if (newVal)
			updateTimer(newVal, oldVal);
	});
	
	// Updates the timer on changes
	function updateTimer(newVal, oldVal) {
		if (oldVal) timerElem.toggleClass('timer_'+oldVal.state, false);
		timer.toggleClass('timer_'+newVal.state, true);
		
		timer.html(newVal.time);
	}
});