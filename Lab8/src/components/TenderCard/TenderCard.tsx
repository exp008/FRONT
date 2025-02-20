import {Button, Card, Col, Row} from "reactstrap";
import {E_TenderStatus, T_Tender} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptTender, fetchTenders, rejectTender} from "store/slices/tendersSlice.ts";

import qricon from "../../assets/qricon.png";
import disabledicon from "../../assets/disabledicon.png";

import './TenderCard.css'

type Props = {
    tender: T_Tender
    index: number
}

const TenderCard = ({tender, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptTender = async (tender_id) => {
        await dispatch(acceptTender(tender_id))
        await dispatch(fetchTenders())
    }

    const handleRejectTender = async (tender_id) => {
        await dispatch(rejectTender(tender_id))
        await dispatch(fetchTenders())
    }

    const navigate = useNavigate()

    const openTenderPage = () => {
        navigate(`/tenders/${tender.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[tender.status]}
                </Col>
                <Col md={1}>
                    {tender.won}
                </Col>
                <Col>
                    {formatDate(tender.date_created)}
                </Col>
                <Col>
                    {formatDate(tender.date_formation)}
                </Col>
                <Col>
                    {formatDate(tender.date_complete)}
                </Col>
                <Col>
                    <div className="operat-icon">
                        {tender.status === 3 ? (
                        <div className="qr-hover-wrapper">
                            <img className="status-icon" src={qricon} alt="QR Icon" />
                            <div className="qr-hover">
                            {tender.qr && <img className="qr-code" src={`data:image/png;base64,${tender.qr}`} alt="QR Code" />}
                            <p>Описание: {tender.description}</p>
                            </div>
                        </div>
                        ) : (
                        <img className="status-icon disabled-icon" src={disabledicon} alt="Disabled Icon" />
                        )}
                    </div>
                </Col>

                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openTenderPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {tender.owner}
                        </Col>
                        <Col>
                            {tender.status == E_TenderStatus.InWork && <Button color="primary" onClick={() => handleAcceptTender(tender.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {tender.status == E_TenderStatus.InWork && <Button color="danger" onClick={() => handleRejectTender(tender.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default TenderCard