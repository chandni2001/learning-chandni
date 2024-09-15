import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./AssignTask.css"

interface User {
  id: string;
  username: string;
}

interface LocationState {
  selectedUser: User;
}

const AssignTask: React.FC = () => {
  const location = useLocation<LocationState>();
  const navigate = useNavigate();
  const { selectedUser } = location.state;

  const [taskDescription, setTaskDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const token = localStorage.getItem('token');
  const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');

  const assignTask = async () => {
    if (!user || !token) {
      setAlertType('error');
      setAlertMessage('No access token found. Please login again.');
      setShowAlert(true);
      return;
    }

    try {
      console.log(user)
      console.log(selectedUser)
      await axios.post(
        'http://localhost:1337/api/ratings/tasks',
        {
          customer: user.id,
          serviceprovider: selectedUser.id,
          task_description: taskDescription,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.post(
        'http://localhost:1337/strapi-pusher-notifications/send-message',
        {
          title: `New Task from ${user.username}`,
          subtitle: `Task: ${taskDescription}`,
          channel: `channel-${selectedUser.username}`,
          event: 'event',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlertType('success');
      setAlertMessage('Task assigned successfully');
      setShowAlert(true);
    } catch (error) {
      console.error('Failed to assign task:', error);
      setAlertType('error');
      setAlertMessage('Failed to assign task');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <div className="assign-task-container">
      <h3>Assign Task</h3>

      <div className="form-container">
        <div className="form-group">
          <label>Customer</label>
          <input
            type="text"
            value={user?.username || ''}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Service Provider</label>
          <input
            type="text"
            value={selectedUser.username}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Task Description</label>
          <input
            type="text"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTaskDescription(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
          />
        </div>

        <button className="assign-task-button" onClick={assignTask}>
          Assign Task
        </button>

        {showAlert && (
          <div className={`alert ${alertType}`}>
            {alertMessage}
            <button onClick={handleCloseAlert} className="close-alert">
              &times;
            </button>
          </div>
        )}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default AssignTask;
