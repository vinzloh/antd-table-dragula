import * as React from "react";
import { Table } from "antd";
import { DragOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import "./DraggableTable.css";

const columns = [
  {
    title: "",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profession",
    dataIndex: "profession",
    key: "profession",
  },
];

const getIndexInParent = (el) => Array.from(el.parentNode.children).indexOf(el);

export default function DraggableTable() {
  const [data, setData] = React.useState([
    {
      title: <DragOutlined className="draggable" type="swap" />,
      profession: "Front end developer",
      key: "1",
      name: "John",
    },
    {
      title: <DragOutlined className="draggable" type="swap" />,
      profession: "Full stack developer",
      key: "2",
      name: "Mary Kay",
    },
    {
      title: <DragOutlined className="draggable" type="swap" />,
      profession: "CTO",
      key: "3",
      name: "Justin T.",
    },
    {
      title: <DragOutlined className="draggable" type="swap" />,
      profession: "Support Ninja",
      key: "4",
      name: "David B.",
    },
    {
      title: <DragOutlined className="draggable" type="swap" />,
      profession: "Investor",
      key: "5",
      name: "Lorde",
    },
  ]);

  const handleReorder = (dragIndex, draggedIndex) => {
    setData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
  };

  React.useEffect(() => {
    let start;
    let end;
    const container = document.querySelector(".ant-table-tbody");
    const drake = dragula([container], {
      moves: (el) => {
        start = getIndexInParent(el);
        return true;
      },
    });

    drake.on("drop", (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
  }, []);

  return <Table columns={columns} pagination={false} dataSource={data} />;
}
