(function($) {

	var length = $('#cubeTransition>div').length,
		current = 1,
		next = 1,
		outClass, inClass, onGoing = false;
		$('#cubeTransition>div:eq(0)').addClass('visible');

	for (i = 0; i < length; i++) {
		var bullet = $("<li></li>");
		if (i == 0) bullet.addClass('active');
		$("#bullets").append(bullet);
	}

	function openIndex(i) {
		if (!onGoing && next != i) {
			onGoing = true;
			next = i
			outClass = current > i ? 'rotateCubeBottomOut' : 'rotateCubeTopOut'
			inClass = current > i ? 'rotateCubeBottomIn' : 'rotateCubeTopIn';
			show()
		}
	}

	function trans(direction) {
		if (!onGoing) {
			onGoing = true;
			if (direction == 'up') {
				next = current > 1 ? current - 1 : length;
				outClass = 'rotateCubeBottomOut';
				inClass = 'rotateCubeBottomIn';
			} else {
				next = current < length ? current + 1 : 1;
				outClass = 'rotateCubeTopOut';
				inClass = 'rotateCubeTopIn';
			}
			show();
		}
	}

	function show() {
		$('#cubeTransition>div:eq(' + (next - 1) + ')').addClass('visible');
		$('#cubeTransition>div:eq(' + (current - 1) + ')').addClass(outClass);
		$('#cubeTransition>div:eq(' + (next - 1) + ')').addClass(inClass);	
		$('#bullets>li:eq(' + (current - 1) + ')').removeClass('active');
		$('#bullets>li:eq(' + (next - 1) + ')').addClass('active');
		setTimeout(function() {
			
		},50)
		
		animationOut(current - 1)
		setTimeout(function() {
			$('#cubeTransition>div:eq(' + (current - 1) + ')').removeClass('visible');
		}, 500)

		setTimeout(function() {
			$('#cubeTransition>div:eq(' + (current - 1) + ')').removeClass(outClass);
			$('#cubeTransition>div:eq(' + (next - 1) + ')').removeClass(inClass);
			
			animationIn(next - 1)
			current = next;
			onGoing = false;
		}, 600)
	}

	$(document).ready(

	function() {
    
    //for scroll by mouse or MAC track pad
      var indicator = new WheelIndicator({
      callback: function(e){   
          if (e.direction == 'down') {
            trans('down')
          } else {
            trans('up')
          }
      }
    });
    indicator.getOption('preventMouse'); // true


		$(document).keydown(function(e) {
			console.log($(".page1.visible" ).length);
			if (e.keyCode == 38 || e && e.keyCode == 37) {
				
				console.log('go up');

				if($( ".page1.visible" ).length >0){
					$( '#frame1').fadeOut();
					$('#frame4').css('display', 'block');
				}
				if($( ".page2.visible" ).length >0){
					$( '#frame2').fadeOut();
					$('#frame1').css('display', 'block');
				}
				if($( ".page3.visible" ).length >0){
					$( '#frame3').fadeOut();
					$('#frame2').css('display', 'block');
				}
				if($( ".page4.visible" ).length >0){
					$( '#frame4').fadeOut();
					$('#frame3').css('display', 'block');
				}
				trans('up');
			}
			if (e.keyCode == 39 || e && e.keyCode == 40) {
				
				console.log('down');

				if($( ".page1.visible" ).length >0){
					$( '#frame1').fadeOut();
					$('#frame2').css('display', 'block');
				}
				if($( ".page2.visible" ).length >0){
					$( '#frame2').fadeOut();
					$('#frame3').css('display', 'block');
				}
				if($( ".page3.visible" ).length >0){
					$( '#frame3').fadeOut();
					$('#frame4').css('display', 'block');
				}
				if($( ".page4.visible" ).length >0){
					$( '#frame4').fadeOut();
					$('#frame1').css('display', 'block');
				}
				trans('down')
			}

		});

		$(document).swipe({
			swipe: function(event, direction, distance, duration, fingerCount) {
				console.log(event.target);
				var frameClass = ($(event.target).attr('class').split(" ")[0]);
				if (direction == "left") {
					trans('down');

					if(frameClass==='page1'){
						$( '#frame1').fadeOut();
						$('#frame2').css('display', 'block');
					}else if(frameClass==='page2'){
						$( '#frame2').fadeOut();
						$('#frame3').css('display', 'block');
					}else if(frameClass==='page3'){
						$( '#frame3').fadeOut();
						$('#frame4').css('display', 'block');
					}else if(frameClass==='page4'){
						$( '#frame4').fadeOut();
						$('#frame1').css('display', 'block');
					}

				} else if (direction == "right") {
					trans('up')

					if(frameClass==='page1'){
						$( '#frame1').fadeOut();
						$('#frame4').css('display', 'block');
					}else if(frameClass==='page2'){
						$( '#frame2').fadeOut();
						$('#frame1').css('display', 'block');
					}else if(frameClass==='page3'){
						$( '#frame3').fadeOut();
						$('#frame2').css('display', 'block');
					}else if(frameClass==='page4'){
						$( '#frame4').fadeOut();
						$('#frame3').css('display', 'block');
					}
				}
			}
		});


		$('#bullets>li').on('click', function() {
			openIndex($(this).index() + 1);
		});

		$('#frame1').load(function(){

	        var iframe = $('#frame1').contents();

			iframe.find("body").keydown(function(e) {
				$('iframe').css('display', 'block');
				if (e.keyCode == 38 || e && e.keyCode == 37) {
					trans('up')
				}
				if (e.keyCode == 39 || e && e.keyCode == 40) {
					trans('down')
				}
				


			});

			iframe.find("body").each(function( index ) {
			  $( this ).swipe({
					swipe: function(event, direction, distance, duration, fingerCount) {
						//alert();
						
						if (direction == "left") {
							$( '#frame1').fadeOut();
							trans('down')
							$('#frame2').css('display', 'block');
						} else if (direction == "right") {
							$( '#frame1').fadeOut();
							trans('up')
							$('#frame4').css('display', 'block');
						}
						
					}


				});



			});
		});

		$('#frame2').load(function(){
			console.log("2 load");
	        var iframe = $('#frame2').contents();

			iframe.find("body").keydown(function(e) {
				$('iframe').css('display', 'block');
				if (e.keyCode == 38 || e && e.keyCode == 37) {
					trans('up')
				}
				if (e.keyCode == 39 || e && e.keyCode == 40) {
					trans('down')
				}
				


			});

			iframe.find("body").each(function( index ) {
			  $( this ).swipe({
					swipe: function(event, direction, distance, duration, fingerCount) {
						
						if (direction == "left") {
							trans('down')
							$( '#frame2').fadeOut();
							$('#frame3').css('display', 'block');
						} else if (direction == "right") {
							trans('up')
							$( '#frame2').fadeOut();
							$('#frame1').css('display', 'block');
						}
					}


				});



			});
		});

		$('#frame3').load(function(){

	        var iframe = $('#frame3').contents();

			iframe.find("body").keydown(function(e) {
				$('iframe').css('display', 'block');
				if (e.keyCode == 38 || e && e.keyCode == 37) {
					trans('up')
				}
				if (e.keyCode == 39 || e && e.keyCode == 40) {
					trans('down')
				}
				


			});

			iframe.find("body").each(function( index ) {
			  $( this ).swipe({
					swipe: function(event, direction, distance, duration, fingerCount) {
						
						if (direction == "left") {
							trans('down')
							$( '#frame3').fadeOut();
							$('#frame4').css('display', 'block');
						} else if (direction == "right") {
							trans('up')
							$( '#frame3').fadeOut();
							$('#frame2').css('display', 'block');
						}
					}


				});



			});
		});

		$('#frame4').load(function(){

	        var iframe = $('#frame4').contents();

			iframe.find("body").keydown(function(e) {
				$('iframe').css('display', 'block');
				if (e.keyCode == 38 || e && e.keyCode == 37) {
					trans('up')
				}
				if (e.keyCode == 39 || e && e.keyCode == 40) {
					trans('down')
				}
			});

			iframe.find("body").each(function( index ) {
			  $( this ).swipe({
					swipe: function(event, direction, distance, duration, fingerCount) {
						
						if (direction == "left") {
							trans('down')
							$( '#frame4').fadeOut();
							$('#frame1').css('display', 'block');
						} else if (direction == "right") {
							trans('up')
							$( '#frame4').fadeOut();
							$('#frame3').css('display', 'block');
						}
					}
				});
			});
		});

	});
})(jQuery);