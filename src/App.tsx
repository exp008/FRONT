import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ParticipantPage from "pages/ParticipantPage";
import ParticipantsListPage from "pages/ParticipantsListPage";
import {Route, Routes} from "react-router-dom";
import {T_Participant} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [participants, setParticipants] = useState<T_Participant[]>([])

    const [selectedParticipant, setSelectedParticipant] = useState<T_Participant | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [participantName, setParticipantName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedParticipant={selectedParticipant} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/participants/" element={<ParticipantsListPage participants={participants} setParticipants={setParticipants} isMock={isMock} setIsMock={setIsMock} participantName={participantName} setParticipantName={setParticipantName}/>} />
                        <Route path="/participants/:id" element={<ParticipantPage selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
