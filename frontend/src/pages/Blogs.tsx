import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"

export const Blogs=()=>{
     return <div >
          <Appbar/>
          <div className="flex justify-center">
          <div className=" max-xl">
          <Blogcard authorName={"Rishit"}
title={"IDK"}
content={"This is a blog"}
publishedDate={"2021-09-01T00:00:00.000Z"}
    /> 
              
    
    </div>


    </div>
    </div>
}