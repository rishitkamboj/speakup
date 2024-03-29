import { useBlogs } from "../hooks"
import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"

export const Blogs=()=>{
     const {loading,blogs}=useBlogs();
     console.log(blogs);

     if(loading){
          return <div>
Loading....
          </div>
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