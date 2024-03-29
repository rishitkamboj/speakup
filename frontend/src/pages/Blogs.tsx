import { useBlogs } from "../hooks"
import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs=()=>{
     const {loading,blogs}=useBlogs();

     if(loading){
        return(
          <div>
          <Appbar /> 
          <div  className="flex justify-center">
              <div>
                  <BlogSkeleton/>
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
              </div>
          </div>
      </div>)
     }

     return <div >
          <Appbar/>
          <div className="flex justify-center">
          <div className=" max-xl">
               {blogs.map((blog:any)=>{
                    return <Blogcard id={blog.id}authorName={blog.author.name===null?"Anonymous":`${blog.author.name}`} title={blog.title} content={blog.content} publishedDate={blog.publishedDate}/>
               }
               )}
    
              
    
    </div>


    </div>
    </div>
}