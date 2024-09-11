// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Task.css';

// type Task = {
//   id: number;
//   customer: string;
//   serviceprovider: string;
//   task_description: string;
//   start_date: string;
//   end_date: string;
// };

// // Function to get token from local storage
// const getAuthToken = () => localStorage.getItem('authToken');

// const Tasks: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [rating, setRating] = useState<number>(0);
//   const [comment, setComment] = useState<string>('');
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
//   const [message, setMessage] = useState<string>('');

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = getAuthToken();
//         const response = await axios.get('http://localhost:1337/api/ratings/tasks', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Update the rating and post to the backend
//   const updateRating = async (taskId: number, newRating: number, newComment: string) => {
//     setRating(newRating);
//     setComment(newComment);
//     try {
//       const token = getAuthToken();
//       // Create a review
//       const reviewResponse = await axios.post(`http://localhost:1337/api/ratings/reviews/${taskId}`, {
//         score: newRating,
//         comment: newComment,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const reviewId = reviewResponse.data.id;

//       // Link review to task using the new endpoint
//       await axios.post(`http://localhost:1337/api/ratings/taskratings`, {
//         review: reviewId,
//         task: taskId,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       setMessage(`Successfully updated rating for task with ID: ${taskId}`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         // Log detailed error response
//         console.error('Error updating rating:', error.response?.data || error.message);
//       } else {
//         console.error('Unexpected error:', error);
//       }
//       setMessage('Error updating rating.');
//     }
//   };

//   return (
//     <div>
//       <h1>Tasks</h1>
//       {tasks.length > 0 ? (
//         tasks.map((task) => (
//           <div key={task.id} className="task-item">
//             <p><strong>Task Description:</strong> {task.task_description}</p>
//             <p><strong>Customer:</strong> {task.customer}</p>
//             <p><strong>Service Provider:</strong> {task.serviceprovider}</p>
//             <p><strong>Start Date:</strong> {task.start_date}</p>
//             <p><strong>End Date:</strong> {task.end_date}</p>

//             <div className="rating-section">
//               {selectedTaskId === task.id && (
//                 <>
//                   <div className="rating-icons">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <span
//                         key={star}
//                         className={`rating-icon ${rating >= star ? 'active' : ''}`}
//                         onClick={() => setRating(star)}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Leave a comment"
//                   />
//                   <button onClick={() => updateRating(task.id, rating, comment)}>Submit Rating</button>
//                 </>
//               )}
//               <button onClick={() => setSelectedTaskId(task.id)}>Rate Task</button>
//             </div>

//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No tasks available.</p>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Tasks;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Task.css';

// type Task = {
//   id: number;
//   customer: string;
//   serviceprovider: string;
//   task_description: string;
//   start_date: string;
//   end_date: string;
// };

// // Function to get token from local storage
// const getAuthToken = () => localStorage.getItem('authToken');

// const Tasks: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [rating, setRating] = useState<number>(0);
//   const [comment, setComment] = useState<string>('');
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
//   const [message, setMessage] = useState<string>('');

//   // Fetch tasks from the API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = getAuthToken();
//         const response = await axios.get('http://localhost:1337/api/ratings/tasks', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Update the rating and post to the backend
//   const updateRating = async (taskId: number, newRating: number, newComment: string) => {
//     setRating(newRating);
//     setComment(newComment);
//     try {
//       const token = getAuthToken();
//       // Create a review
//       const reviewResponse = await axios.post(`http://localhost:1337/api/ratings/reviews/${taskId}`, {
//         score: newRating,
//         comment: newComment,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const reviewId = reviewResponse.data.id;

//       // Link review to task using the new endpoint
//       await axios.post(`http://localhost:1337/api/ratings/taskratings`, {
//         review: reviewId,
//         task: taskId,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       setMessage(`Successfully updated rating for task with ID: ${taskId}`);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Error updating rating:', error.response?.data || error.message);
//       } else {
//         console.error('Unexpected error:', error);
//       }
//       setMessage('Error updating rating.');
//     }
//   };

