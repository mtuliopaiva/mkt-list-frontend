import { Button, Popconfirm, Table, TableProps, Input } from "antd";
import {
  QuestionCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useNavigate } from "react-router-dom";
import TextComponent from "../../../../components/TextComponent";
import LayoutBaseAdmin from "../../../../components/LayoutBaseAdmin";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  channel: string;
}

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const ClientsList = () => {
  const navigate = useNavigate();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Canal",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Ações",
      render: (record) => (
        <div className="flex md:flex-1 flex-row gap-4 h-18 md:h-auto items-center justify-center md:w-full">
          <Button
            className="flex h-8 w-8 items-center justify-center rounded bg-[#B0F7E5]"
            onClick={() => navigate(`/admin/clients/view/${record.key}`)}
          >
            <EyeTwoTone twoToneColor="#284361" />
          </Button>

          <Button
            className="flex h-8 w-8 items-center justify-center rounded bg-[#B0F7E5]"
            onClick={() => navigate(`/admin/clients/edit/${record.key}`)}

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
      name: "Maria Marieta",
      email: "mariamarieta@gmail.com",
      phone: "34991445699",
      channel: "Instagram",
    },
    {
      key: "2",
      name: "José Joelison",
      email: "josejoelison@gmail.com",
      phone: "1691556988",
      channel: "Linkedin",
    },
    {
      key: "3",
      name: "Jaime Jose",
      email: "jaimejose@gmail.com",
      phone: "189544677",
      channel: "Sem informação",
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
            Clientes
          </TextComponent>
          <div className="flex flex-row justify-between">
            <Search
              placeholder="Buscar cliente..."
              size="large"
              onSearch={onSearch}
              style={{ width: "50%" }}
            />
            <Button
              className="bg-[#A9E8DD]"
              icon={<PlusOutlined />}
              size={"large"}
              onClick={() => navigate("/admin/clients/create")}
            >
              Cliente
            </Button>
          </div>
          <Table className="my-6" columns={columns} dataSource={data} />
        </div>
      </LayoutBaseAdmin>
    </>
  );
};

export default ClientsList;
