import { Card } from "react-bootstrap";

const BaseCard = ({ title, body, classNames, ...props }) => {
   return (
      <Card className={`bg-dark text-center ${classNames}`} {...props}>
         <Card.Title className="lead display-5 text-primary text-gradient p-2 border-bottom border-secondary">{title}</Card.Title>
         <Card.Body className="text-success lead display-5">{body}</Card.Body>
      </Card>
   );
};

export default BaseCard;
