$(document).ready(function(){
	$('#btn_contact').one('click', showHideContactForm);
});


// Functions ////////

function showHideContactForm(){
	var element = this;
	function show(){
		$('footer').css('position', 'relative').fadeTo(0, 0.8);
		$('footer').animate({bottom: $('#container_contact_form').css('height')}, 700, 'linear');
		$('#container_contact_form').css('position', 'absolute');
		darkenPage(true);

		$(element).one('click', hide);
	}

	function hide(){
		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
			$('#container_contact_form').css('position', 'fixed')
		}).fadeTo('fast', 1);
		darkenPage(false);

		$(element).one('click', show);
	}

   show();
}

// Helpers ////////

function darkenPage(show){
	if(show){
		$('body').append($('<div>').css({
			position: 'fixed'
			,width: '100%'
			,height: '100%'
			,'background-color': '#000'
			,opacity: 0.6
			,'z-index': 999
			,top: 0
			,left: 0
		}).attr('id','darken_page').fadeTo(500, 0.6));
	}
	else{
		$('#darken_page').fadeTo(500, 0, function(){this.remove()});
	}
}