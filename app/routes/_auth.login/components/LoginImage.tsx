const LoginImage = () => {
  return (
    <div className="relative flex justify-center items-center p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <img
        src="/images/login-form.png"
        alt="Login Illustration"
        className="w-full max-w-xs rounded transition duration-300 transform hover:scale-105"
      />
    </div>
  );
};

export default LoginImage;
