import { Quote } from "../components/Quote";
import { Cred } from "../components/Cred";
import '../App.css';

export const Signup = () => {return(<>
     <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
         <Cred type={"signup"}/>
          </div>
          <div className="hidden lg:block">
          <Quote />
          </div>
     </div>






</>)}