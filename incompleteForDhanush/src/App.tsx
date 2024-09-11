// import { useState, useContext, useEffect } from "react"
// import { Link } from "react-router-dom";
// import { ReviewStats } from "strapi-ratings-client"

// import Login from "./components/Login"
// import AuthContext from "./context/AuthContext"
// import { posts, STRAPI } from "./lib/urls"
// import Tasks from "./Tasks";

// interface IPostData {
//   contentID: string;
//   reviewsCount?: Number;
// }

// function App() {
//   const { user } = useContext(AuthContext)
//   const [postsData, setPostsData] = useState<IPostData[]>(posts)
//   useEffect(() => {
//     const fetchReviewsCount = async (slug: string) => {
//       const url = `${STRAPI}/api/ratings/reviews/${slug}/count`
//       const res = await fetch(url)
//       const { count } = await res.json()
//       const updatedPostsData = postsData.map(p => {
//         if (p.contentID === slug) {
//           p.reviewsCount = count
//         }
//         return p
//       })
//       setPostsData(updatedPostsData)
//     }
//     posts.map(p => {
//       fetchReviewsCount(p.contentID)
//     })
//   }, [])
//   const renderList = () => {
//     const postsJSX = postsData.map(p => {
//       return (
//         <div className="p-4 my-3 border rounded" key={p.contentID}>
//           <h5><Link to={"/"+p.contentID}>{p.contentID}</Link></h5>
//           <ReviewStats apiURL={STRAPI} slug={p.contentID} />
//         </div>
//       )
//     })
//     return postsJSX
//   }
//   const [postsList, setPostsList] = useState<React.ReactNode>(renderList())
//   useEffect(() => {
//     setPostsList(renderList())
//   }, [postsData])
//   return (
//     <div className="container-md py-5">
//       {
//         !user && <Login />
//       }
//       {
//         postsList
//       }
//       <Tasks/>
//     </div>
//   )
// }

// export default App

import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReviewStats } from "strapi-ratings-client";

import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import { posts, STRAPI } from "./lib/urls";
import Tasks from "./Tasks";

interface IPostData {
  contentID: string;
  reviewsCount?: number; // Changed to lowercase 'number'
}

function App() {
  const { user } = useContext(AuthContext);
  const [postsData, setPostsData] = useState<IPostData[]>(posts);

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
      {!user && <Login />}
      {renderList()}
      <Tasks />
    </div>
  );
}

export default App;
