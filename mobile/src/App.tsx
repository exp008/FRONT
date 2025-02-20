import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ParticipantPage from "pages/ParticipantPage/ParticipantPage.tsx";
import ParticipantsListPage from "pages/ParticipantsListPage/ParticipantsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Participant} from "modules/types.ts";

function App() {

    const [participants, setParticipants] = useState<T_Participant[]>([])

    const [selectedParticipant, setSelectedParticipant] = useState<T_Participant | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedParticipant={selectedParticipant}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/participants/" element={<ParticipantsListPage participants={participants} setParticipants={setParticipants} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/participants/:id" element={<ParticipantPage selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
