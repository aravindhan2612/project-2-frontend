
app.factory('UserService',function($http)
		{
	  var userservice={}
	  
	   userservice.userRegistration=function(user)
	    {
		return $http.post("http://localhost:8006/CollaborationMiddleware/register",user)
	    }
	  userservice.login=function(user)
	  {
		 return $http.post("http://localhost:8006/CollaborationMiddleware/login",user) 
	  }
	  userservice.logout=function(user)
	  {
		 return $http.put("http://localhost:8006/CollaborationMiddleware/logout") 
	  }
	  userservice.getUser=function(user)
	  {
		 return $http.get("http://localhost:8006/CollaborationMiddleware/getuser") 
	  }
	   userservice.updateUserProfile=function(user)
		{
		 return $http.put("http://localhost:8006/CollaborationMiddleware/updateuserdetails",user)
		}
	return userservice;
})