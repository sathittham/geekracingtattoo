import React, { Component } from "react";
import { Table, Button, Tooltip, Modal,Popconfirm } from "antd";
import { siteConfig } from "../../settings";
import db from "./db";
import PrintPdf from './printPdf';

var moment = require("moment");
require("moment/locale/th.js");

const DEBUG = siteConfig.DEBUG;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelInfo: [],
      //Modal
      modalPrintVisible: false,
      loading: false,
      //Table
      selectedRowKeys: [], // Check here to configure the default column
      pagination: {},
      pageLimit: 30,
      // Selected
      selectedRowIndex: "",
      selectedRowRecord: "",
      selectedParcelNo: "",
      printOutObject: [],
      parcelItem:[],
      //Filter, sorted
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  /****** ComponentWillMount FUNCTIONS ******/
  componentWillMount() {
    DEBUG && console.log("componentWillMount");

    //Get Data from DB
    //this.getDataFromDB();
  }

  /****** componentDidMount FUNCTIONS ******/
  componentDidMount() {
    //Get Data from DB
    this.getDataFromDB();
  }

  /****** componentWillReceiveProps FUNCTIONS ******/
  componentWillReceiveProps(nextProps) {
    DEBUG && console.log('thisProps_parcelInfo', this.props.parcelInfo);
    DEBUG && console.log('nextProps_parcelInfo', nextProps.parcelInfo);
    if(nextProps.parcelInfo !== this.props.parcelInfo){
      this.setState({parcelInfo:nextProps.parcelInfo});
    }
  }

  /****** GET LOCAL DATABASE INFO FUNCTIONS ******/
  getDataFromDB = () => {
    db.table("parcelInfo")
      .toArray()
      .then(parcelInfo => {
        this.setState({ parcelInfo });
      });
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    DEBUG && console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys});
  };

  // handleDeleteParcel = id => {
  //   db.table('parcelInfo')
  //   .delete(id)
  //   .then(() => {
  //     const newList = this.state.parcelInfo.filter((parcel) => parcel.id !== id);
  //     this.setState({parcelInfo:newList});
  //   })
  // };


  /***** HANDLE PRINT CONFIRM MODAL *****/
  setModalPrintVisible(modalPrintVisible) {
    this.printOutRecords(this.state.selectedRowKeys);
    this.setState({ modalPrintVisible });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        modalPrintVisible: false,
        loading: false,
      });
    }, 2000);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalPrintVisible: false,
      printOutObject: []
    });
  };


  /***** HPRINT OUT RECORDS *****/
  printOutRecords = selectedRowKeys => {
    const { printOutObject } = this.state;
    DEBUG && console.log("PrintOutRecords");
    DEBUG && console.log("PrintOutRecords_selectRowKeys", selectedRowKeys);

    selectedRowKeys.forEach(selectedRowKey => {
      printOutObject.push(this.state.parcelInfo[selectedRowKey]);
      DEBUG && console.log(
        "PrintOutRecords[" +
          selectedRowKey +
          "]" +
          JSON.stringify(this.state.parcelInfo[selectedRowKey])
      );
    });
    DEBUG && console.log("PrintOutRecords_printOutObject", printOutObject);
    this.setState({ printOutObject });
    return printOutObject;
  };


  render() {
    const {
      loading,
      modalPrintVisible,
      selectedRowKeys
    } = this.state;


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
      {
        title: "หมายเลขพัสดุ",
        dataIndex: "parcelNo",
      },
      {
        title: "บ้านเลขที่",
        dataIndex: "recipientUnitNo"
      },
      {
        title: "ชื่อผู้รับ",
        dataIndex: "recipientName"
      },
      {
        title: "ประเภทพัสดุ",
        dataIndex: "parcelType",
      },
      {
        title: "บริษัทขนส่ง",
        dataIndex: "deliveryName",
      },
      {
        title: "เลขติดตามพัสดุ",
        dataIndex: "trackingNo",
      },
      {
        title: "วันที่เข้าระบบ",
        dataIndex: "importDate",
        render: importDate => (
          <span>
            {moment(importDate)
              .add(543, "years")
              .format("lll")}
          </span>
        )
      },
      {
        title: "คำสั่ง",
        key: "action",
        render: (text, record, index) => (
          <span>
           { this.state.parcelInfo.length >= 1 ? 
            <div>
              <Popconfirm title="ต้องการลบรายการนี้ใช่หรือไม่?" onConfirm={() => this.props.handleDeleteParcel(record.id,true)}>
                <a href="javascript:;">ลบ</a>
              </Popconfirm>
            </div>: null}
          </span>
        )
      }
    ];

    return (

      <div>
        <div
          style={{
            fontSize: 24,
            fontFamily: "Kanit",
            paddingBottom: 10
          }}
        >
          รายการพัสดุ
        </div>
        <div>
          รายการพัสดุ ประจำวันที่ {moment().add(543, "years").format('ll')} ทั้งหมด {this.props.parcelInfo.length} รายการ 
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ alignSelf: "auto", paddingBottom:10 }}>
          {/* <Button
              type="primary"
              //onClick={this.start}
              onClick={() => this.props.handleClearTable()}
              loading={loading}
              icon="delete"
            >
              ลบข้อมูลทั้งหมด
            </Button> */}
            <Button
              type="primary"
              //onClick={this.start}
              onClick={() => this.setModalPrintVisible(true)}
              disabled={!hasSelected}
              loading={loading}
              icon="file-pdf"
            >
              สร้าง PDF
            </Button>
            <Tooltip title="พิมพ์ได้สูงสุดครั้งละ 30 รายการ">
              <span style={{ marginLeft: 8 }}>
                {hasSelected
                  ? `รายการที่เลือก ${selectedRowKeys.length} รายการ`
                  : ""}
              </span>
            </Tooltip>
          </div>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.parcelInfo}
          pagination={{defaultPageSize: 30}}
          //onChange={this.handleTableChange}
          size="small"
        />

        {/* MODAL PRINT CONFIRM */}
        <Modal
          //title="PRINT CONFIRM "
          visible={modalPrintVisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={null}
          width={550}
        >
       
          <PrintPdf printData={this.state.printOutObject} /> 
        </Modal>
      </div>
    );
  }
}
