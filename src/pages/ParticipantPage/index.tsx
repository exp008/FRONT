import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Participant} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {ParticipantMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedParticipant: T_Participant | null,
    setSelectedParticipant: React.Dispatch<React.SetStateAction<T_Participant | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ParticipantPage = ({selectedParticipant, setSelectedParticipant, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/participants/${id}`)
            const data = await response.json()
            setSelectedParticipant(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedParticipant(ParticipantMocks.find(participant => participant?.id == parseInt(id as string)) as T_Participant)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedParticipant(null)
    }, []);

    if (!selectedParticipant) {
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
                        src={isMock ? mockImage as string : selectedParticipant.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedParticipant.name}</h1>
                    <p className="fs-5">Описание: {selectedParticipant.description}</p>
                    <p className="fs-5">Телефон: {selectedParticipant.phone}.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ParticipantPage