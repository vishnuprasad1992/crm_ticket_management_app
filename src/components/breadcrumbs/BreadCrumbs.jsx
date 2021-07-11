import { Link } from "react-router-dom"
const BreadCrumbs = ({page}) => {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" >
                    <Link to="/" style={{textDecoration:"none"}}>
                    <li className="breadcrumb-item" >Home/ </li>
                    </Link>
                    <li className="breadcrumb-item active" aria-current="page">{page}</li>
                </ol>
            </nav>
        </div>
    )
}

export default BreadCrumbs
