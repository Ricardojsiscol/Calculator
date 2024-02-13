//Stops user from inputing non numerical values in our calculator
function inputEventListener(){
	document.getElementById('input').addEventListener('input', function(){
		this.value = this.value.replace(/[^0-9.]/g, '');
})
}
