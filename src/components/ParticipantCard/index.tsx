import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Participant} from "modules/types.ts";

interface ParticipantCardProps {
    participant: T_Participant,
    isMock: boolean
}

const ParticipantCard = ({participant, isMock}: ParticipantCardProps) => {
    return (
        <Card key={participant.id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : participant.image}
                style={{"height": "200px"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {participant.name}
                </CardTitle>
                <CardText>
                    Телефон: {participant.phone}.
                </CardText>
                <Link to={`/participants/${participant.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ParticipantCard