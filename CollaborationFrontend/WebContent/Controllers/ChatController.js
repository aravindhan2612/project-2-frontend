
app.controller('ChatCtrl',function($scope,$rootScope,ChatService){
	alert('in chat ctrl')
	$scope.users=[]
	$scope.stompClient=ChatService.stompClient//Websocket connection over STOMP protocol
	$scope.userName=$rootScope.user.firstname
	$scope.chats=[]
	$scope.$on('sockConnected',function(event,frame){
		alert($scope.userName + ' is connected with websocket')
		$scope.userName=$rootScope.user.firstname
		$scope.stompClient.subscribe("/topic/join",function(message){
			user=JSON.parse(message.body)
			 if(user != $scope.userName && $.inArray(user, $scope.users) == -1) {
                $scope.addUser(user)
			$scope.latestUser=user
			alert($scope.latestUser + ' has joined the chat')
			 $('#joinedChat').fadeIn(500).delay(10000).fadeOut(500);
	            }
		})	
	
	$scope.stompClient.subscribe("/app/join/"+$scope.userName,function(message){
		alert(message.body)
		$scope.users=JSON.parse(message.body) //message.body is of Type String, convert it into JSON by using JSON.parse()
		$scope.$apply()
	})


})

	$scope.sendMessage=function(chat){
			chat.from=$scope.userName
			$scope.stompClient.send("/app/chat",{},JSON.stringify(chat))//stringify is to convert JSON to String
			$scope.$broadcast('sendingChat',chat)
			$scope.chat.message=''
		}
	 $scope.capitalize = function(str) {
	        return str.charAt(0).toUpperCase() + str.slice(1);
	    }
	 

		$scope.addUser=function(user){
			$scope.users.push(user)
			$scope.$apply()
		}

	$scope.$on('sockConnected',function(event,frame){
		alert('subscribe to the destination /queue/chats/'+$scope.userName )
		 $scope.user=$rootScope.user.firstname;
		$scope.stompClient.subscribe("/queue/chats",function(message){//group chat
			$scope.processIncomingMessage(message,true)
		})
		$scope.stompClient.subscribe("/queue/chats/"+$scope.userName,function(message){
			$scope.processIncomingMessage(message,false)
		})//private chat
			
	})
	
	$scope.$on('sendingChat',function(event,message){
			chat=angular.copy(message)
			chat.from='Me'
			chat.direction='outgoing'
			$scope.addChat(chat)
		})


	$scope.addChat=function(chat){
			$scope.chats.push(chat)
		}


	$scope.processIncomingMessage=function(message,broadcast){
			chat=JSON.parse(message.body)//chat in JSON fmt.  to,from and message
			chat.direction='incoming'
			chat.broadcast=broadcast//true for group chat and false for private chat
			if(chat.from!=$scope.userName){
				$scope.addChat(chat)//add the chat to an array
				$scope.$apply()
			}
		}

})	






