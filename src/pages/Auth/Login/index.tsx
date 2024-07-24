import { useNavigate } from "react-router-dom";
import ImgComponent from "../../../components/Img";
import TextComponent from "../../../components/TextComponent";
import TextInput from "../../../components/Inputs/TextInput";
import ButtonComponent from "../../../components/Buttons/ButtonComponent";
import loginImage from '../../../../public/general/mkt-list-image.png'

const LoginPage = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center bg-[#C7E0DF]">
        <ImgComponent src={loginImage} width={'100vw'} height={'100vh'} />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gray-100">
        <TextComponent
          size="2em"
          weight="700"
          color="#34AFB8" 
          className="mb-6"
        >
          Market List
        </TextComponent>

        <TextInput label={"E-mail"} name={"email"} type="email"/>
        <TextInput label={"Password"} name={"password"} type="password"/>
        <ButtonComponent label="Login" className="bg-teal-500 text-white rounded align-center"
        onClick={() => navigate('/admin/dashboard')}
        />
        <div className="flex flex-row mt-6">
        <ButtonComponent type="link" label="Esqueceu sua senha?" className="border-none" onClick={() => navigate('/forgot-password')}/>
        <ButtonComponent type="link" label="Registrar" className="border-none" onClick={() => navigate('/register')}/>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
