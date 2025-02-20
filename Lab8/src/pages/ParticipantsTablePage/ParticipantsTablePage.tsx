import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchParticipants, updateParticipantName} from "store/slices/participantsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import ParticipantsTable from "components/ParticipantsTable/ParticipantsTable.tsx";

const ParticipantsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {participants, participant_name} = useAppSelector((state) => state.participants)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateParticipantName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchParticipants())
    }

    useEffect(() => {
        dispatch(fetchParticipants())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={participant_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/participants/add">
                        <Button color="primary">Создать участника</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {participants.length > 0 ? <ParticipantsTable participants={participants} fetchParticipants={fetchParticipants}/> : <h3 className="text-center mt-5">Участники не найдены</h3>}
            </Row>
        </Container>
    );
};

export default ParticipantsTablePage