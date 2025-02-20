import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import ParticipantCard from "components/ParticipantCard/ParticipantCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updateParticipantName} from "src/store/slices/participantsSlice.ts";
import {T_Participant} from "modules/types.ts";
import {ParticipantMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"

type Props = {
    participants: T_Participant[],
    setParticipants: React.Dispatch<React.SetStateAction<T_Participant[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ParticipantsListPage = ({participants, setParticipants, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {participant_name} = useAppSelector((state) => state.participants)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateParticipantName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setParticipants(ParticipantMocks.filter(participant => participant.name.toLowerCase().includes(participant_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchParticipants()
    }

    const fetchParticipants = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/participants/?participant_name=${participant_name.toLowerCase()}`)
            const data = await response.json()
            setParticipants(data.participants)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchParticipants()
    }, []);

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
            </Row>
            <Row>
                {participants?.map(participant => (
                    <Col key={participant.id} sm="12" md="6" lg="4">
                        <ParticipantCard participant={participant} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ParticipantsListPage