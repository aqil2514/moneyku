import FormLogin from "./LoginForm";
import LoginImage from "./LoginImage";

export const Title = () => {
  return (
    <h1 className="text-4xl font-libre-baskerville font-bold text-center text-lime-600 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition duration-300 underline">
      Moneyku
    </h1>
  );
};

export const LoginContainer = () => {
    return (
      <div className="w-1/2 bg-white mx-auto grid grid-cols-2 rounded-xl gap-4 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <FormLogin />
        <LoginImage />
      </div>
    );
  };
  