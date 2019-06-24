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
    const parcelNoError = isFieldTouched('parcelNo') && getFieldError('parcelNo');
    const recipientUnitNoError = isFieldTouched('recipientUnitNo') && getFieldError('recipientUnitNo');
    const recipientNameError = isFieldTouched('recipientName') && getFieldError('recipientName');
    const deliveryNameError = isFieldTouched('deliveryName') && getFieldError('deliveryName');
    const parcelTypeError = isFieldTouched('parcelType') && getFieldError('parcelType');
    const trackingNoError = isFieldTouched('trackingNo') && getFieldError('trackingNo');

    return (
      <UbNewParcelWrapper>
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
          เพิ่มพัสดุเข้าระบบ เพื่อรอจ่ายให้ลูกบ้าน (ประจำวันที่{" "}
          {moment()
            .add(543, "years")
            .format("ll")}
          )
        </div>

        {/* (xs <768px, sm>=750px, md >=992px, lg >=1200px) */}

        <Form layout="inline" onSubmit={this.onSubmitHandler}>
          {/* <div className="ubNewParcelFormWrapper"> */}
          <div>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={7} lg={6} xl={5}>
                <Tooltip title='กดปุ่ม "เพิ่มพัสดุ" เพื่อรับลำดับพัสดุ'>
                  <div className="ubParcelNoWrapper">
                    <div className="ubParcelNoLabel">
                      <Form.Item
                        validateStatus={parcelNoError ? "error" : ""}
                        help={parcelNoError || ""}
                      >
                        {getFieldDecorator("parcelNo", {
                          //validateTrigger:["onChange"],
                          //value: parcelNo,
                          //onChange:this.parcelNoHandler,
                          rules: [
                            {
                              required: true,
                              message: "ลำดับพัสดุ",
                              value: this.state.parcelNo
                            }
                          ]
                        })(
                          <Input
                            // value={this.state.parcelNo}
                            style={{ minWidth: 160, fontWeight: "bold" }}
                            placeholder="ลำดับพัสดุ"
                            disabled={true}
                            //addonAfter={requestparcelNoButton}
                          />
                        )}
                      </Form.Item>
                    </div>
                  </div>
                </Tooltip>
              </Col>

              <Col xs={24} sm={12} md={6} lg={5} xl={3}>
                <div className="ubParcelRoomWrapper">
                  <div className="ubParcelNoLabel">
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
                          style={{ minWidth: 80 }}
                          placeholder="บ้านเลขที่"
                          onChange={this.UnitNoAutocomplete}
                          onBlur={this.UnitNoAutoBlur}
                          //value={textRoomNo}
                          //value={this.state.recipientUnitNo}
                          //onChange = {this.recipientUnitNoHandler}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={6} lg={5} xl={4}>
                <div className="ubParcelInputWrapper">
                  <div className="ubParcelInputInput">
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
                        <AutoComplete
                          style={{ minWidth: 100 }}
                          //dataSource={recipeintList}
                          placeholder="ชื่อผู้รับ"
                          onSelect={this.selectRecipent}
                          onChange={this.changeRecipent}
                          //onFocus={this.getParcelRecipient}
                        />
                        // <Input
                        //   placeholder = "ชื่อผู้รับ"
                        //   //value={this.state.recipientName}
                        //   //onChange = {this.recipientNameHandler}
                        // />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={7} lg={5} xl={3}>
                <div className="ubParcelInputWrapper">
                  <div className="ubParcelInputInput">
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
                          style={{ minWidth: 100 }}
                          // style={{ minWidth:130 }}
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
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                <div className="ubParcelInputWrapper">
                  <div className="ubParcelInputInput">
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
                          //style={{width:"100%"}}
                          style={{ minWidth: 100 }}
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
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={6} lg={6} xl={3}>
                <div className="ubParcelInputWrapper">
                  <div className="ubParcelInputInput">
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
                          // style={{minWidth:150}}
                          placeholder="เลขติดตามพัสดุ"
                          // value={textTracking}
                          // value={this.state.trackingNo}
                          // onChange = {this.trackingNoHandler}
                        />
                      )}
                    </Form.Item>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} md={6} lg={2} xl={3}>
                <div className="ubParcelIconWrapper">
                  <div className="ubParcelIconInput">
                    <Form.Item>
                      <Button
                        type="primary"
                        block
                        icon="save"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                      >
                        บันทึก
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </UbNewParcelWrapper>
    );
  }
}

const WrappedNewParcelForm = Form.create({ name: "NewParcelForm" })(
  NewParcelForm
);
export default WrappedNewParcelForm;
