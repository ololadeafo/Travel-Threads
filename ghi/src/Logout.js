import { useLogoutMutation } from "./services/Travelthreads"

const Logout = () => {
    const [logout] = useLogoutMutation()
    return (
        <button
            className="btn btn-danger"
            onClick={logout}
        >
            Logout
        </button>
    )
}

export default Logout