$(function(){
	var player = '<div id="player"></div>';
	$("#map").append(player);

	var movePiont = 48;
	var height = 548;
	$(document).keydown(function(e){

		var position = $("#player").position();
		//alert(position.left+" && "+position.top);
		$("td").removeClass("select_td");
		switch(e.keyCode)
			{
				case 37: //왼쪽
					if(position.left>0){
						$("#player").css('left',position.left-movePiont+'px');
						break;
					}
				case 38: //위
					if(position.top>0){
						$("#player").css('top',position.top-movePiont+'px');
						break;
					}
				case 39: //오른쪽
					if(position.left<500){
						$("#player").css('left',position.left+movePiont+'px');
						break;
					}
				case 40: //아래
					if(position.top<500){
						$("#player").css('top',position.top+movePiont+'px');
						break;
					}
			
			}
	});

	//캐릭터 이동범위
	var movingDistance = 3;
	//캐릭터 클릭 이벤트
	$("#player").click(function(e){
		var position = $("#player").position();//현재 캐릭터의 포지션을 구함
		var x = position.left/movePiont;//무브포인트로 나누면 그것은 td의 id값!!
		var y = position.top/movePiont;
		
		//우측 right 범위
		var x_right = x+movingDistance;
		for(var i=x+1; i<=x_right;i++){
			$("td[id="+i+"_"+y+"]").addClass("select_td");

		}
		//좌측 left 범위
		var x_left = x-movingDistance;
		for(var i=x-1; i>=x_left;i--){
			$("td[id="+i+"_"+y+"]").addClass("select_td");
		}

		//하단 bottom 범위
		var y_bottom = y+movingDistance;
		for(var i=y+1; i<=y_bottom;i++){
			$("td[id="+x+"_"+i+"]").addClass("select_td");
		}

		//상단 top 범위
		var y_top = y-movingDistance;
		for(var i=y-1; i>=y_top;i--){
			$("td[id="+x+"_"+i+"]").addClass("select_td");
		}	

		//NW ,  SW
		var k = Math.abs(y_top - y)-1;
		for(var i=x-1; i>x_left; i--){
			for(var j=y-k; j<y; j++){
				$("td[id="+i+"_"+j+"]").addClass("select_td");
			}
			for(var j=y+k; j>y; j--){
				$("td[id="+i+"_"+j+"]").addClass("select_td");
			}
			k--;
		}
		//NE  ,  SE
		var k2 = Math.abs(y_top - y)-1;
		for(var i=x+1; i<x_right; i++){
			for(var j=y-k2; j<y; j++){
				$("td[id="+i+"_"+j+"]").addClass("select_td");
			}
			for(var j=y+k2; j>y; j--){
				$("td[id="+i+"_"+j+"]").addClass("select_td");
			}
			k2--;
		}		
	});

	//캐릭터 이동 이벤트
	$("td").click(function(){
		var id=this.id;//선택학 td의 id값을 구한다.
		var cssClz = $("#"+id).attr("class");//클래스값을 세팅한다.
		if(cssClz!=undefined&&cssClz==='select_td'){ //이동가능 범위인 동시에 클래스가 있다면 실행
			var xy = id.split("_"); 
			var xxx = parseInt(xy[0])*movePiont;//스플릿한 id값. x값에 무빙포인트를 곱하면 x축으로 이동해야 할 거리가 나온다
			var yyy = parseInt(xy[1])*movePiont;

			var position = $("#player").position();
			var px = position.left/movePiont;
			var py = position.top/movePiont;

			if(px!=xy[0]){//x축의 현재 캐릭터 위치와 이동해야 할 값이 다르면 실행
				$("#player").animate({"left":xxx+"px"},500);
			}
			if(py!=xy[1]){
				$("#player").animate({"top":yyy+"px"},500);
			}
			$("td").removeClass("select_td");
		}else{
			//아무것도 실행하지 않는다.
		}

	});

});