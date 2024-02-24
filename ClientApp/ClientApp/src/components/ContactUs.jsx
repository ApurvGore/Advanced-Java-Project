import React from 'react';
import './ContactUs.css';

export function ContactUs(){
  const phoneNumber1 = "+91 93812 19891";
  const phoneNumber2 = "+91 87939 17442";
  const emailAddress = "contact@canteen.com";

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us for any inquiries or questions.</p>

      <div className="contact-details">
        <p>Phone: {phoneNumber1}</p>
        <p>Phone: {phoneNumber2}</p>
        <p>Email: {emailAddress}</p>
      </div>

      <div className="additional-details">
        <h2>Additional Information</h2>
        <p>Our office hours are Monday to Friday, 9:00 AM - 5:00 PM.</p>
        <p>We usually respond to emails within 24 hours.</p>
        <p>Address: Raintree Marg, Near Bharati Vidyapeeth, Opp. Kharghar Railway Station, Sector 7, CBD Belapur
           Navi Mumbai - 400 614 - Maharashtra (India)</p>
        <div className="social-links">
          
        </div>
      </div>
    </div>
  );
};


