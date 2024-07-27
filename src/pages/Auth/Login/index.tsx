import { useNavigate } from "react-router-dom";
import ImgComponent from "../../../components/Img";
import TextComponent from "../../../components/TextComponent";
import TextInput from "../../../components/Inputs/TextInput";
import ButtonComponent from "../../../components/Buttons/ButtonComponent";
import loginImage from '../../../../public/general/mkt-list-image.png';
import { notification, Form } from "antd";
import { useState } from "react";
import { useAuth } from '../../../Context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInByEmail } = useAuth();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const result = await signInByEmail(values.email, values.password);

      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        notification.error({
          message: 'Erro de autenticação',
          description: result.errorMessage,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Erro',
        description: 'Verifique seus dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

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

        <Form form={form} className="w-full max-w-md">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor insira seu e-mail!' }]}
          >
            <TextInput label="E-mail" name="email" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
          >
            <TextInput label="Password" name="password" type="password" />
          </Form.Item>
          <Form.Item>
            <ButtonComponent
              label="Login"
              className="bg-teal-500 text-white rounded align-center"
              loading={loading}
              onClick={handleLogin}
            />
          </Form.Item>
        </Form>

        <div className="flex flex-row mt-6">
          <ButtonComponent
            type="link"
            label="Esqueceu sua senha?"
            className="border-none"
            onClick={() => navigate('/forgot-password')}
          />
          <ButtonComponent
            type="link"
            label="Registrar"
            className="border-none"
            onClick={() => navigate('/register')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
