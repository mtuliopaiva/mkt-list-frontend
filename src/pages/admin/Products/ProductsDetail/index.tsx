import { Input } from "antd";
import { useNavigate } from "react-router-dom";

import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload } from "antd";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";
import TextComponent from "../../../../components/TextComponent";

const { Option } = Select;


const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const ProductsDetail = () => {
  const navigate = useNavigate();


  return (
    <>
      <LayoutBaseAdmin>
        <div className="w-full flex flex-col w-full h-screen">
          <TextComponent
            size="2em"
            weight="700"
            color="#243D5C"
            className="my-6"
          >
            Criar Produto
          </TextComponent>
          <Form name="validate_other" onFinish={onFinish} layout="vertical">
            <div className="w-full flex">
              <div className="w-1/2 pr-4 h-[380px]">
                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </div>

              <div className="w-1/2 pr-4 h-[380px]">
                <div className="w-full flex gap-6">
                  <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true }]}
                    className="w-1/3"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="brand"
                    label="Marca"
                    rules={[{ required: true }]}
                    className="w-1/3"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label="Categoria"
                    hasFeedback
                    rules={[
                      { required: true, message: "Selecione a categoria" },
                    ]}
                    className="w-1/3"
                  >
                    <Select placeholder="Selecione a categoria">
                      <Option value="shirt">Camisetas</Option>
                      <Option value="pants">Calças</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  name="colorOptions"
                  label="Cores"
                  rules={[
                    {
                      required: true,
                      message: "Please select your favourite colors!",
                      type: "array",
                    },
                  ]}
                >
                  <Select mode="multiple" placeholder="Selecione as cores">
                    <Option value="red">Vermelho</Option>
                    <Option value="green">Verde</Option>
                    <Option value="blue">Azul</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="sizeOptions"
                  label="Tamanhos"
                  rules={[
                    {
                      required: false,
                      message: "Please select the sizes!",
                      type: "array",
                    },
                  ]}
                >
                  <Select mode="multiple" placeholder="Selecione os tamanhos">
                    <Option value="extraSmall">PP</Option>
                    <Option value="small">P</Option>
                    <Option value="medium">M</Option>
                    <Option value="big">G</Option>
                    <Option value="extraBig">GG</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="sizeNumberOptions"
                  label="Tamanho numérico"
                  rules={[
                    {
                      required: false,
                      message: "Please select the sizes!",
                      type: "array",
                    },
                  ]}
                >
                  <Select mode="multiple" placeholder="Selecione os tamanhos">
                    <Option value="num35">35</Option>
                    <Option value="num36">36</Option>
                    <Option value="num37">37</Option>
                    <Option value="num38">38</Option>
                    <Option value="num39">39</Option>
                    <Option value="num40">40</Option>
                    <Option value="num41">41</Option>
                    <Option value="num42">42</Option>
                    <Option value="num43">43</Option>
                    <Option value="num44">44</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-end gap-6">

                    <Button
                      className="bg-[#fff] h-12"
                      size={"large"}
                      htmlType="reset"
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className="bg-[#A9E8DD] h-12"
                      size={"large"}
                      htmlType="submit"
                    >
                      Criar
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </LayoutBaseAdmin>
    </>
  );
};

export default ProductsDetail;
