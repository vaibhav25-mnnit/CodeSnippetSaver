import './styles/App.css';
import Articles from './components/Articles';
import Home from './components/Home'
import UploadTopic from './components/UploadTopic';
import UploadArticle from './components/UploadArticle';
import Dashboard from './components/Dashboard';
import Notfound from './components/Notfound';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import FinalPage from './components/FinalPage';


import { authentication } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from "react-redux";
import { signInUser } from "./features/userSlice";


function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      dispatch(signInUser());
    }
  });



  return (
    <Router >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/topic/:topicId' element={<Articles />} />
        <Route path='/article/:articleId/parent/:parent/name/:name' element={<FinalPage />} />
        <Route path='upload/topic' element={<UploadTopic />} />
        <Route path='upload/article/:topicId' element={<UploadArticle />} />
        <Route path='/dashBoard/' element={<Dashboard />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;

