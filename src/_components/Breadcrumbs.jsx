import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function Breadcrumbs(props) {
  return (
    <div className="shadow-md bg-white rounded-lg p-4 mb-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        {props.items.map((item, index) => (
          <Breadcrumb.Item href={item.path} key={index}>
            {/* <UserOutlined /> */}
            {item.icon ? <item.icon /> : ""}
            <span>{item.name}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;
