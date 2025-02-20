import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchParticipants, updateParticipantName} from "store/slices/participantsSlice.ts";
import ParticipantCard from "components/ParticipantCard/ParticipantCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const ParticipantsListPage = () => {

    const dispatch = useAppDispatch()

    const {participants, participant_name} = useAppSelector((state) => state.participants)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_tender_id, participants_count} = useAppSelector((state) => state.tenders)

    const hasDraft = draft_tender_id != null

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_tender_id={draft_tender_id} participants_count={participants_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {participants?.map(participant => (
                    <Col key={participant.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <ParticipantCard participant={participant} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ParticipantsListPage