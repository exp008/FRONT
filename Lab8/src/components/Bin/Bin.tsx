import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_tender_id: string,
    participants_count: number
}

const Bin = ({isActive, draft_tender_id, participants_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/tenders/${draft_tender_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {participants_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin