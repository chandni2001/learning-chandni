import { useEffect, useState } from "react";
import axios from "axios";

const CancelRequestExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a CancelToken source
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Make an Axios request
    axios
      .get("https://jsonplaceholder.typicode.com/users/1", {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        } else {
          setError("An error occurred: " + thrown.message);
        }
        setLoading(false);
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Data:</h1>
      {data && (
        <ul>
          <li>ID: {data.id}</li>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
        </ul>
      )}
    </div>
  );
};

export default CancelRequestExample;
