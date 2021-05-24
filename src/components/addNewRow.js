import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form , Button, Input, Modal } from 'antd';
import { ContactsOutlined, DashboardOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons';

import { addNewRow } from '../redux/actions';

const AddNewRow = ({ isVisible , setIsVisible }) => {
    const dispatch = useDispatch();
    const [ clearForm , setClearForm ] = useState(false);
    const visibleFalse = () => setIsVisible(false);

    const addRowHandler = (data) => {
        dispatch(addNewRow(data));
        visibleFalse();
        setClearForm(v=>!v);
    }

    return (
        <div className="newyContainer">
            <Modal visible={isVisible} title="הוסף שורה" onCancel={visibleFalse} footer={[
                <Button form="newRowForm" key="submit" type="primary" htmlType="submit"> הוסף </Button>,
                <Button key="back" onClick={visibleFalse}> לחזרה </Button>,]}
            >

                <Form key={clearForm} dir="rtl" id="newRowForm" onFinish={addRowHandler} name="basic">
                    <Form.Item name="IDNumber" rules={[{ required: true, message: '!בבקשה הכנס מספר ת.ז', 
                                min: 9 , max: 9 , message: '!תעודת הזהות חייבת להכיל 9 ספרות בדיוק', },]}>
                        <Input prefix={<ContactsOutlined className="form-icon" />} type="number" placeholder="מספר ת.ז"/>
                    </Form.Item>
                    <Form.Item name="employeeName" rules={[{ required: true, message: '!בבקשה הכנס שם עובד',},]}>
                        <Input prefix={<UserOutlined className="form-icon" />} placeholder="שם עובד" />
                    </Form.Item>
                    <Form.Item name="exceptionalHours" rules={[{ required: true, message: '!בבקשה הכנס מספר שעות חריגות',},]}>
                        <Input prefix={<DashboardOutlined className="form-icon"/>} data-address={true} type="number" placeholder="שעות חריגות"/>
                    </Form.Item>
                    <Form.Item name="manualHours" rules={[{ required: true, message: '!בבקשה הכנס שעות ידניות',},]}>
                        <Input prefix={<DashboardOutlined className="form-icon"/>} data-address={true} type="number" placeholder="שעות ידניות"/>
                    </Form.Item>
                    <Form.Item name="hours" rules={[{ required: true, message: '!בבקשה הכנס שעות',},]}>
                        <Input prefix={<DashboardOutlined className="form-icon"/>} data-address={true} type="number" placeholder="שעות"/>
                    </Form.Item>
                    <Form.Item name="totalHours" rules={[{ required: true, message: '!בבקשה הכנס סה"כ שעות',},]}>
                        <Input prefix={<FieldTimeOutlined className="form-icon"/>} data-address={true} type="number" placeholder="סך הכל שעות"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddNewRow;