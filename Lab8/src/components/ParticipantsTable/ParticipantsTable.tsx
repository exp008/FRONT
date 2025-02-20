import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Participant} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteParticipant} from "store/slices/participantsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    participants:T_Participant[]
}

const ParticipantsTable = ({participants}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (participant_id) => {
        navigate(`/participants/${participant_id}`)
    }

    const openParticipantEditPage = (participant_id) => {
        navigate(`/participants/${participant_id}/edit`)
    }

    const handleDeleteParticipant = async (participant_id) => {
        dispatch(deleteParticipant(participant_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ value }) => <img src={value} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Телефон',
                accessor: 'phone',
                Cell: ({ value }) => value
            },
            {
                Header: 'Класс',
                accessor: 'clas',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openParticipantEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteParticipant(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!participants.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={participants} onClick={handleClick} />
    )
};

export default ParticipantsTable