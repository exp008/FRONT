import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Participant} from "modules/types.ts";
import "./styles.css"

interface Props {
    selectedParticipant: T_Participant | null
}

const Breadcrumbs = ({ selectedParticipant }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/participants") &&
                <BreadcrumbItem active>
                    <Link to="/participants">
						Участники
                    </Link>
                </BreadcrumbItem>
			}
            {selectedParticipant &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedParticipant.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs