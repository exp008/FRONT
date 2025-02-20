import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Participant} from "src/modules/types.ts";
import ParticipantCard from "components/ParticipantCard";
import {ParticipantMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    participants: T_Participant[],
    setParticipants: React.Dispatch<React.SetStateAction<T_Participant[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    participantName: string,
    setParticipantName: React.Dispatch<React.SetStateAction<string>>
}

const ParticipantsListPage = ({participants, setParticipants, isMock, setIsMock, participantName, setParticipantName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/participants/?participant_name=${participantName.toLowerCase()}`)
            const data = await response.json()
            setParticipants(data.participants)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setParticipants(ParticipantMocks.filter(participant => participant.name.toLowerCase().includes(participantName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={participantName} onChange={(e) => setParticipantName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {participants?.map(participant => (
                    <Col key={participant.id} xs="4">
                        <ParticipantCard participant={participant} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ParticipantsListPage