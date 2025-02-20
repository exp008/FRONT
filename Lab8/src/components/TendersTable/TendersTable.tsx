import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import TenderCard from "components/TenderCard/TenderCard.tsx";
import {T_Tender} from "modules/types.ts";
import "./TenderTable.css"

type Props = {
    tenders:T_Tender[]
}

const TendersTable = ({tenders}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Выиграл
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        <Col>
                            QR
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {tenders.map((tender, index) => (
                    <TenderCard tender={tender} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default TendersTable