//   return (
//     <div>
//       <h1>Tasks</h1>
//       {tasks.length > 0 ? (
//         tasks.map((task) => (
//           <div key={task.id} className="task-item">
//             <p><strong>Task Description:</strong> {task.task_description}</p>
//             <p><strong>Customer:</strong> {task.customer}</p>
//             <p><strong>Service Provider:</strong> {task.serviceprovider}</p>
//             <p><strong>Start Date:</strong> {task.start_date}</p>
//             <p><strong>End Date:</strong> {task.end_date}</p>

//             <div className="rating-section">
//               {selectedTaskId === task.id && (
//                 <>
//                   <div className="rating-icons">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <span
//                         key={star}
//                         className={`rating-icon ${rating >= star ? 'active' : ''}`}
//                         onClick={() => setRating(star)}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Leave a comment"
//                   />
//                   <button onClick={() => updateRating(task.id, rating, comment)}>Submit Rating</button>
//                 </>
//               )}
//               <button onClick={() => setSelectedTaskId(task.id)}>Rate Task</button>
//             </div>

//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No tasks available.</p>
//       )}

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default Tasks;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css';

type Task = {
  id: number;
  customer: string;
  serviceprovider: string;
  task_description: string;
  start_date: string;
  end_date: string;
};

type Review = {
  id: number;
  score: number;
  comment: string;
};

type TaskWithReviews = Task & {
  reviews: Review[];
};

// Function to get token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskWithReviews[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:1337/api/ratings/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const tasksData: Task[] = response.data;

        // Fetch reviews for each task
        const tasksWithReviews = await Promise.all(tasksData.map(async (taskId) => {
          const reviewsResponse = await axios.get(`http://localhost:1337/api/ratings/reviews/${taskId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const reviews = reviewsResponse.data.review || []; // Adjust based on your response format

          return { ...taskId, reviews };
        }));

        setTasks(tasksWithReviews);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Update the rating and post to the backend
  const updateRating = async (taskId: number, newRating: number, newComment: string) => {
    setRating(newRating);
    setComment(newComment);
    try {
      const token = getAuthToken();
      // Create a review
      const reviewResponse = await axios.post(`http://localhost:1337/api/ratings/reviews/${taskId}`, {
        score: newRating,
        comment: newComment,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const reviewId = reviewResponse.data.id;

      // Link review to task using the new endpoint
      await axios.post(`http://localhost:1337/api/ratings/taskratings`, {
        review: reviewId,
        task: taskId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update local state
      setTasks(tasks.map(task =>
        task.id === taskId
          ? { ...task, reviews: [...task.reviews, { id: reviewId, score: newRating, comment: newComment }] }
          : task
      ));

      setMessage(`Successfully updated rating for task with ID: ${taskId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating rating:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setMessage('Error updating rating.');
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <p><strong>Task Description:</strong> {task.task_description}</p>
            <p><strong>Customer:</strong> {task.customer}</p>
            <p><strong>Service Provider:</strong> {task.serviceprovider}</p>
            <p><strong>Start Date:</strong> {task.start_date}</p>
            <p><strong>End Date:</strong> {task.end_date}</p>

            <div className="reviews-section">
              <h4>Reviews:</h4>
              {task.reviews.length > 0 ? (
                task.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <p><strong>Rating:</strong> {review.score}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            <div className="rating-section">
              {selectedTaskId === task.id && (
                <>
                  <div className="rating-icons">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`rating-icon ${rating >= star ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment"
                  />
                  <button onClick={() => updateRating(task.id, rating, comment)}>Submit Rating</button>
                </>
              )}
              <button onClick={() => setSelectedTaskId(task.id)}>Rate Task</button>
            </div>

            <hr />
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Tasks;
