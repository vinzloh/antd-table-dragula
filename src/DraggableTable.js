import React, { PureComponent } from 'react';
import { Table,  } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import './DraggableTable.css';

class DraggableTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          title: <DragOutlined className="draggable" type="swap" />,
          profession: 'Front end developer',
          key: '1',
          name: 'John'
        },
        {
          title: <DragOutlined className="draggable" type="swap" />,
          profession: 'Full stack developer',
          key: '2',
          name: 'Mary Kay'
        },
        {
          title: <DragOutlined className="draggable" type="swap" />,
          profession: 'CTO',
          key: '3',
          name: 'Justin T.'
        },
        {
          title: <DragOutlined className="draggable" type="swap" />,
          profession: 'Support Ninja',
          key: '4',
          name: 'David B.'
        },
        {
          title: <DragOutlined className="draggable" type="swap" />,
          profession: 'Investor',
          key: '5',
          name: 'Lorde'
        }
      ]
    };
    this.columns = [
      {
        title: '',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Profession',
        dataIndex: 'profession',
        key: 'profession'
      }
    ];
  }
  handleReorder = (dragIndex, draggedIndex) => {
    const data = [...this.state.data];
    const item = data.splice(dragIndex, 1)[0];
    data.splice(draggedIndex, 0, item);
    this.setState({
      data
    });
  };
  componentDidMount() {
    const container = document.querySelector('.ant-table-tbody');
    const drake = dragula([container], {
      moves: (el, container, handle, sibling) => {
        this.start = this.getIndexInParent(el);
        return true;
      }
    });

    drake.on('drop', (el, target, source, sibling) => {
      this.end = this.getIndexInParent(el);
      this.handleReorder(this.start, this.end);
    });
  }
  getIndexInParent = el => {
    return Array.from(el.parentNode.children).indexOf(el);
  };

  render() {
    console.log('data:', this.state.data);
    return (
      <div>
        <Table
          columns={this.columns}
          pagination={false}
          dataSource={this.state.data}
        />
      </div>
    );
  }
}
export default DraggableTable;
