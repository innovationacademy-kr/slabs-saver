	var current = window.location.pathname;
	var act = document.querySelector(`li a[href="${current}"]`);
	if (act) {
		act.classList.add('active');
		act.classList.remove('inactive')
	}
