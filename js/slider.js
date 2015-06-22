/*
 * create by kevinhu
 */

(function($){

	function control_slider (){

		var timer,
				auto_slide = 1,
				hover_pause = 1,
				auto_slide_seconds = 4000,
				animate_seconds = 420,
				processing = false;
		//( 1 - ON , 0 - OFF)

		if(auto_slide == 1){
		  timer = setInterval(function(){
		  	slide("right");
		  }, auto_slide_seconds);
		  if(hover_pause == 1){
			  $('.carousel-inner, .btn-prev, .btn-next').hover(function(){
			    clearInterval(timer)
			  },function(){
			    timer = setInterval(function(){
			    	slide("right");
			    }, auto_slide_seconds);
			  }); //when hovere and mouseout
			} //check if hover pause is enabled
		}

		$('.carousel-inner li:first').before($('.carousel-inner li:last'));
		//move he last list item before the first item. The purpose of this is if the user clicks to slide left he will be able to see the last item.

		$('.btn-prev').click(function(){slide("left");});
		$('.btn-next').click(function(){slide("right");});
	/*
		$('.btn-prev').click(function(){
			if(!$('.carousel-inner').is(':animated'))
				slide("left");
		});
		$('.btn-next').click(function(){
			if(!$('.carousel-inner').is(':animated'))
				slide("right");
		});
		// another prevent user click too fast method
	*/
		function slide(direct){
			if(processing)
				return;
			processing = true;
			var left_indent,
					carousel_ul = $('.carousel-inner'),
					item_width = $('.carousel-inner li').outerWidth() + 20,
					first_ele = $('.carousel-inner li:first'),
					last_ele = $('.carousel-inner li:last');

		  if(direct == "left"){
		  	left_indent = parseInt(carousel_ul.css('left')) + item_width;
		  }else{
		  	left_indent = parseInt(carousel_ul.css('left')) - item_width;
		  }

		  carousel_ul.animate({'left' : left_indent},animate_seconds,function(){
		  	if(direct == "left"){
					first_ele.before(last_ele);
		  	}else{
		  		last_ele.after(first_ele);
		  	} // moving the last item before the first item or the first item after the last item
		    carousel_ul.css({'left' : '-245px'}); //get the left indent to the default -245px

		    processing = false;
		  });
		};

	};

	control_slider();

})(jQuery);