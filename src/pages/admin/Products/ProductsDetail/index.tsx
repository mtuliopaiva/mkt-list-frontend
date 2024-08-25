import { Input, AutoComplete } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload } from "antd";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";
import TextComponent from "../../../../components/TextComponent";
import { useEffect, useState } from "react";
import { getProductsByUuid } from "../../../../services/product.service";
import { listCategoriesAndSearch } from "../../../../services/categories.service";

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
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const edit = location.pathname.includes("edit");

  const [categories, setCategories] = useState<ReadCategoryDto[]>([]);

  async function fecthProductData(productUuid: string) {
    try {
      const response = await getProductsByUuid(productUuid);
      console.log(response);

      form.setFieldsValue({
        name: response.name,
        price: response.price,
        category: response.category.name,
      });
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados do produto:", error);
    }
  }

  async function getCategoriesList(
    page: number,
    itemsPerPage: number,
    search: string
  ) {
    try {
      const response = await listCategoriesAndSearch(
        page,
        itemsPerPage,
        search
      );
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados de auditoria:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fecthProductData(id);
      getCategoriesList(1, 20, '');
    }
  }, [id, edit]);

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
            {edit ? "Editar Produto" : "Ver Produto"}
          </TextComponent>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
          >
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
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[{ required: true }]}
                  className="w-full"
                >
                  <Input disabled={!edit} />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Preço"
                  rules={[{ required: true }]}
                  className="w-full"
                >
                  <Input type="number" disabled={!edit} />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Categoria"
                  rules={[
                    {
                      required: true,
                      message: "Selecione uma categoria",
                    },
                  ]}
                >
                  <AutoComplete
                    disabled={!edit}
                    options={categories.map((category) => ({
                      value: category.uuid, 
                      label: category.name,
                    }))}
                    filterOption={(inputValue, option) =>
                      option!.label.toLowerCase().includes(inputValue.toLowerCase())
                    }
                    placeholder="Selecione a categoria"
                  />
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
                    {edit ? (
                      <Button
                        className="bg-[#A9E8DD] h-12"
                        size={"large"}
                        htmlType="submit"
                      >
                        Salvar
                      </Button>
                    ) : null}
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
