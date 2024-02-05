import Link from "next/link"

export default function LoginForm(){

    return(
        <div className="LoginFromContainter">
            <h1>Login</h1>
            <form className="LoginFormInputForm">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <button>
                    Login
                </button>
                <Link href={'/register'}>Don't have an account? Sign up</Link>

            </form>

        </div>

    )
}
