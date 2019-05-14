$(document).ready(function () {
	var counter;
		var questionBank=new Array;
		var currentQuestionNumber;
		var currentAnswer;
		var numberOfQuestions;
		var gamePosition;
		var score;
	
		var jsonUrl = 'https://spreadsheets.google.com/feeds/cells/15KQoHeYYh3zFC1Pjh2c6tvCZD9jysXOjwJWa2odPuco/2/public/full?alt=json';         
		$.getJSON(jsonUrl, function(data){
			var entry = data.feed.entry;
			var hints = [];
			var quests = [];
			var answers = [];
			var images = [];
		
		for (var i = 3; i < entry.length; i += 4){
			// entry[i].content.$t retrieves the content of each cell
			hints.push(entry[i].content.$t);
			quests.push(entry[i+1].content.$t);
			answers.push(entry[i+2].content.$t);
			images.push(entry[i+3].content.$t);
			}
	
			numberOfQuestions=quests.length;
			for(i=0;i<numberOfQuestions;i++){  
				typeArray=[];
				typeArray[0]=hints[i];			
				typeArray[1]=quests[i];
				typeArray[2]=answers[i];
				typeArray[3]=images[i];
				questionBank[i]=typeArray; 
			}
			//console.log(questionBank[0]);
			gamePosition=1; 
			resetGame();
			updateQuestion();
			
		})//getJSON
	
		$(document).on("keyup",function(e){
			if(e.which==13){gameControl();};						  
		});
		$(document).on("click","#time",function(){
			gameControl();
		});
		$(document).on("click","#btnNext",function(){
			gameControl();
		});
		$(document).on("click","#btnRestart",function(){
			location.reload(true);
		});
		$(document).on("click","#btnStop",function(){
			scorePage();
		});
		/*
		$(document).on("click tap",function(){
			gameControl();
		});//tap
		*/
	
		function gameControl(){		
			switch (gamePosition) { 
				case 1: 
					checkAnswer();
					break;
				case 2: 
					updateQuestion();
					break;
				case 3: 
					scorePage();
					break;		
				case 4: 
					resetGame();
					updateQuestion();
					break;		
			}//switch	
		}//gamecontrol
	
		function resetGame(){
			counter = 66;
			score=0;
			currentQuestionNumber=Math.floor(Math.random()*numberOfQuestions);
			$("#gameArea").empty();
			$("#gameArea").append('<div id="control" class="fixed-bottom"></div>');
			$("#gameArea").append('<div id="message"></div>');
			$("#message").append('<button id="time" class="btn btn-outline-warning">66</button>');
			$("#message").append('<input type="text" id="inputBox">');
			$("#message").append('<h3 id="wordBox"></h3>');
			$("#control").append('<button id="btnNext" class="btn btn-outline-success float-right">NEXT</button>');
			//$("#gameArea").append('<p id="message"></p>');
		};//resetGame
		function updateQuestion(){
			$('#wordBox').empty();
			$('#wordBox').append(questionBank[currentQuestionNumber][1]);
			$('#btnStop').remove();
			//$('#inputBox').empty();
			$('#inputBox').val('');
			$('#inputBox').prop("disabled",false);
			$('#inputBox').css("background","transparent");
			$('#inputBox').css("color","red");
			$('body').css('background-image', 'url("https://lamit-win.github.io/meani-quiz-asset/img/'+questionBank[currentQuestionNumber][3]+'")');
			
			currentAnswer=questionBank[currentQuestionNumber][2];
			currentQuestionNumber=Math.floor(Math.random()*numberOfQuestions);
			gamePosition=1;
	
		}//updateQuestion
	
		function checkAnswer(){
			myAnswer=$('#inputBox').val();
			if(myAnswer.slice(myAnswer.length-1,myAnswer.length)==" "){
				myAnswer=myAnswer.slice(0,myAnswer.length-1);}
			if(currentAnswer==myAnswer){
				counter+=15;
				score++;
				//$('#inputBox').append('<a href="../'+questionBank[currentQuestionNumber][3]+'" download><img class="btn btn-outline-success" src="img/tick.png"></a>');
				$('#inputBox').css("background-color","green");
				$('#inputBox').css("color","white");
			}
			else{
				$('#control').append('<input type="button" id="btnStop" value="STOP" class="btn btn-outline-danger">');
				$('#inputBox').css("background-color","red");
				$('#inputBox').css("color","white");
				$('#inputBox').val("Đáp: "+currentAnswer);
				//$('#inputBox').val($('#inputBox').val()+" ("+currentAnswer+")");
			}
			$('#inputBox').prop('disabled', true);
			$('#gameArea').focus();
			gamePosition=2;
		}//checkAnswer
									
		function scorePage(){
			$("#gameArea").empty();
			$('#gameArea').append('<input type="button" id="btnRestart" class="btn btn-outline-warning float-right" value="RESTART">');
			$("#gameArea").append('<div id="wordBox">Đúng: <b>'+score+'</b> ('+numberOfQuestions+')</div>');
			gamePosition=4;
		}//scorePage
	var interval = setInterval(function() {
			counter--;
			if (counter <= 0) {
				 clearInterval(interval);
		scorePage();
					//location.reload(true);
	setInterval(function() {location.reload(true); }, 10000);
					return;
			}else{
				$('#time').text(counter);
				//console.log("Timer --> " + counter);
			}
	}, 1000);
		
	});//doc end
	