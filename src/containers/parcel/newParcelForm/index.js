import React, { Component } from "react";
import { Tooltip, Input, Select,Button, Form, AutoComplete, Row, Col } from "antd";
import { siteConfig } from "../../../settings";
import UbNewParcelWrapper from "./newParcelForm.style";

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
    this.state = {
      //Parcel
      reqLoading: false,
      newParcelObj:{},
      parceAliasName:'',
      parcelNo:'',
      recipientUnitNo:'',
      recipientName:'',
      deliveryName:'',
      parcelType:'',
      trackingNo:'',
      importDescription:'',
      //Get Recipient
      recipientUnitNoSearch:'',
      recipeintItems:'',
      recipeintList:'',
      recipientUserID:'',
      recipientName:'',
    };
  }

    /****** ComponentDidMount FUNCTIONS ******/
  componentDidMount(){
    DEBUG && console.log("componentDidMount");
    //this.requestParcelNo();

    //To disabled submit button at the beginning
    this.props.form.validateFields();
  }

  /****** ComponentWillMount FUNCTIONS ******/
  componentWillMount(){
    DEBUG && console.log("componentWillMount");

    // this.state.userToken = localStorage.getItem('access_token');
    // DEBUG && console.log('UserToken: ' + this.state.userToken);

    // this.state.communityID = localStorage.getItem('communityID');
    // DEBUG && console.log('communityID: ' + this.state.communityID);

    // this.state.userID = localStorage.getItem('userID');
    // DEBUG && console.log('userID: ' + this.state.userID);

    //this.requestParcelNo();
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
    const recipientUnitNoError = isFieldTouched('recipientUnitNo') && getFieldError('recipientUnitNo');
    const recipientNameError = isFieldTouched('recipientName') && getFieldError('recipientName');
    const deliveryNameError = isFieldTouched('deliveryName') && getFieldError('deliveryName');
    const parcelTypeError = isFieldTouched('parcelType') && getFieldError('parcelType');
    const trackingNoError = isFieldTouched('trackingNo') && getFieldError('trackingNo');

    const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

    return (
      <div>

        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {OPTIONS.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      {/* <UbNewParcelWrapper> */}
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

       

        {/* (xs <768px, sm>=750px, md >=992px, lg >=1200px) */}
        {/* <div className="ubNewParcelFormWrapper">  */}
          <Form layout="inline" onSubmit={this.onSubmitHandler}>
            {/* <div> */}
              <Row gutter={8}>
              {/* <div className="ubFormInputWrapper"> */}
                <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                  {/* <div className="ubParcelRoomWrapper">
                    <div className="ubParcelNoLabel"> */}
                      <Form.Item
                        validateStatus={recipientUnitNoError ? "error" : ""}
                        help={recipientUnitNoError || ""}
                      >
                        {getFieldDecorator("recipientUnitNo", {
                          // validateTrigger: onChange=this.UnitNoAutocomplete,
                          rules: [
                            {
                              required: true,
                              message: "ระบุบ้านเลขที่"
                            }
                          ]
                        })(
                          <Input
                            style={{ minWidth:130 }}
                            placeholder="บ้านเลขที่"
                            //onChange = {this.recipientUnitNoHandler}
                          />
                        )}
                      </Form.Item>
                    {/* </div>
                  </div> */}
                </Col>
                {/* </div> */}

                
                <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                  {/* <div className="ubParcelInputWrapper">
                    <div className="ubParcelInputInput"> */}
                      <Form.Item
                        validateStatus={recipientNameError ? "error" : ""}
                        help={recipientNameError || ""}
                      >
                        {getFieldDecorator("recipientName", {
                          //initialValue: this.state.recipientName,
                          rules: [
                            {
                              required: true,
                              message: "ระบุชื่อผู้รับ"
                            }
                          ]
                        })(
                    
                          <Input
                            style={{ minWidth:130 }}
                            placeholder = "ชื่อผู้รับ"
                            //onChange = {this.recipientNameHandler}
                          />
                        )}
                      </Form.Item>
                    {/* </div>
                  </div> */}
                </Col>

                <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                  {/* <div className="ubParcelInputWrapper">
                    <div className="ubParcelInputInput"> */}
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
                            //style={{ width: '100%' }}
                            style={{ minWidth:130 }}
                            // value={this.state.deliveryName}
                            // onChange = {this.deliveryNameHandler}
                          >
                            <Option value="THAILAND_POST">
                              {" "}
                              ไปรษณีไทย{" "}
                            </Option>
                            <Option value="KERRY">
                              {" "}
                              Kerry Express{" "}
                            </Option>
                            <Option value="LALAMOVE">
                              {" "}
                              LALAMOVE{" "}
                            </Option>
                            <Option value="NINJA"> Ninja </Option>
                            <Option value="ALPHA"> ALPHA </Option>
                            <Option value="LINEMAN"> LINEMAN </Option>
                            <Option value="DHL"> DHL </Option>
                            <Option value="UPS"> UPS </Option>
                            <Option value="SCG_EXPRESS">
                              {" "}
                              SCG Express{" "}
                            </Option>
                            <Option value="OTHER"> อื่นๆ </Option>
                          </Select>
                        )}
                      </Form.Item>
                      {/* <Form.Item label="Select" hasFeedback>
                        {getFieldDecorator('select', {
                          rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                          <Select placeholder="Please select a country">
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                          </Select>,
                        )}
                      </Form.Item> */}
                    {/* </div>
                  </div> */}
                </Col>

                <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                  {/* <div className="ubParcelInputWrapper">
                    <div className="ubParcelInputInput"> */}
                      <Form.Item
                        validateStatus={parcelTypeError ? "error" : ""}
                        help={parcelTypeError || ""}
                      >
                        {getFieldDecorator("parcelType", {
                          //initialValue:['ENVELOPE','DOCUMENT_ENVELOPE','SMALL_PACK_ENVELOPE'],
                          validateTrigger: ["onChange", "onBlur"],
                          rules: [
                            {
                              required: true,
                              whitespace: true,
                              message: "ระบุประเภทพัสดุ"
                            }
                          ]
                        })(
                          // <Select Option= {parcelTypes}/>
                          <Select
                            placeholder="ประเภทพัสดุ"
                            style={{minWidth:130}}
                            //style={{ width: '100%' }}
                            // value={this.state.parcelType}
                            // onChange = {this.parcelTypeHandler}
                          >
                            <Option value="ENVELOPE">
                              {" "}
                              ซองจดหมาย{" "}
                            </Option>
                            <Option value="DOCUMENT_ENVELOPE">
                              {" "}
                              ซองเอกสาร{" "}
                            </Option>
                            <Option value="SMALL_PACK_ENVELOPE">
                              {" "}
                              ห่อเล็ก{" "}
                            </Option>
                            <Option value="LARGE_PACK_ENVELOPE">
                              {" "}
                              ห่อใหญ่{" "}
                            </Option>
                            <Option value="SMALL_PARCEL_BOX">
                              {" "}
                              กล่องเล็ก{" "}
                            </Option>
                            <Option value="LARGE_PARCEL_BOX">
                              {" "}
                              กล่องใหญ่{" "}
                            </Option>
                            <Option value="EXTRA_LARGE_PARCEL_BOX">
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
                  {/* <div className="ubParcelInputWrapper">
                    <div className="ubParcelInputInput"> */}
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
                            style={{ minWidth:130 }}
                            placeholder="เลขติดตามพัสดุ"
                            // value={textTracking}
                            // value={this.state.trackingNo}
                            // onChange = {this.trackingNoHandler}
                          />
                        )}
                      </Form.Item>
                    {/* </div>
                  </div> */}
                </Col>

                <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                  {/* <div className="ubParcelIconWrapper">
                    <div className="ubParcelIconInput"> */}
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
                    {/* </div>
                  </div> */}
                </Col>
              </Row>
            {/* </div> */}
          </Form>
        {/* </div> */}
      {/* </UbNewParcelWrapper> */}
      </div>
    );
  }
}

const WrappedNewParcelForm = Form.create({ name: "NewParcelForm" })(
  NewParcelForm
);
export default WrappedNewParcelForm;
