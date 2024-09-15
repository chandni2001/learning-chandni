import { useEffect, useState } from "react";
import axios from "axios";

axios.interceptors.request.use(config => {
  console.log('Request sent to:', config.url);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('Response received from:', response.config.url);
  return response;
}, error => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

const AxiosExample = () => {
  const [user1Data, setUser1Data] = useState(null);
  const [user2Data, setUser2Data] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.all([
      axios.get('https://api.github.com/users/user1'),
      axios.get('https://api.github.com/users/user2')
    ])
    .then(axios.spread((response1, response2) => {
      setUser1Data(response1.data);
      setUser2Data(response2.data);
    }))
    .catch(error => {
      setError('An error occurred: ' + error.message);
    });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>GitHub Users</h1>
      <div>
        <h2>User 1</h2>
        {user1Data && (
          <ul>
            <li>ID: {user1Data.id}</li>
            <li>Login: {user1Data.login}</li>
            <li>Type: {user1Data.type}</li>
          </ul>
        )}
      </div>
      <div>
        <h2>User 2</h2>
        {user2Data && (
          <ul>
            <li>ID: {user2Data.id}</li>
            <li>Login: {user2Data.login}</li>
            <li>Type: {user2Data.type}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AxiosExample;
