import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteParticipant,
    fetchParticipant,
    removeSelectedParticipant,
    updateParticipant,
    updateParticipantImage
} from "store/slices/participantsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const ParticipantEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {participant} = useAppSelector((state) => state.participants)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(participant?.name)

    const [description, setDescription] = useState<string>(participant?.description)

    const [phone, setPhone] = useState<number>(participant?.phone)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(participant?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveParticipant = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateParticipantImage({
                participant_id: participant.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            phone
        }

        await dispatch(updateParticipant({
            participant_id: participant.id,
            data
        }))

        navigate("/participants-table/")
    }

    useEffect(() => {
        dispatch(fetchParticipant(id))
        return () => dispatch(removeSelectedParticipant())
    }, []);

    useEffect(() => {
        setName(participant?.name)
        setDescription(participant?.description)
        setPhone(participant?.phone)
        setImgURL(participant?.image)
    }, [participant]);

    const handleDeleteParticipant = async () => {
        await dispatch(deleteParticipant(id))
        navigate("/participants-table/")
    }

    if (!participant) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="text" label="Телефон" placeholder="Введите телефон" value={phone} setValue={setPhone}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveParticipant}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteParticipant}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ParticipantEditPage