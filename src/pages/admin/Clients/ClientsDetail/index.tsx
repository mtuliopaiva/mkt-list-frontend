import { Input, Spin, message, Button, Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";
import TextComponent from "../../../../components/TextComponent";

const { Option } = Select;

const ClientsDetail = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [cepValue, setCepValue] = useState<string>("");

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleSearchCep = useCallback(
    debounce(async (cep: string) => {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log("Data", data);
        if (response.ok && !data.erro) {
          const { localidade, uf, bairro, logradouro } = data;
          form.setFieldsValue({
            state: uf,
            city: localidade,
            neighborhood: bairro,
            street: logradouro,
          });
          message.success("CEP encontrado e informações preenchidas.");
        } else {
          message.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        message.error("Erro ao buscar CEP.");
      } finally {
        setLoading(false);
      }
    }, 1500),
    [form]
  );

  const onSearch = () => {
    handleSearchCep(cepValue);
  };

  return (
    <LayoutBaseAdmin>
      <div className="w-full flex flex-col w-full h-screen">
        <TextComponent size="2em" weight="700" color="#243D5C" className="my-6">
          Criar Cliente
        </TextComponent>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="w-full grid grid-cols-3 gap-6">
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Telefone"
              hasFeedback
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="channel"
              label="Como chegou até nós?"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Select placeholder="Selecione o canal">
                <Option value="linkedin">Linkedin</Option>
                <Option value="instagram">Instagram</Option>
                <Option value="facebook">Facebook</Option>
                <Option value="indication">Indicação</Option>
                <Option value="others">Outros</Option>
              </Select>
            </Form.Item>

            <Form.Item name="cep" label="Cep" className="w-full">
              {loading ? (
                <Spin size="small" />
              ) : (
                <Input.Search
                  placeholder="Insira o CEP"
                  onSearch={onSearch}
                  size="large"
                  value={cepValue}
                  onChange={(e) => setCepValue(e.target.value)}
                />
              )}
            </Form.Item>

            <Form.Item
              name="street"
              label="Rua"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" disabled />
            </Form.Item>

            <Form.Item
              name="neighborhood"
              label="Bairro"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" disabled />
            </Form.Item>

            <Form.Item
              name="city"
              label="Cidade"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" disabled />
            </Form.Item>

            <Form.Item
              name="state"
              label="Estado"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" disabled />
            </Form.Item>

            <Form.Item
              name="number"
              label="Número"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="complement"
              label="Complemento"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input type="text" />
            </Form.Item>
          </div>

          <Form.Item>
            <div className="flex justify-end gap-6 mt-4">
              <Button
                className="bg-[#fff] h-12"
                size="large"
                htmlType="reset"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>

              <Button
                className="bg-[#A9E8DD] h-12"
                size="large"
                htmlType="submit"
              >
                Criar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </LayoutBaseAdmin>
  );
};

export default ClientsDetail;
