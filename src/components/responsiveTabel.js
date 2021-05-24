import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import { useSelector } from "react-redux";
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;
    if (!width) return <th {...restProps} />;
    return (
        <Resizable width={width} height={0} onResize={onResize}  draggableOpts={{ enableUserSelectHack: false }}
                handle={<span className="react-resizable-handle" onClick={(e) => {e.stopPropagation();}}/>}>
                <th {...restProps} />
        </Resizable>
    );
};

const columnArray = [
    { title: <span className="dragHandler">סה"כ שעות</span>,dataIndex: "totalHours" , width : 100 },
    { title: <span className="dragHandler">שעות</span>,dataIndex: "hours", width: 100 },
    { title: <span className="dragHandler">שעות ידניות</span>,dataIndex: "manualHours", width: 100 },
    { title: <span className="dragHandler">שעות חריגות</span>,dataIndex: "exceptionalHours", width: 100 },
    { title: <span className="dragHandler">שם עובד</span>,dataIndex: "employeeName", width: 100 },
    { title: <span className="dragHandler">מספר ת.ז</span>, dataIndex: "IDNumber", render: (text) => <span>{text}</span>, width: 100 },
    { title: 'מיון', dataIndex: 'מיון', width: 30, className: 'drag-visible', render: () => <DragHandle />, width: 5 },
];

const ResponsiveTable = () => {
    const data = useSelector(state => state.userDetailsReducer.userDetailsArray);
    const dataWithIndexForKey = data.map((row , index)=>({...row, index}));
    const [ columns , setColumns ] = useState({columns : columnArray});
    const [ dataToShow , setDataToShow ] = useState(dataWithIndexForKey);

    useEffect(()=> setDataToShow(dataWithIndexForKey),[data]);
  
    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const myColumns = [...columns.columns];
            const item = myColumns.splice(fromIndex, 1)[0];
            myColumns.splice(toIndex, 0, item);
            setColumns({columns:myColumns})
        },
        nodeSelector: "th",
        handleSelector: ".dragHandler",
        ignoreSelector: "react-resizable-handle"
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const newData = arrayMove([].concat(dataToShow), oldIndex, newIndex).filter(el => !!el);
          setDataToShow(newData);
        }
    };

    const SortableContainer = sortableContainer(props => <tbody {...props} />);
    const SortableItem = sortableElement(props => <tr {...props} />);
    const DraggableContainer = props => (<SortableContainer useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} /> );
    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        const index = dataToShow.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
      };
    const components = { header: { cell: ResizableTitle } , body: { wrapper: DraggableContainer, row: DraggableBodyRow, },};
  
    const handleResize = (index) => (e, { size }) => {
        setColumns(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = { ...nextColumns[index], width: size.width };
            return { columns: nextColumns };
        });
    };

    const newColumns = columns.columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({width: column.width, onResize: handleResize(index)})
    }));

    return (
        <ReactDragListView.DragColumn {...dragProps}>
            <Table bordered components={components} columns={newColumns} dataSource={dataToShow} rowKey="index" pagination={{ pageSize: 5 }}/>
        </ReactDragListView.DragColumn>
    );
}

export default ResponsiveTable;