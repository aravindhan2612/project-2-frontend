
app.factory('BlogPostService',function($http)
	{
	var blogpostservice={}
	var BASE_URL="http://localhost:8006/CollaborationMiddleware"
		
		blogpostservice.addBlogPost=function(blogPost)
		{
		return $http.post(BASE_URL + "/addblogpost",blogPost)
	    }
	
	   blogpostservice.getBlogsApproved=function()
	    {
	     return $http.get(BASE_URL + "/blogsapproved")
        }
	   
	   blogpostservice.getBlogsWaitingForApproval=function()
		{
		return $http.get(BASE_URL + "/blogswaitingforapproval")
	    }
	   
	   blogpostservice.getBlog=function(blogPostId)
	   {
		  return $http.get(BASE_URL + "/getblog/"+blogPostId)
	   }
	   
	   blogpostservice.approveBlogPost=function(blogPost)
	   {
			return $http.put(BASE_URL + "/approveblogpost",blogPost)
		}
	   
	   blogpostservice.rejectBlogPost=function(blogPost,rejectionReason)
	   {
		  return $http.put(BASE_URL + "/rejectblogpost/"+rejectionReason,blogPost)
	   }

		blogpostservice.hasUserLikedBlogpost=function(blogPostId)
		{
			return $http.get(BASE_URL + "/hasuserlikedblogpost/"+blogPostId)
		}
		
		blogpostservice.updateLikes=function(blogPostId)
		{
			return $http.put(BASE_URL + "/updatelikes/"+blogPostId)
		}
		
		blogpostservice.addBlogComment=function(blogComment)
		{
			return $http.post(BASE_URL + "/addblogcomment",blogComment)
		}
		blogpostservice.getAllBlogComments=function(blogPostId)
		{
			return $http.get(BASE_URL + "/getblogcomments/"+blogPostId);
		}
		blogpostservice.deleteBlogComment=function(blogComment)
		{
			return $http.put(BASE_URL +"/deleteblogcomment",blogComment);
		}
	return blogpostservice;
   })