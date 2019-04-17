																												
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider)
		
   {
	$routeProvider
	.when('/addjob',{controller:'JobCtrl',templateUrl:'Views/jobaddform.html'})
	.when('/getalljobs',{controller:'JobCtrl',templateUrl:'Views/jobslist.html'})
	.when('/register',{controller:'UserCtrl',templateUrl:'Views/registrationform.html'})
	.when('/login',{controller:'UserCtrl',templateUrl:'Views/loginform.html'})

	.when('/updateuserprofile',{controller:'UserCtrl',templateUrl:'Views/updateform.html'})
	.when('/addblogpost',{controller:'BlogPostCtrl',templateUrl:'Views/blogpostform.html'})
	.when('/blogsapproved',{controller:'BlogPostCtrl',templateUrl:'Views/blogsapproved.html'})
	.when('/blogswaitingforapproval',{controller:'BlogPostCtrl',templateUrl:'Views/blogswaitingforapproval.html'})
	.when('/chat',{controller:'ChatCtrl',templateUrl:'Views/chat.html'})
	.when('/getblogswaitingforapproval/:blogpostid',{controller:'BlogInDetailCtrl',templateUrl:'Views/blogapprovalform.html'})
	.when('/getblogsapproved/:blogpostid',{controller:'BlogInDetailCtrl',templateUrl:'Views/blogsindetailform.html'})
    .when('/uploadprofilepic',{templateUrl:'Views/profilepicupload.html'})
    .when('/suggestedusers',{controller:'FriendCtrl',templateUrl:'Views/suggestedusers.html'})
	.when('/pendingrequests',{controller:'FriendCtrl',templateUrl:'Views/pendingrequests.html'})
	.when('/listoffriends',{controller:'FriendCtrl',templateUrl:'Views/friendslist.html'})
    .when('/home',{controller:'NotificationCtrl',templateUrl:'Views/home.html'})
	.when('/getnotification/:notificationId',{controller:'NotificationCtrl',templateUrl:'Views/notificationindetail.html'})
	.otherwise({controller:'NotificationCtrl',templateUrl:'Views/home.html'})

   })
   app.run(function($rootScope,UserService,$location,$cookieStore )
		   {
	   alert('app.run function executed')
	   if($rootScope.user==undefined)
		   $rootScope.user=$cookieStore.get('userDetails')
			
		$rootScope.logout=function(){
			alert('Logout function in UserCtrl')
			UserService.logout().then(
					function(response){
						alert('logged out successfully')
						delete $rootScope.user
						$cookieStore.remove('userDetails')
						$location.path('/login')
					},
					function(response){
						if(response.status==401)
							$location.path('/login')
					})
		}
	
		
	})


