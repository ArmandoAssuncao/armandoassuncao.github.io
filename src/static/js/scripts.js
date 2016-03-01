$(document).ready(function(){
	$('#btn_contact').one('click', showHideContactForm);
	$('#btn_skills').one('click', showHideSkills);
});


// Functions ////////

function showHideContactForm(){
	var element = this;
	var container = '#container_contact_form';
	function show(){
		$('footer').css('position', 'relative').fadeTo(0, 0.8);
		$('footer').animate({bottom: $(container).css('height')}, 700, 'linear');
		$(container).css('position', 'absolute');
		darkenPage(true);

		$(element).one('click', hide);
	}

	function hide(){
		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
			$(container).css('position', 'fixed')
		}).fadeTo('fast', 1);
		darkenPage(false);

		$(element).one('click', show);
	}

	show();
}

function showHideSkills(){
	var element = this;
	var container = '#container_skills';
	function show(){
		$('footer').css('position', 'relative').fadeTo(0, 0.8);
		$('footer').animate({bottom: $(container).css('height')}, 700, 'linear');
		$(container).css('position', 'absolute');
		darkenPage(true);

		$(element).one('click', hide);
	}

	function hide(){
		$('footer').animate({bottom: '0'}, 700, 'linear', function(){
			$(container).css('position', 'fixed')
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