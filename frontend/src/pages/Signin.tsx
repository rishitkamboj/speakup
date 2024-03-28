import { Cred } from "../components/Cred"
import { Quote } from "../components/Quote"

export const Signin = () => { return(<>
     <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
         <Cred
         type={"signin"}/>
          </div>
          <div className="hidden lg:block">
          <Quote />
          </div>
     </div>






</>)}