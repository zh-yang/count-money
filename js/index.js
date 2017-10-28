//循环第一页中的五个按钮，实现各自点击出现弹框
	$.each($('.btn1'), function(index, el) {
		$(el).on('click', function() {
			$('.cover').css('display','block');
			$('.show').eq(index).css("display",'block');
		});
		$('.close').on('click', function() {
			$('.cover').css('display','none');
			$('.show').eq(index).css("display",'none');
		});
		//点击提交后第一页隐藏，第二页出现
		$('#sub').on('click',function(){
			$('.cover').css('display','none');
			$(".show").css("display","none");
			$('.homePage').css('display','none');
			$('.slide').css('display','block');

		});
	});
	var num = 0;//声明一个分数初始变量
	var arr = ['你太客气了，这不是你的挑战极限吧','没办法！你已经强到没有对手了'];//定义一个数组保存随机的两句话；
	//循环5张图片，防止动画尚未执行完毕，再次滑动时无图可滑
	$.each($('.money'), function(index, el) {
		$(el).on('touchstart', function(e) {
			//获取触摸开始的坐标值
			startX = e.originalEvent.changedTouches[0].clientX;
			startY = e.originalEvent.changedTouches[0].clientY;				
		});
		//阻止滑动的默认事件
		$('.slide').on('touchmove', function(e) {
			e.preventDefault();
		});
		$(el).on('touchend', function(e) {
			//获取触摸结束时的坐标
			var endY = e.originalEvent.changedTouches[0].clientY;
			var endX = e.originalEvent.changedTouches[0].clientX;
			var X = Math.abs(endX - startX);
			var Y = Math.abs(endY - startY);
			//向上滑动，且上下偏移量大于左右偏移量才触发
			if(startY > endY && Y > X) {
				if(num == 0) {//设置定时器开启条件，保证重复触摸时定时器不叠加
					var time = 5;//分数为0时，设置定时器倒计时时间
					timer = setInterval(function() {
						time--;
						$('#clock').html(time);
						//倒计时为0时，清除定时器，隐藏第二页，跳转第三页，并显示得分；
						if(time == 0) {
							clearInterval(timer);
							$('.lstscore').html('￥'+num+'00');
							$('.share').css('display','block');
							$('.slide').css('display','none');
							//随机显示两句话；
							if(Math.random()<0.5){
									$(".ran").html(arr[0]);
							}else{
									$(".ran").html(arr[1]);
							}
						}
					}, 1000);
				}
				num++;
				$('#hand').css('display','none');//触发后手掌消失
				//执行动画，并在动画结束后通过回调函数回到原有位置
				$(el).animate({
					width: '10%',
					top: '-100%'
				}, 500, 'linear', function() {
					$(el).css({
						width: '56.88%',
						top: '59.4%'
					});
				});
				//获取分数的每位数字，给显示框赋值
				$('#score li').eq(0).html(parseInt(num / 100));
				$('#score li').eq(1).html(parseInt(num % 100 / 10));
				$('#score li').eq(2).html(num % 10);
			}
		});
	});
	//循环页面中的四个按钮，实现各自点击出现弹框
	$.each($('.btn3'), function(index, el) {
		$(el).on('click', function() {
			$('.cover').css('display','block');
			$('.show').eq(index).css('display', 'block');
		});
		$('.close').on('click', function() {
			$('.cover').css('display','none');
			$('.show').eq(index).css('display', 'none');
		});
	});
	//点击再来一次，第三页消失，第二页重现
	$('.onceagain').on('click',function(){
		num = 0;//点击再来一次，分数清0；
		$('.share').css('display','none');
		$('.slide').css('display','block');
		$('#clock').html(5);//计时框显示倒计时数字；
		//分数框显示清0；
		$('#score li').eq(0).html(parseInt(num / 100));
		$('#score li').eq(1).html(parseInt(num % 100 / 10));
		$('#score li').eq(2).html(num % 10);
	});
	$('.sharbt').on('click',function(){
		$('.shacover').css('display','block');
	});
	$('.shacover').on('click',function(){
		$('.shacover').css('display','none');
	});