import React, { Component } from 'react';
import { Input, Select, Button, Form, TimePicker, Row, Col } from "antd";
import { siteConfig } from "../../settings";
import PreviewTattoo from './previewTattoo';

var moment = require("moment");
require("moment/locale/th.js");

const { Option } = Select;
const DEBUG = siteConfig.DEBUG


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class generatorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userTextMax: 15,
            data: '',
        }
    }

    /****** COMPONENT DID MOUNT FUNCTIONS ******/
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    /****** HANDLER FUNCTIONS ******/
    onSubmitHandler = e => {
        DEBUG && console.log("onSubmitHandler");
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            // if (!err) {
            //     console.log('Received values of form: ', values);
            // }
            if (err) {
                return;
            }

            const values = {
                ...fieldsValue,
                'userTime': fieldsValue['userTime'].format('HH:mm:ss')

            }
            DEBUG && console.log('Received values of form: ', values);

            this.setState({
                data: values
            })
        });
    }

    onChange(time, timeString) {
        DEBUG && console.log(time, timeString);
    }


    /****** RENDER FUNCTIONS ******/
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        const { userTextMax } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        const distance = [
            {
                label: '5km',
                value: '5.00'
            },
            {
                label: '10km',
                value: '10.00'
            },
            {
                label: 'Half Marathon (21.10km)',
                value: '21.10'
            },
            {
                label: 'Marathon (42.20km)',
                value: '42.20'
            },
        ]

        // Only show error after a field is touched.
        const userTextError = isFieldTouched("userText") && getFieldError("userText");
        const userDistanceError = isFieldTouched("userDistance") && getFieldError("userDistance");
        const userTimeError = isFieldTouched("userTime") && getFieldError("userTime");

        return (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{textAlign:"left", fontFamily:'Kanit', fontSize:18, paddingBottom:10}}> 
                            กรอกข้อมูล 
                        </div> 
                        <Form onSubmit={this.onSubmitHandler} {...formItemLayout}>
                            <Form.Item
                                label="ข้อความ"
                                validateStatus={userTextError ? "error" : ""}
                                help={userTextError || "(ไม่เกิน "+ userTextMax.toString() + " ตัวอักษร)"}
                            >
                                {getFieldDecorator("userText", {
                                    rules: [
                                        {
                                            //pattern: new RegExp(/^\d+(\/\d+)?$/),
                                            required: true,
                                            message: "ระบุข้อความไม่เกิน " + userTextMax.toString() + " ตัวอักษร",
                                            max: userTextMax
                                        }
                                    ]
                                })(
                                    <Input
                                        //style={{ minWidth: 130 }} 
                                        placeholder="ระบุข้อความ" />
                                )}
                            </Form.Item>

                            <Form.Item
                                label="ระยะทาง"
                                validateStatus={userDistanceError ? "error" : ""}
                                help={userDistanceError || ""}
                            >
                                {getFieldDecorator("userDistance", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "ระบุระยะ"
                                        }
                                    ]
                                })(
                                    <Select
                                        // style={{ minWidth: 130 }}
                                        placeholder="ระยะทาง"
                                    >
                                        {distance.map(item => (
                                            <Option value={item.value}>
                                                {item.label}
                                            </Option>
                                        ))
                                        }
                                    </Select>)}
                            </Form.Item>

                            <Form.Item
                                label="เวลา"
                                validateStatus={userTimeError ? "error" : ""}
                                help={userTimeError || ""}
                            >
                                {getFieldDecorator("userTime", {
                                    initialValue: moment('00:00:00', 'HH:mm:ss'),
                                    rules: [
                                        {
                                            required: true,
                                            message: "ระบุเวลา"
                                        }
                                    ]
                                })(
                                    <TimePicker allowClear={false} />
                                )}
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    xs: { span: 24, offset: 0 },
                                    sm: { span: 16, offset: 5 },
                                }}
                            >
                                <Button
                                    //block
                                    type="primary"
                                    icon="rocket"
                                    htmlType="submit"
                                    disabled={hasErrors(getFieldsError() || this.props.form.getFieldValue("userTime").format('HH:mm:ss') === '00:00:00')}
                                >
                                    สร้าง Pace Tattoo
                        </Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{textAlign:"left", fontFamily:'Kanit', fontSize:18, paddingBottom:10}}> 
                            ตัวอย่าง 
                        </div> 
                        <div style={{width:200}}>
                            <PreviewTattoo data={this.state.data} formData={this.props.form} />
                        </div>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedGeneratorForm = Form.create({ name: "generatorForm" })(
    generatorForm
);
export default WrappedGeneratorForm;
