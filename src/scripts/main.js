<<<<<<< HEAD
window.onload = function() {
	var elements = document.getElementsByClassName('onload');
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].classList.add("fadeInDown");
	};
}
=======
angular.module('app', [
  require('./home').name
]);
>>>>>>> 36ad3c27f7bc6690decdd2f25c3abbc465148fef
