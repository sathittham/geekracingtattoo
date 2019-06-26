import React, { Component } from "react";
import { Table, Button, Tooltip, Modal,Popconfirm } from "antd";
import { siteConfig } from "../../settings";
import db from "./db";

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
      // Selected
      selectedRowIndex: "",
      selectedRowRecord: "",
      selectedParcelNo: "",
      printOutObject: []
    };
  }

    /****** ComponentWillMount FUNCTIONS ******/
    componentWillMount() {
      DEBUG && console.log("componentWillMount");
  
      //Get Data from DB
      //this.getDataFromDB();
    }

    componentDidMount() {
      //Get Data from DB
      this.getDataFromDB();
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
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // handleDeleteParcel = id => {
  //   db.table('parcelInfo')
  //   .delete(id)
  //   .then(() => {
  //     const newList = this.state.parcelInfo.filter((parcel) => parcel.id !== id);
  //     this.setState({parcelInfo:newList});
  //   })
  // };

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
        dataIndex: "parcelNo"
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
              <Popconfirm title="ต้องการลบรายการนี้ใช่หรือไม่?" onConfirm={() => this.props.handleDeleteParcel(record.id)}>
                <a href="javascript:;">ลบ</a>
              </Popconfirm>
            </div>: null}
          </span>
        )
      }
    ];

    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        parcelNo: i,
        recipientUnitNo: i,
        recipientName: `Edward King ${i}`,
        importDate: `${moment()}`
      });
    }

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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ alignSelf: "auto" }}>
            <Button
              type="primary"
              //onClick={this.start}
              onClick={() => this.setModalPrintVisible(true)}
              disabled={!hasSelected}
              loading={loading}
              icon="printer"
            >
              พิมพ์
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
          pagination={this.state.pagination}
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
          {/* {DEBUG && console.log('[MODAL] Modal Start!')} */}
          {/* <PrintPdf printData={this.state.printOutObject} /> */}
        </Modal>
      </div>
    );
  }
}
