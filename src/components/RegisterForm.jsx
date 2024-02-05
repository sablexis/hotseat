import Link from "next/link"

export default function RegisterForm(){

    return(
        <div className="LoginFromContainter">
            <h1>Login</h1>
            <form className="LoginFormInputForm">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <button>
                    Register
                </button>
                <Link href={'/login'}>Already have an account? Sign in</Link>

            </form>

        </div>

    )
}
