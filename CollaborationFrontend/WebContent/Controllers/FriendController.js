
app.controller('FriendCtrl',function($scope, $location, FriendService)
	{
	
	$scope.viewed=false
	
	function getAllSuggestedUsers(){
		FriendService.getAllSuggestedUsers().then(function(response){
			console.log('suggestedusers')
			$scope.suggestedUsers=response.data
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
		
	$scope.addFriend=function(toId){
		FriendService.addFriend(toId).then(
				function(response){
					getAllSuggestedUsers()
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	

	function getPendingRequests(){
		FriendService.getPendingRequests().then(
				function(response){
					$scope.pendingRequests=response.data //Array of Friend Object[{fromId,toId,status,friendId},{}]
				},
				
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	getAllSuggestedUsers()
	getPendingRequests()

	$scope.acceptRequest=function(pendingRequest){
		FriendService.acceptRequest(pendingRequest).then(
				function(response){
					
					getPendingRequests()
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	$scope.deleteRequest=function(pendingRequest){
		FriendService.deleteRequest(pendingRequest).then(
				function(response){
			
					getPendingRequests()
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	$scope.detailsViewed=function(id){
		$scope.viewed=!($scope.viewed)
	}

	function getAllFriends(){
    	FriendService.getAllFriends().then(
    			function(response){
    				$scope.friends=response.data
    			},function(response){
    				if(response.status==401)
    					$location.path('/login')
    			})
    }
	
	getAllFriends()
})


