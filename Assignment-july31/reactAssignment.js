import React, { useState } from 'react';
import axios from 'axios';

const Card = props => {
  return (
    <div style={{ margin: '1em' }}>
      <img alt="avatar" style={{ width: '70px' }} src={props.avatar_url} />
      <div>
        <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        <div>{props.blog}</div>
      </div>
    </div>
  );
};

const CardList = props => (
  <div>
    {props.cards.map(card => (
      <Card key={card.id} {...card} />
    ))}
  </div>
);

const Form = props => {
  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${username}`)
      .then(resp => {
        props.onSubmit(resp.data);
        setUsername('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="GitHub username"
        required
      />
      <button type="submit">Add card</button>
    </form>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);

  const addNewCard = cardInfo => {
    setCards(cards.concat(cardInfo));
  };

  return (
    <div>
      <Form onSubmit={addNewCard} />
      <CardList cards={cards} />
    </div>
  );
};

export default App;