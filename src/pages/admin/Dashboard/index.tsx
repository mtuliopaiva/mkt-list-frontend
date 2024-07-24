import React, { useEffect, useState } from "react";
import { Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import LayoutBaseAdmin from "../../../components/LayoutBaseAdmin";
import TextComponent from "../../../components/TextComponent";
import { apiRequest } from "../../../services/api";
// import { apiRequest } from "../../../services/api";

const DashboardPage = () => {
  const [data, setData] = useState({
    lists: 10,
    products: 11.28,
    newClients: 23,
    categories: 8,
  });

  const [connectionTest, setConnectionTest] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest<any>("get", "/test-connection");
        setConnectionTest("Connection successful!");
      } catch (error) {
        setConnectionTest("Connection failed!");
        console.error("Erro ao testar a conexão", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <LayoutBaseAdmin>
        <div className="w-full h-screen">
          <TextComponent
            size="2em"
            weight="700"
            color="#243D5C"
            className="my-6"
          >
            Dashboard
          </TextComponent>
          <div className="w-full flex justify-between">
            <div className="w-1/4 m-2">
              <Card bordered={false}>
                <Statistic
                  title="Lists"
                  value={data.lists}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix={<ArrowUpOutlined />}
                  prefix="+"
                />
              </Card>
            </div>
            <div className="w-1/4 m-2">
              <Card bordered={false}>
                <Statistic
                  title="Products"
                  value={data.products}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </div>
            <div className="w-1/4 m-2">
              <Card bordered={false}>
                <Statistic
                  title="New Clients"
                  value={data.newClients}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix="+"
                />
              </Card>
            </div>
            <div className="w-1/4 m-2">
              <Card bordered={false}>
                <Statistic
                  title="Categories"
                  value={data.categories}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix="+"
                />
              </Card>
            </div>
          </div>
        </div>
      </LayoutBaseAdmin>
    </>
  );
};

export default DashboardPage;
