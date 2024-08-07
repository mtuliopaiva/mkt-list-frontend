import { Button, Popconfirm, Table, TableProps, Tag, Input } from "antd";
import {
  QuestionCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useNavigate } from "react-router-dom";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";
import TextComponent from "../../../../components/TextComponent";
import { useEffect, useState } from "react";
import { listProductsAndSearch } from "../../../../services/product.service";
import { formatDate } from "../../../../utils/formatDate";

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const ProductsList = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState<ReadProductDto[]>([]);


  const columns: TableProps<ReadProductDto>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => formatDate(createdAt),
    },
    {
      title: "Ações",
      render: (record) => (
        <div className="flex md:flex-1 flex-row gap-4 h-18 md:h-auto items-center justify-center md:w-full">
          <Button
            className="flex h-8 w-8 items-center justify-center rounded bg-[#B0F7E5]"
            onClick={() => navigate(`/admin/products/view/${record.key}`)}
          >
            <EyeTwoTone twoToneColor="#284361" />
          </Button>

          <Button
            className="flex h-8 w-8 items-center justify-center rounded bg-[#B0F7E5]"
            onClick={() => navigate(`/admin/products/edit/${record.key}`)}

          >
            <EditTwoTone twoToneColor="#284361" />
          </Button>

          <Popconfirm
            title="Excluir o Produto?"
            description="Tem certeza que deseja deletar o produto?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okType="danger"
            cancelButtonProps={{ className: "custom-cancel-button" }}
            placement="top"
            okText="Sim"
            cancelText="Não"
          >
            <Button className="flex h-8 w-8 items-center justify-center rounded bg-[#B0F7E5]">
              <DeleteTwoTone twoToneColor="#284361" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  async function getProductsList(
    page: number,
    itemsPerPage: number,
    search: string
  ) {
    try {
      const response = await listProductsAndSearch(
        page,
        itemsPerPage,
        search
      );
      console.log(response);
      setProductsData(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados de auditoria:", error);
    }
  }
  
  useEffect(() => {

    getProductsList(1,20,'');

  }, []);

  return (
    <>
      <LayoutBaseAdmin>
        <div className="flex flex-col w-full h-screen">
          <TextComponent
            size="2em"
            weight="700"
            color="#243D5C"
            className="my-6"
          >
            Produtos
          </TextComponent>
          <div className="flex flex-row justify-between">
            <Search
              placeholder="Buscar produto..."
              size="large"
              onSearch={onSearch}
              style={{ width: "50%" }}
            />
            <Button
              className="bg-[#A9E8DD]"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => navigate("/admin/products/create")}
            >
              Produto
            </Button>
          </div>
          <Table className="my-6" columns={columns} dataSource={productsData} />
        </div>
      </LayoutBaseAdmin>
    </>
  );
};

export default ProductsList;
