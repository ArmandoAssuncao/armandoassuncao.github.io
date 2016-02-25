$(document).ready(function(){
	$('#btn_contact').one('click', showHideContactForm);
});


// Functions ////////

function showHideContactForm(){
	var element = this;
	function show(){
		$('footer').css('position', 'relative').fadeTo(0, 0.96);
		$('footer').animate({bottom: $('#container_contact_form').css('height')}, 700, 'linear');
		$('#container_contact_form').css('position', 'absolute')

		$(element).one('click', hide);
	}

	function hide(){
		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
			$('#container_contact_form').css('position', 'fixed')
		}).fadeTo("fast", 1);

		$(element).one('click', show);
	}

   show();
}