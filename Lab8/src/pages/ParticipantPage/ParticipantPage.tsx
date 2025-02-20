import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchParticipant, removeSelectedParticipant} from "store/slices/participantsSlice.ts";

const ParticipantPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {participant} = useAppSelector((state) => state.participants)

    useEffect(() => {
        dispatch(fetchParticipant(id))
        return () => dispatch(removeSelectedParticipant())
    }, []);

    if (!participant) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={participant.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{participant.name}</h1>
                    <p className="fs-5">Описание: {participant.description}</p>
                    <p className="fs-5">Телефон: {participant.phone}</p>
                    <p className="fs-5">Класс: {participant.clas}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ParticipantPage