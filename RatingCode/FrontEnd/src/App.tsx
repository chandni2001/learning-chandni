
import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Link, Router, Routes, Route } from "react-router-dom";
import { ReviewStats } from "strapi-ratings-client";

import LoginForm from "./components/LoginForm";
import AuthContext from "./context/AuthContext";
import { posts, STRAPI } from "./lib/urls";
import Tasks from "./Tasks";
import UserNotification from "./components/UserNotification";
import AssignTask from "./components/AssignTask";

interface IPostData {
  contentID: string;
  reviewsCount?: number; // Changed to lowercase 'number'
}

function App() {
  const { user } = useContext(AuthContext);
  const [postsData, setPostsData] = useState<IPostData[]>(posts);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
const handleLogin = (newToken) => {
  setToken(newToken);
};


  useEffect(() => {
    const fetchReviewsCount = async (slug: string) => {
      try {
        const url = `${STRAPI}/api/ratings/reviews/${slug}/count`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch reviews count for ${slug}`);
        }
        const { count } = await res.json();
        setPostsData(prevPostsData =>
          prevPostsData.map(p =>
            p.contentID === slug ? { ...p, reviewsCount: count } : p
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    posts.forEach(p => fetchReviewsCount(p.contentID));
  }, []);

  const renderList = () => (
    postsData.map(p => (
      <div className="p-4 my-3 border rounded" key={p.contentID}>
        <h5><Link to={`/${p.contentID}`}>{p.contentID}</Link></h5>
        <ReviewStats apiURL={STRAPI} slug={p.contentID} />
      </div>
    ))
  );

  return (
    <div className="container-md py-5">
      {/* {!user && <LoginForm />} */}
      <BrowserRouter>
      <Routes>
      {!token ? (
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      ) : (
        <Route path="/users" element={<UserNotification />} />
      )}
          {/* <Route path="/" element={<Navigate to="/users" />} /> */}
          <Route path="/assign-task" element={<AssignTask />} />
      </Routes>

        </BrowserRouter>
      {/* {renderList()} */}
      <Tasks />
    </div>
  );
}

export default App;
