import { useState } from 'react';
import './index.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace the URL with the endpoint from the form submission service
    fetch('https://formspree.io/f/mpwzrevz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Thank you for your message!');
          setFormData({ name: '', email: '', message: '' }); // Reset form after successful submission
        } else {
          alert('Something went wrong, please try again.');
        }
      })
      .catch((error) => {
        alert('Error occurred: ' + error.message);
      });
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us for Pet Services</h2>
      <p>We offer a range of services to keep your pet happy and healthy!</p>
      <ul className="services-list">
        <li><strong>Pet Grooming:</strong> Starting at $30</li>
        <li><strong>Pet Sitting:</strong> $15 per hour</li>
        <li><strong>Dog Walking:</strong> $20 per walk</li>
      </ul>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="I would like to schedule a grooming appointment for my dog."
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
