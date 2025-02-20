import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import ParticipantsListPage from "pages/ParticipantsListPage/ParticipantsListPage.tsx";
import ParticipantPage from "pages/ParticipantPage/ParticipantPage.tsx";
import TendersPage from "pages/TendersPage/TendersPage.tsx";
import TenderPage from "pages/TenderPage/TenderPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ParticipantsTablePage from "pages/ParticipantsTablePage/ParticipantsTablePage.tsx";
import ParticipantEditPage from "pages/ParticipantEditPage/ParticipantEditPage.tsx";
import ParticipantAddPage from "pages/ParticipantAddPage/ParticipantAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/participants/" element={<ParticipantsListPage />} />
                        <Route path="/participants-table/" element={<ParticipantsTablePage />} />
                        <Route path="/participants/:id/" element={<ParticipantPage />} />
                        <Route path="/participants/:id/edit" element={<ParticipantEditPage />} />
                        <Route path="/participants/add" element={<ParticipantAddPage />} />
                        <Route path="/tenders/" element={<TendersPage />} />
                        <Route path="/tenders/:id/" element={<TenderPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
