import React, { Component } from "react";
import { Input, Select, Button, Form, Row, Col } from "antd";
import { siteConfig } from "../../settings";
import db from "./db";

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
      newParcelObj: {},
      //Parcel Info
      parcelNo: "",
      recipientUnitNo: "",
      recipientName: "",
      deliveryName: "",
      parcelType: "",
      trackingNo: "",
      lastParcelNo:"",
      lastMMDD:"",
      lastNo:"",
      currentYYMMDD: moment().format("YYMMDD"), //.add(1,'d')
    };
  }

  /****** ComponentDidMount FUNCTIONS ******/
  async componentDidMount() {
    DEBUG && console.log("componentDidMount");
    //To disabled submit button at the beginning
    this.props.form.validateFields();

    DEBUG && console.log('currentYYMMDD:', this.state.currentYYMMDD);

    var lastParcel = await this.getLastParcelID();
    DEBUG && console.log('lastParcel: ', JSON.stringify(lastParcel[0]));

    if(lastParcel.length > 0){
      DEBUG && console.log("lastParcel importedDate: " + JSON.stringify(lastParcel[0].importDate));
      DEBUG && console.log('TODAY: ', moment(lastParcel[0].importDate).format('YYMMDD'));
      if(moment(lastParcel[0].importDate).format('YYMMDD') !== this.state.currentYYMMDD){
        DEBUG && console.log('CLEAR DATA TABLE!');
        this.props.handleClearTable();
      } else {
        DEBUG && console.log('SAME DAY');
      }
    } else {
      DEBUG && console.log('NEW ITEM');
    }
  }

   /****** ComponentWillMount FUNCTIONS ******/
   componentWillMount() {
    DEBUG && console.log("componentWillMount");

    //get parcel count
    this.getParcelCount();




   }

  async addParcel() {
    this.props.handleAddParcel(this.state.newParcelObj);
  }

  getParcelCount = () => {
    // db.open()
    // .catch(function (err) {
    //   console.error('Failed to open db: ', (err.stack || err));
    // });
    // console.log("Version", db.verno);

    var x = db.parcelInfo;
    return x.count().then(function(c) {
      DEBUG && console.log("PARCEL COUNT: ", c);
    });
  };

  // getLastParcel = () => {
  //   DEBUG && console.log("getLastParcel");
  //   db.parcelInfo
  //     .orderBy("id")
  //     .reverse()
  //     .limit(1)
  //     .toArray()
  //     .then(results => {
  //       DEBUG && console.log("GET LAST PARCEL: ", JSON.stringify(results));
  //       if (results.length !== 0) {
  //         this.setState(
  //           {
  //             lastID: results[0].id
  //           },
  //           () => {
  //             DEBUG && console.log("Last Parcel ID: ", results[0].id);
  //           }
  //         );
  //       } else
  //         this.setState(
  //           {
  //             lastID: 0
  //           },
  //           () => {
  //             DEBUG && console.log("Last Parcel ID: ", 0);
  //           }
  //         );
  //     });
  // };

  getID() {
    return new Promise((resolve, reject) => {
      try {
        db.parcelInfo
          .orderBy("id")
          .reverse()
          .limit(1)
          .toArray()
          .then(results => {
            resolve(results[0].id);
          });
      } catch (err) {
        reject(DEBUG && console.log("Error", err));
      }
    });
  }

  getLastParcelNo() {
    return new Promise((resolve, reject) => {
      try {
        db.parcelInfo
          .orderBy("id")
          .reverse()
          .limit(1)
          .toArray()
          .then(results => {
            resolve(results);  
            DEBUG && console.log("results = " + results);
            DEBUG && console.log("results = " + JSON.stringify(results));
          });
      } catch (err) {
        reject(DEBUG && console.log("Error", err));
      }
    });
  }

  async getLastParcelID() {
    DEBUG && console.log("getLastParcelID");

    let lastParcelNo = await this.getLastParcelNo();
    //DEBUG && console.log("lastParcelNo = " + JSON.stringify(lastParcelNo));
 
    if(lastParcelNo.length > 0){
      DEBUG && console.log("lastParcelNo = " + JSON.stringify(lastParcelNo));
      let splitLastParcelNo = lastParcelNo[0].parcelNo.split("-");
      this.setState(
        {
          lastParcelNo: lastParcelNo,
          lastMMDD: splitLastParcelNo[0],
          lastNo: parseInt(splitLastParcelNo[1],10), //converts a string into an integer
        },
        () => {
          DEBUG && console.log("lastParcelNo_State: ", this.state.lastParcelNo);
          DEBUG && console.log("lastMMDD_State: ", this.state.lastMMDD);
          DEBUG && console.log("lastNo_State: ", this.state.lastNo);
        }
      );
    } else {
      //First Parcel of the day
      DEBUG && console.log("FIRST PARCEL!" );
      this.setState(
        {
          lastMMDD: 0,
          lastNo: 0,
        },
        () => {
          DEBUG && console.log("lastMMDD_State: ", this.state.lastMMDD);
          DEBUG && console.log("lastNo_State: ", this.state.lastNo);
        }
      );
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const parcelInfo = {
          parcelNo: `${moment().format("YYMMDD")}-${this.state.lastNo + 1}`, //this.state.parcelNo,
          //parcelNo: this.state.lastParcelNo + 1,
          importDate: moment().format(),
          deleteFlag: false
        };
        //const newParcelNo = {parcelNo:this.state.parcelNo}
        //const newParcelObj = {...parcelInfo,...values};

        DEBUG && console.log("Received values of form: ", values);

        this.setState(
          {
            newParcelObj: { ...parcelInfo, ...values }
          },
          () => {
            DEBUG && console.log("parcelInfo: ", parcelInfo);
            DEBUG && console.log("NewParcelObj: ", this.state.newParcelObj);

            //ADD TO DB
            this.addParcel();

            //Clear From
            this.props.form.resetFields();
          }
        );
      }
    });

    return lastParcelNo;
  }

  // async handleGetLastParcel () {
  //     var lastID = await this.getLastParcelID()
  //     console.log('handleGetLastParcel = ' + lastID)
  //     DEBUG && console.log('handleGetLastParcel:',lastID)
  // }

  /****** HANDLER FUNCTIONS ******/
  onSubmitHandler = e => {
    // let a = this.getID();
    // console.log(a)

    // let a = this.handleGetLastParcel();
    // console.log(a)

    //let a = this.getLastParcelID()
    //   const re =  new Promise((resolve, reject) => {
    //     try{
    //       db.parcelInfo
    //       .orderBy("id")
    //       .reverse()
    //       .limit(1)
    //       .toArray()
    //       .then(results => {
    //       resolve(results[0].id)
    //       console.log('re = ' + results[0].id)
    //       return results[0].id;
    //     })
    //   } catch(err){
    //     reject(console.log('Error',err))
    //   }
    // })
    console.log("onSubmitHandler");
    var lastParcelNoResult = this.getLastParcelID();
    console.log("lastParcelNoResult called: " + lastParcelNoResult);

    // var id = this.getLastParcelID().then(function(result) {
    //   console.log('result',result)
    // })

    //console.log(getid)
    //this.getID();

    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     const parcelInfo = {
    //       // parcelNo: `${moment().format("YYMM")}-${this.state.lastID + 1}`, //this.state.parcelNo,
    //       parcelNo: this.state.lastID+1,
    //       importDate: moment().format(),
    //       deleteFlag: false
    //     };
    //     //const newParcelNo = {parcelNo:this.state.parcelNo}
    //     //const newParcelObj = {...parcelInfo,...values};

    //     DEBUG && console.log("Received values of form: ", values);

    //     this.setState(
    //       {
    //         newParcelObj: { ...parcelInfo, ...values }
    //       },
    //       () => {
    //         DEBUG && console.log("parcelInfo: ", parcelInfo);
    //         DEBUG && console.log("NewParcelObj: ", this.state.newParcelObj);

    //         //this.addParcel();

    //         //Clear From
    //         this.props.form.resetFields();
    //       }
    //     );
    //   }
    // });
  };

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
                  <Input style={{ minWidth: 130 }} placeholder="บ้านเลขที่" />
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
                  <Input style={{ minWidth: 130 }} placeholder="ชื่อผู้รับ" />
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
                  <Select placeholder="ประเภทพัสดุ" style={{ minWidth: 130 }}>
                    <Option value="ซองจดหมาย"> ซองจดหมาย </Option>
                    <Option value="ซองเอกสาร"> ซองเอกสาร </Option>
                    <Option value="ห่อเล็ก"> ห่อเล็ก </Option>
                    <Option value="ห่อใหญ่"> ห่อใหญ่ </Option>
                    <Option value="กล่องเล็ก"> กล่องเล็ก </Option>
                    <Option value="กล่องใหญ่"> กล่องใหญ่ </Option>
                    <Option value="กล่องใหญ่พิเศษ"> กล่องใหญ่พิเศษ </Option>
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
