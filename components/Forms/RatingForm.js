import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createRatings } from '../../api/ratingData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  label: '',
  userName: '',
};

export default function RatingForm({ eventId, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.warn(user, 'user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInput.label.trim() !== '') {
      const newRating = {
        label: formInput.label,
        userId: user.id,
        userName: user.userName,
      };

      await createRatings(eventId, newRating);

      onUpdate();

      setFormInput(initialState);
    } else {
      console.error('Label cannot be null or empty');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput3" label="submit a comment for the event" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button variant="outline-primary" type="submit">
        Submit Comment
      </Button>
    </Form>
  );
}

RatingForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// RatingForm.defaultProps = {
//   obj: initialState,
// };
