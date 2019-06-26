import React, { Component } from "react";
import { Input, Select, Button, Form, Row, Col } from "antd";
import { siteConfig } from "../../settings";

var moment = require("moment");
require("moment/locale/th.js");

const { Option } = Select;
const DEBUG = siteConfig.DEBUG;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewParcelForm extends Component {
  constructor(props) {
    super(props);
    this.addParcel = this.addParcel.bind(this);
    this.state = {

      parcelInfo: [],
      newParcelObj:{},
      //Parcel Info
      parcelNo: "",
      recipientUnitNo: "",
      recipientName: "",
      deliveryName: "",
      parcelType: "",
      trackingNo: ""
    };
  }

  /****** ComponentDidMount FUNCTIONS ******/
  componentDidMount() {
    DEBUG && console.log("componentDidMount");
    //To disabled submit button at the beginning
    this.props.form.validateFields();

  }

  addParcel(){
    this.props.handleAddParcel(this.state.newParcelObj)
  }

  
  /****** HANDLER FUNCTIONS ******/
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){

        const parcelInfo = {
          "parcelNo": "1906-1", //this.state.parcelNo,
          "importDate": moment().format(),
        };
        //const newParcelNo = {parcelNo:this.state.parcelNo}
        //const newParcelObj = {...parcelInfo,...values};

        DEBUG && console.log('Received values of form: ', values);

        this.setState({
          newParcelObj: {...parcelInfo,...values}
        },()=> {
          DEBUG && console.log('parcelInfo: ', parcelInfo);
          DEBUG && console.log('NewParcelObj: ', this.state.newParcelObj);

          this.addParcel();
          //this.handleAddParcel(this.state.newParcelObj);
          //this.importParcel();
        })    
      }
    })
  }

  /****** RENDER FUNCTIONS ******/
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const recipientUnitNoError =
      isFieldTouched("recipientUnitNo") && getFieldError("recipientUnitNo");
    const recipientNameError =
      isFieldTouched("recipientName") && getFieldError("recipientName");
    const deliveryNameError =
      isFieldTouched("deliveryName") && getFieldError("deliveryName");
    const parcelTypeError =
      isFieldTouched("parcelType") && getFieldError("parcelType");
    const trackingNoError =
      isFieldTouched("trackingNo") && getFieldError("trackingNo");

    return (
      <div>
        <div
          style={{
            fontSize: 24,
            fontFamily: "Kanit",
            paddingBottom: 10
          }}
        >
          เพิ่มพัสดุใหม่
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#929292",
            paddingBottom: 10
          }}
        >
          เพิ่มพัสดุเข้าระบบ เพื่อสร้างใบรับให้ลูกบ้าน (ประจำวันที่{" "}
          {moment()
            .add(543, "years")
            .format("ll")}
          )
        </div>

        <Form layout="inline" onSubmit={this.onSubmitHandler}>
          <Row gutter={8}>
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                validateStatus={recipientUnitNoError ? "error" : ""}
                help={recipientUnitNoError || ""}
              >
                {getFieldDecorator("recipientUnitNo", {
                  rules: [
                    {
                      required: true,
                      message: "ระบุบ้านเลขที่"
                    }
                  ]
                })(
                  <Input
                    style={{ minWidth: 130 }}
                    placeholder="บ้านเลขที่"
                  />
                )}
              </Form.Item>
            </Col>


            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                validateStatus={recipientNameError ? "error" : ""}
                help={recipientNameError || ""}
              >
                {getFieldDecorator("recipientName", {
                  rules: [
                    {
                      required: true,
                      message: "ระบุชื่อผู้รับ"
                    }
                  ]
                })(
                  <Input
                    style={{ minWidth: 130 }}
                    placeholder="ชื่อผู้รับ"
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                validateStatus={deliveryNameError ? "error" : ""}
                help={deliveryNameError || ""}
              >
                {getFieldDecorator("deliveryName", {
                  validateTrigger: ["onChange", "onBlur"],
                  rules: [
                    {
                      required: true,
                      message: "ระบุบริการขนส่ง"
                    }
                  ]
                })(
                  <Select
                    placeholder="บริการขนส่ง"
                    style={{ minWidth: 130 }}
                    // value={this.state.deliveryName}
                    // onChange = {this.deliveryNameHandler}
                  >
                    <Option value="ไปรษณีไทย"> ไปรษณีไทย </Option>
                    <Option value="KERRY"> Kerry </Option>
                    <Option value="LALAMOVE"> LALAMOVE </Option>
                    <Option value="Ninja"> Ninja </Option>
                    <Option value="ALPHA"> ALPHA </Option>
                    <Option value="LINEMAN"> LINEMAN </Option>
                    <Option value="DHL"> DHL </Option>
                    <Option value="UPS"> UPS </Option>
                    <Option value="SCG EXPRESS"> SCG Express </Option>
                    <Option value="อื่นๆ"> อื่นๆ </Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                validateStatus={parcelTypeError ? "error" : ""}
                help={parcelTypeError || ""}
              >
                {getFieldDecorator("parcelType", {
                  validateTrigger: ["onChange", "onBlur"],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "ระบุประเภทพัสดุ"
                    }
                  ]
                })(
                  <Select
                    placeholder="ประเภทพัสดุ"
                    style={{ minWidth: 130 }}
                  >
                    <Option value="ซองจดหมาย"> ซองจดหมาย </Option>
                    <Option value="ซองเอกสาร"> ซองเอกสาร </Option>
                    <Option value="ห่อเล็ก"> ห่อเล็ก </Option>
                    <Option value="ห่อใหญ่"> ห่อใหญ่ </Option>
                    <Option value="กล่องเล็ก"> กล่องเล็ก </Option>
                    <Option value="กล่องใหญ่"> กล่องใหญ่ </Option>
                    <Option value="กล่องใหญ่พิเศษ">
                      {" "}
                      กล่องใหญ่พิเศษ{" "}
                    </Option>
                    <Option value="OTHER"> อื่นๆ </Option>
                  </Select>
                )}
              </Form.Item>
              {/* </div>
                  </div> */}
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item
                validateStatus={trackingNoError ? "error" : ""}
                help={trackingNoError || ""}
              >
                {getFieldDecorator("trackingNo", {
                  rules: [
                    {
                      required: false,
                      message: "ระบุเลขติดตามพัสดุ"
                    }
                  ]
                })(
                  <Input
                    style={{ minWidth: 130 }}
                    placeholder="เลขติดตามพัสดุ"
                    // value={textTracking}
                    // value={this.state.trackingNo}
                    // onChange = {this.trackingNoHandler}
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  icon="save"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  บันทึก
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedNewParcelForm = Form.create({ name: "NewParcelForm" })(
  NewParcelForm
);
export default WrappedNewParcelForm;
