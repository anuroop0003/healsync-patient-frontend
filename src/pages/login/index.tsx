import LoginForm from "./components/login-form";

const Login = () => {
  return (
    <div className="bg-muted flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 justify-center font-medium text-xl">
          <svg
            className="size-8"
            width="1024"
            height="1024"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="1024" height="1024" rx="150" fill="black" />
            <path
              d="M287 512H737"
              stroke="white"
              strokeWidth="100"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M287 812V212"
              stroke="white"
              strokeWidth="100"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M737 812V212"
              stroke="white"
              strokeWidth="100"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          HealSync.
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
