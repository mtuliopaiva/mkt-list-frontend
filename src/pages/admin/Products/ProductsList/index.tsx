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

interface DataType {
  key: string;
  name: string;
  category: string;
  brand: string;
  color: string;
  sizes: string[];
}

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const ProductsList = () => {
  const navigate = useNavigate();

  const columns: TableProps<DataType>["columns"] = [
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
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Cor",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Tamanhos",
      key: "sizes",
      dataIndex: "sizes",
      render: (_, { sizes }) => (
        <>
          {sizes.map((size) => {
            let color;
            switch (size) {
              case "PP":
                color = "#ffcccc";
                break;
              case "P":
                color = "#ff6666";
                break;
              case "M":
                color = "#ffff99";
                break;
              case "G":
                color = "#cc99ff";
                break;
              case "GG":
                color = "#9933ff";
                break;
              default:
                color = "#add8e6";
                break;
            }
            return (
              <Tag
                color={color}
                key={size}
                style={{ color: "#000", fontWeight: "700" }}
              >
                {size.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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

  const data: DataType[] = [
    {
      key: "1",
      name: "Camiseta listrada - Nike",
      category: "Camiseta",
      brand: "Nike",
      color: "Branco/Preto",
      sizes: ["P", "PP", "M", "G", "GG"],
    },
    {
      key: "2",
      name: "Calça jeans skinny - Levi's",
      category: "Calça",
      brand: "Levi's",
      color: "Azul",
      sizes: ["38", "40", "42", "44", "46"],
    },
    {
      key: "3",
      name: "Tênis esportivo - Adidas",
      category: "Tênis",
      brand: "Adidas",
      color: "Branco",
      sizes: ["38", "39", "40", "41", "42"],
    },
    {
      key: "4",
      name: "Camiseta básica - Puma",
      category: "Camiseta",
      brand: "Puma",
      color: "Cinza",
      sizes: ["P", "M", "G", "GG"],
    },
    {
      key: "5",
      name: "Calça moletom - Nike",
      category: "Calça",
      brand: "Nike",
      color: "Preto",
      sizes: ["P", "M", "G", "GG"],
    },
    {
      key: "6",
      name: "Tênis casual - Converse",
      category: "Tênis",
      brand: "Converse",
      color: "Preto",
      sizes: ["37", "38", "39", "40", "41"],
    },
    {
      key: "7",
      name: "Camiseta estampada - Vans",
      category: "Camiseta",
      brand: "Vans",
      color: "Preto/Vermelho",
      sizes: ["P", "PP", "M", "G", "GG"],
    },
  ];

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
          <Table className="my-6" columns={columns} dataSource={data} />
        </div>
      </LayoutBaseAdmin>
    </>
  );
};

export default ProductsList;
