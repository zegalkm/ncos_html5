$(function(){
	alert("하이!!");
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

	var movingDistance = 3;
	$("#player").click(function(e){
		var position = $("#player").position();
		var x = position.left/movePiont;
		var y = position.top/movePiont;
		
		var x_e = x+movingDistance;
		for(var i=x+1; i<=x_e;i++){
			alert($("td[id="+i+"_"+y+"]").attr("type"));
			$("td[id="+i+"_"+y+"]").addClass("select_td");
			/**$("td[id="+i+"_"+y+"]").click(function(e){
				var kk = (i-1)*movePiont;
				$("#player").css('left',kk);
				$("td").css("background-color","");
			});*/
			$("td[id="+i+"_"+y+"]").click(function(e){
				var id = this.id;
				if($("td[id="+id+"]").attr("class")=='select_td'){//왜 이럴까..
					var k = id.split("_");
					var kk = parseInt(k[0])*movePiont;
					$("#player").animate({"left":kk+"px"},"slow");
					$("td").removeClass("select_td");
				}
			});
		}

	});

});