import React, { useCallback, useState } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { resetPassword } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const Reset = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
            <div className="module-spacer--medium"></div>
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className={"center"}>
                <PrimaryButton
                    label={"パスワードリセット"}
                    onClick={() => dispatch(resetPassword(email))}
                />
            </div>
            <p onClick={() => dispatch(push('/signup'))}>ログイン画面に戻る</p>
            <p onClick={() => dispatch(push('/signin/reset'))}>アカウントをお持ちでない方</p>
        </div>
    )
}

export default Reset