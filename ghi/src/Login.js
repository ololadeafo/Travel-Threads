import { useSelector, useDispatch } from "react-redux"
import React from "react"
import { handleEmailChange, handlePasswordChange, reset } from "./features/auth/loginSlice"
import { useLoginMutation } from "./services/auth"

const LoginForm = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const { fields } = useSelector(state => state.login)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit');
        console.log({fields});
        login(fields)
        dispatch(reset())
    }

    return (
        <>
        <div>
            <h5>Login</h5>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        id="login-email"
                        value={fields.email}
                        onChange={e => dispatch(handleEmailChange(e.target.value))}
                    />
                    <input
                        id="login-password"
                        value={fields.password}
                        onChange={e => dispatch(handlePasswordChange(e.target.value))}
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
        </>
    )

}

export default LoginForm
