// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import Kanika from "../Photos/Kanika.jpg";
// import Apurv from "../Photos/Apurv.jpg";
// import Archit from "../Photos/Archit.jpg";


// function About() {

//   return (
//     <div className="d-flex justify-content-around mt-5">
//       <Card style={{ width: '18rem' }} className="shadow">
//         <Card.Img variant="top" src={Kanika} />
//         <Card.Body>
//           <Card.Title>Kanika Rawal</Card.Title>
//           <Card.Text>Developer pursuing PG-DAC from CDAC-Khargar. </Card.Text>
//         </Card.Body>
//       </Card>
//       <Card style={{ width: '18rem' }} className="shadow">
//         <Card.Img variant="top" src={Apurv} />
//         <Card.Body>
//           <Card.Title>Apurv Gore</Card.Title>
//           <Card.Text>Developer and Gamer</Card.Text>
//         </Card.Body>
//       </Card>
//       <Card style={{ width: '18rem' }} className="shadow">
//         <Card.Img variant="top" src={Archit} />
//         <Card.Body>
//           <Card.Title>Archit Dobriyal</Card.Title>
//           <Card.Text>Developer and Anime enthusiast</Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default About;

import { Card } from "react-bootstrap";
import Kanika from "../Photos/Monali.jpeg"; 
import Apurv from "../Photos/Apurv.jpg";
import Archit from "../Photos/Chirayu.jpeg";
import Anjum from "../Photos/Anjum.jpg";
import Shashank from "../Photos/Shashank.jpg";

const TeamMembers = () => {
  return (
    <div className="d-flex justify-content-around mt-5">
      <Card style={{ width: '18rem', margin: '0 1rem' }} className="shadow">
        <Card.Img variant="top" src={Kanika} />
        <Card.Body>
          <Card.Title>Monali Surani</Card.Title>
          <Card.Text>Student at CDAC, Mumbai</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '0 1rem' }} className="shadow">
        <Card.Img variant="top" src={Apurv} />
        <Card.Body>
          <Card.Title>Apurv Gore</Card.Title>
          <Card.Text>Student at CDAC, Mumbai</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '0 1rem' }} className="shadow">
        <Card.Img variant="top" src={Archit} />
        <Card.Body>
          <Card.Title>Chirayu Vibhute</Card.Title>
          <Card.Text>Student at CDAC, Mumbai</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '0 1rem' }} className="shadow">
        <Card.Img variant="top" src={Anjum} />
        <Card.Body>
          <Card.Title>Anjum Naaz</Card.Title>
          <Card.Text>Student at CDAC, Mumbai</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '0 1rem' }} className="shadow">
        <Card.Img variant="top" src={Shashank} />
        <Card.Body>
          <Card.Title>Shashank Dalvi</Card.Title>
          <Card.Text>Student at CDAC, Mumbai</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeamMembers;
