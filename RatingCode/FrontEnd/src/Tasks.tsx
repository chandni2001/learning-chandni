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
  createdAt: string;
  author: {
    username: string;
  };
};

type TaskWithReviews = Task & {
  userReview?: Review | null;
};

// Function to get token from local storage
const getAuthToken = () => localStorage.getItem('token');

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskWithReviews[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [ratedTaskIds, setRatedTaskIds] = useState<number[]>([]); // Track rated tasks
  const [message, setMessage] = useState<{ taskId: number | null; text: string }>({
    taskId: null,
    text: '',
  });

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:1337/api/ratings/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tasksData: Task[] = response.data;

        // Fetch reviews for each task
        const tasksWithReviews = await Promise.all(
          tasksData.map(async (task) => {
            const reviewsResponse = await axios.get(
              `http://localhost:1337/api/ratings/reviews/${task.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // Extract the userReview from the response
            const userReview = reviewsResponse.data.userReview || null;
            return { ...task, userReview };
          })
        );

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
      const reviewResponse = await axios.post(
        `http://localhost:1337/api/ratings/reviews/${taskId}`,
        {
          score: newRating,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reviewId = reviewResponse.data.id;

      // Link review to task using the new endpoint
      await axios.post(
        `http://localhost:1337/api/ratings/taskratings`,
        {
          review: reviewId,
          task: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with the new review
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                userReview: {
                  id: reviewId,
                  score: newRating,
                  comment: newComment,
                  createdAt: new Date().toISOString(),
                  author: { username: 'You' },
                },
              }
            : task
        )
      );

      // Add the task to the rated list and reset selectedTaskId
      setRatedTaskIds((prevIds) => [...prevIds, taskId]);
      setSelectedTaskId(null);
      setMessage({ taskId, text: `Successfully updated rating for task with ID: ${taskId}` });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating rating:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setMessage({ taskId, text: 'Error updating rating.' });
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <p className="task-details">
  <strong>Task Description:</strong> {task.task_description}
</p>
<p className="task-details">
  <strong>Customer:</strong> {task.customer}
</p>
<p className="task-details">
  <strong>Service Provider:</strong> {task.serviceprovider}
</p>
<p className="task-details">
  <strong>Start Date:</strong> {task.start_date}
</p>
<p className="task-details">
  <strong>End Date:</strong> {task.end_date}
</p>


            <div className="reviews-section">
              <h4>Review:</h4>
              {task.userReview ? (
                <div className="review-item">
                  <p>
                    <strong>Rating:</strong> {task.userReview.score}
                  </p>
                  <p>
                    <strong>Comment:</strong> {task.userReview.comment}
                  </p>
                  <p>
                    <strong>By:</strong> {task.userReview.author.username}
                  </p>
                  <hr />
                </div>
              ) : (
                <p>No review available yet.</p>
              )}
            </div>

            <div className="rating-section">
              {/* Show success message before the rate button */}
              {message.taskId === task.id && <p className="message">{message.text}</p>}

              {selectedTaskId === task.id ? (
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
              ) : (
                !ratedTaskIds.includes(task.id) && (
                  <button onClick={() => setSelectedTaskId(task.id)}>Rate Task</button>
                )
              )}

              {/* Show the new review immediately after submission */}
              {task.userReview && ratedTaskIds.includes(task.id) && (
                <div className="review-item user-review">
                  <p>
                    <strong>Your Rating:</strong> {task.userReview.score}
                  </p>
                  <p>
                    <strong>Your Comment:</strong> {task.userReview.comment}
                  </p>
                  <p>
                    <strong>By:</strong> You
                  </p>
                </div>
              )}
            </div>

            <hr />
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
