import React, { useState, useContext } from "react";
import { STRAPI } from "../lib/urls";
import AuthContext from "../context/AuthContext";

const StrapiLogin = () => {
  return (
    <div className="d-flex flex-column">
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

const RegisterForm = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);

  const validInputs = () => {
    return username !== "" && email !== "" && password !== "" && password2 !== "";
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validInputs()) {
      return;
    }
    if (password !== password2) {
      console.log("Both passwords must match");
      return;
    }
    const url = `${STRAPI}/api/auth/local/register`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      const data = await res.json();
      // Store the token in local storage
      localStorage.setItem('authToken', data.jwt);
      // Set user context
      loginUser({
        username,
        email,
        id: data.user.id,
        token: data.jwt,
      });
      console.log('Successfully registered');
    } catch (error) {
      console.log(error);
    }
  };

  const extraProps = !validInputs() ? { disabled: true } : {};

  return (
    <div className="d-flex flex-column border rounded p-1 p-md-3">
      <h4 className="fs-5 text-center">Register</h4>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label className="d-flex flex-column mb-2">
          Name
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={handleName}
            required
          />
        </label>
        <label className="d-flex flex-column mb-2">
          Email
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={handleEmail}
            required
          />
        </label>
        <label className="d-flex flex-column mb-2">
          Password
          <input
            className="form-control"
            type={show ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            required
          />
        </label>
        <label className="d-flex flex-column mb-2">
          Confirm Password
          <input
            className="form-control"
            type={show ? "text" : "password"}
            value={password2}
            onChange={handlePassword2}
            required
          />
        </label>
        <label className="d-flex">
          <input
            className="form-check me-1"
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
          />
          Show password
        </label>
        <button
          type="submit"
          className="btn btn-secondary"
          {...extraProps}
        >
          Register
        </button>
      </form>
    </div>
  );
};

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validInputs = () => {
    return email !== "" && password !== "";
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validInputs()) {
      return;
    }
    const url = `${STRAPI}/api/auth/local`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error('Invalid email or password');
      }
      // Store the token in local storage
      localStorage.setItem('authToken', body.jwt);
      // Set user context
      loginUser({
        username: body.user.username,
        email: body.user.email,
        id: body.user.id,
        token: body.jwt,
      });
    } catch (error) {
      console.log(error);
      console.log('Invalid email or password');
    }
  };

  return (
    <div className="d-flex flex-column mt-3 border rounded p-1 p-md-3">
      <h4 className="fs-5 text-center">Login</h4>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label className="d-flex flex-column mb-2">
          Email
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={handleEmail}
            required
          />
        </label>
        <label className="d-flex flex-column mb-2">
          Password
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!validInputs()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StrapiLogin;
