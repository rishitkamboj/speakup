import '../App.css';

export const Quote=()=>{

     return <div className="bg-indigo-100 h-screen flex justify-center flex-col">
     <div className="flex justify-center">
         <div className="max-w-lg">
             <div className="text-3xl font-bold quotefont">
             Welcome to SpeakUp, the platform where your voice matters.
             </div>
             <div className="max-w-md text-xl font-semibold text-left mt-4 quotefont">
                @SpeakUp{(new Date().getFullYear())}
             </div>
            
         </div>
     </div>
     
 </div>
}