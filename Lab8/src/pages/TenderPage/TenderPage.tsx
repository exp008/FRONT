import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftTender,
    fetchTender,
    removeTender, sendDraftTender,
    triggerUpdateMM, updateTender
} from "store/slices/tendersSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_TenderStatus, T_Participant} from "modules/types.ts";
import ParticipantCard from "components/ParticipantCard/ParticipantCard.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const TenderPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const tender = useAppSelector((state) => state.tenders.tender)

    const [description, setDescription] = useState<string>(tender?.description)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchTender(id))
        return () => dispatch(removeTender())
    }, []);

    useEffect(() => {
        setDescription(tender?.description)
    }, [tender]);

    const sendTender = async (e) => {
        e.preventDefault()

        await saveTender()

        await dispatch(sendDraftTender())

        navigate("/tenders/")
    }

    const saveTender = async (e?) => {
        e?.preventDefault()

        const data = {
            description
        }

        await dispatch(updateTender(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteTender = async () => {
        await dispatch(deleteDraftTender())
        navigate("/participants/")
    }

    if (!tender) {
        return (
            <></>
        )
    }

    const isDraft = tender.status == E_TenderStatus.Draft

    return (
        <Form onSubmit={sendTender} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой тендер" : `Тендер №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription} disabled={!isDraft || is_superuser}/>
            </Row>
            <Row>
                {tender.participants.length > 0 ? tender.participants.map((participant:T_Participant) => (
                    <Row key={participant.id} className="d-flex justify-content-center mb-5">
                        <ParticipantCard participant={participant} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Участники не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveTender}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteTender}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default TenderPage