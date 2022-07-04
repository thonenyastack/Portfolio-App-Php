jQuery(document).ready(function($){
	//Toggle nav menu on button click
	var $root = $('html,body'),
		menu_toggle = $('.menu-toggle');
	
	menu_toggle.on('click', function(){
		//whatever click set it to this element 
		var $this = $(this);
		$this.toggleClass('close');
		$('.menu, .menu-nav, .menu-nav-item').toggleClass('show');
	});

	//Toggle nav menu on menu item click and smooth scrolling
	$('.menu-nav-item a').on('click',function(){
		var $this = $(this),
			href = $this.attr('href');
		
		//Toggle nav menu
		menu_toggle.removeClass('close');
		$this.parents('.menu-nav-item, .menu-nav, .menu').removeClass('show');

		// Smooth Scrolling
		$root.animate({
			scrollTop: $(href).offset().top - 70
		}, 500, function(){
			window.location.hash = href;
		});
		return false;
	});


	//Attach a form submission handler
	$(".contact-form").submit(function(event){
		//Stop form from submitting normally
		event.preventDefault();

		//Serailize submitting form data and get action
		var $form = $(this),
			url= $form.attr("action");

		// send data via post method
		var posting = $.post(url, $form.serialize());

		// Put the results in a div

		posting.done(function(data){
			var response = $.parseJSON(data),
				target = $('#status-messages');

			//Add sucess/error classes
			if(response.status ==1 ){
				target.removeClass('error');
				target.addClass('success');
			}
			else if(response.status == 0){
				target.removeClass('success');
				target.addClass('error');
			}

			//Append the message, empty() to remove anything in div, then append new msg with fadein.
			target.empty().append(response.message).hide().fadeIn(400);
		});
	});	
});