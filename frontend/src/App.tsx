import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './pages/Publish'
import AuthRoute from './components/AuthRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<AuthRoute><Blog /></AuthRoute>} />
          <Route path="/blogs" element={<AuthRoute><Blogs /></AuthRoute>} />
          <Route path="/publish" element={<AuthRoute><Publish /></AuthRoute>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App