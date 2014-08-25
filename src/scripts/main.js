window.onload = function() {
	var elements = document.getElementsByClassName('onload');
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].classList.add("visible");
	};
}