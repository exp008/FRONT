import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "store/store.ts";
import {T_Participant} from "modules/types.ts";
import {useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addParticipantToTender, fetchParticipants} from "store/slices/participantsSlice.ts";
import {removeParticipantFromDraftTender} from "store/slices/tendersSlice.ts";

type Props = {
    participant: T_Participant,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
}

const ParticipantCard = ({participant,  showAddBtn=false, showRemoveBtn=false}:Props) => {

    const dispatch = useAppDispatch()

    const [local_won, setLocal_won] = useState(participant.won)
    
    const location = useLocation()

    const isTenderPage = location.pathname.includes("tenders")

    const handeAddToDraftTender = async () => {
        await dispatch(addParticipantToTender(participant.id))
        await dispatch(fetchParticipants())
    }

    const handleRemoveFromDraftTender = async () => {
        await dispatch(removeParticipantFromDraftTender(participant.id))
    }

    if (isTenderPage) {
        return (
            <Card key={participant.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={participant.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {participant.name}
                            </CardTitle>
                            <CardText>
                                Телефон: {participant.phone}.
                            </CardText>
                            <CustomInput label="Выиграл" type="text" value={local_won ? "Да" : "Нет"} setValue={setLocal_won} disabled={true} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/participants/${participant.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftTender}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={participant.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={participant.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {participant.name}
                </CardTitle>
                <CardText>
                    Телефон: {participant.phone}.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/participants/${participant.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftTender}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default ParticipantCard