import { Input, InputNumber, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { SkinOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload } from "antd";
import TextComponent from "../../../../components/TextComponent";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";
import { listCategoriesAndSearch } from "../../../../services/categories.service";
import { useEffect, useState } from "react";
import { createProduct } from "../../../../services/product.service";

const { Option } = Select;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};



const ProductsCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ReadCategoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
  
    try {
      const response = await createProduct({
        name: values.name,
        price: values.price,
        categoryUuid: values.category,
      });

      console.log(response);
      navigate('/admin/products');
  
      message.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      message.error("Erro ao criar o produto. Tente novamente.");
    }
  };

  async function getCategoriesList(search: string) {
    try {
      setLoading(true);
      const response = await listCategoriesAndSearch(1, 20, search);
      setCategories(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter as categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategoriesList("");
  }, []);

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
                      <SkinOutlined style={{ color: "#243D5C" }} />
                    </p>
                    <p className="ant-upload-text">
                      Clique ou arraste o arquivo para a área de upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </div>

              <div className="w-1/2 pr-4 h-[380px]">
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true }]}
                  className="w-full"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Preço"
                  rules={[{ required: true, type: 'number', min: 0 }]}
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    min={0} 
                    step={0.01} 
                    placeholder="Digite o preço" 
                  />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Categoria"
                  hasFeedback
                  rules={[{ required: true, message: "Selecione a categoria" }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione a categoria"
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={getCategoriesList}
                  >
                    {categories.map((category: any) => (
                      <Option
                        key={category.uuid ?? category.name}
                        value={category.uuid}
                      >
                        {category.name}
                      </Option>
                    ))}
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

export default ProductsCreate;
