import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Icon, Button } from "antd";
import { siteConfig } from "../../settings";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const DEBUG = siteConfig.DEBUG;

const moment = require("moment");
require("moment/locale/th.js");

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew BoldItalic.ttf"
  },
  Kanit: {
    normal: "Kanit-Regular.ttf",
    bold: "Kanit-SemiBold.ttf",
    italics: "Kanit-BlackItalic.ttf",
    bolditalics: "Kanit-BoldItalic.ttf"
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
};

export default class printPdf extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      selectedRowKeys: [],
      parcelItem: "",
      communityName: "Urbanice.app",
      pmcName: "The Solution for your Community",
      userFirstname: "Admin",
      userLastname: "Urbanice",
      userToken: "",
      communityID: "ecffc890-7ee6-4bc9-9303-bf783c21f192",
      parcelStartTime: "8:00",
      parcelEndTime: "19:00",
      printList: [],
      pdfPrintType: "open", //open, download
      warningText: "",
      //GET COMM PREF
      responseData: "",
      isLoading: false
    };
  }

  /********* COMPONENT DID MOUNT  *********/
  componentDidMount() {
    DEBUG && console.log("printList_props:", this.props.printData);
    DEBUG && console.log("printList_props(1):", this.props.printData[1]);
  }

  /********* COMPONENT WILL MOUNT  *********/
  componentWillMount() {
    DEBUG && console.log("componentWillMount");
  }

  // printPDFTest() {
  //   var docDefinition = {
  //     content: [{ text: "สวัสดีประเทศไทย react pdf demo", fontSize: 15 }],
  //     defaultStyle:{
  //       font:'THSarabunNew'
  //     }
  //   };
  //   pdfMake.createPdf(docDefinition).open();
  // }

  /***** PRINT PARCEL CARDS => GENERATE PDF PRINOUT *****/
  Print2PDF = () => {
    //const {printList}  = this.state;
    DEBUG &&
      console.log(
        "printList_length",
        JSON.stringify(this.props.printData.length)
      );

    var externalDataRetrievedFromServer2 = [];

    //LOOP PRINT
    var totalCards = this.props.printData.length;
    DEBUG && console.log("totalCards", totalCards);
    //Reverse Print order
    for (var i = totalCards; i > 0; i--) {
      if (i % 2 != 0) {
        externalDataRetrievedFromServer2.push({
          c1: this.parcelCard(i - 1),
          c2: null
        });
        DEBUG && console.log("i", i);
      } else if (i % 2 == 0) {
        externalDataRetrievedFromServer2.push({
          c1: this.parcelCard(i - 1),
          c2: this.parcelCard(i - 2)
        });
        i = i - 1;
        DEBUG && console.log("i", i);
      }
    }

    function buildTableBody(data, columns) {
      var body = [];

      data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
          dataRow.push(row[column]);
        });

        body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
        table: {
          headerRows: 0,
          body: buildTableBody(data, columns)
        },
        layout: {
          hLineWidth: function(i, node) {
            return i === 0 || i === node.table.body.length ? 0 : 1;
          },
          vLineWidth: function(i, node) {
            return i === 0 || i === node.table.widths.length ? 0 : 1;
          },
          hLineColor: function(i, node) {
            return "#D3D3D3";
          },
          vLineColor: function(i, node) {
            return "#D3D3D3";
          },
          hLineStyle: function(i, node) {
            if (i === 0 || i === node.table.body.length) {
              return null;
            }
            return { dash: { length: 4, space: 4 } };
          },
          vLineStyle: function(i, node) {
            if (i === 0 || i === node.table.widths.length) {
              return null;
            }
            return { dash: { length: 4, space: 4 } };
          }
        }
      };
    }

    var docDefinition = {
      // a string or { width: number, height: number }
      pageSize: "A4",
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: "portrait",
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [10, 10, 10, 10],

      content: [
        table(externalDataRetrievedFromServer2.reverse(), ["c1", "c2"])
      ],
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 11
      }
    };

    // GENERATE PDF FILE
    if (this.state.pdfPrintType === "open") {
      //pdfMake.createPdf(docDefinition).open({}, window);
      try {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        var win = window.open("", "_blank");
        pdfDocGenerator.open({}, win);
        //Set Print Flag Async
        //this.updatePrintFlagAsync()
        setTimeout(() => {
          DEBUG && console.log("RUN updatePrintFlag() after 3 seconds");
          //this.updatePrintFlag();
        }, 3000);
      } catch (err) {
        console.log("Error", err);
      }
    } else if (this.state.pdfPrintType === "download") {
      pdfMake
        .createPdf(docDefinition)
        .download(
          "urbanice_parcelcard_" + moment().format("YYYYMMDD_HHmmss") + ".pdf",
          //this.updatePrintFlag()
        );
    }
  };

  parcelCard = no => {
    //DEBUG && console.log('no:',no);
    const {communityName,
      communityID,
      pmcName,
      parcelStartTime,
      parcelEndTime
    } = this.state;
    return {
      table: {
        widths: [280],
        body: [
          [
            {
              border: [true, true, true, false],
              table: {
                widths: [60, "*"],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      fillColor: "#ffffff",
                      text: [
                        {
                          text: communityName,
                          font: "Kanit",
                          fontSize: 9,
                          color: "#929292",
                          alignment: "left"
                        }
                      ]
                    },
                    {
                      border: [false, false, false, false],
                      fillColor: "#ffffff",
                      text: [
                        {
                          text: pmcName,
                          font: "Kanit",
                          fontSize: 9,
                          color: "#929292",
                          alignment: "right"
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          ],
          [
            {
              border: [true, false, true, false],
              fillColor: "#D5D5D5",
              text: [
                {
                  text: "ใบแจ้งรับพัสดุ / Parcel Card",
                  font: "Kanit",
                  fontSize: 13,
                  alignment: "center"
                }
              ]
            }
          ],
          [
            {
              border: [true, false, true, false],
              table: {
                widths: [2, 55, 70, 2, 45, 70, 2],
                body: [
                  //Row1
                  [
                    "",
                    {
                      text: "ลำดับพัสดุ \n Parcel No.",
                    },
                    {
                      text: this.props.printData[no].parcelNo,
                      bold: "true",
                      fontSize: 14,
                    },
                    "",
                    { text: "บ้านเลขที่ \n Room" },
                    {
                      text: this.props.printData[no].recipientUnitNo,
                      bold: "true",
                      fontSize: 14,
                    },
                    "",
                  ],

                  //Row2
                  [
                    "",
                    { text: "ชื่อผู้รับ \n Receipent" },
                    {
                      text: this.props.printData[no].recipientName.substring(
                        0,
                        20
                      ),
                      noWrap: true,
                      fontSize: 12,
                      bold: "true",
                    },
                    "",
                    { text: "ลักษณะพัสดุ \n Description" },
                    { text: this.props.printData[no].parcelType ==='ซองจดหมาย' ? 'ซองจดหมาย \nEnvelope' :
                        (this.props.printData[no].parcelType ==='ซองเอกสาร'? 'ซองเอกสาร \nDocument Envelope':
                        (this.props.printData[no].parcelType ==='ห่อเล็ก'? 'ห่อเล็ก \nSmall Envelope': 
                        (this.props.printData[no].parcelType ==='ห่อใหญ่'? 'ห่อใหญ่ \nLarge Envelope':
                        (this.props.printData[no].parcelType ==='กล่องเล็ก'? 'กล่องเล็ก \nSmall Box':
                        (this.props.printData[no].parcelType ==='กล่องใหญ่'? 'กล่องใหญ่ \nLarge Box':
                        (this.props.printData[no].parcelType ==='กล่องใหญ่พิเศษ'? 'กล่องใหญ่พิเศษ \nLarge Box':
                        'อื่นๆ \nOther')))))),
                    },
                    "",
                  ],

                   //Row3
                   [
                    "",
                    { text: "รหัสติดตามพัสดุ \n Tracking No." },
                    {
                      text: this.props.printData[no].trackingNo ? this.props.printData[no].trackingNo.substring(0,20): "-",
                    },
                    "",
                    { text: "ขนส่ง \n Delivery" },
                    { text: this.props.printData[no].deliveryName
                    },
                    "",
                  ],

                  //Row4
                  [
                    "",
                    { text: "วันที่เข้าระบบ \n Received Date" },
                    {
                      text:  moment(this.props.printData[no].importDate).format("DD/MM/YY")
                    },
                    "",
                    "",
                    "",
                    "",
                  ],
                 ]
              },
              layout: "noBorders"
            }
          ],
          [
            {
              border: [true, false, true, false],
              fillColor: "#D5D5D5",
              text: [
                {
                  text:
                    "กรุณานำใบนี้ มาติดต่อรับพัสดุที่ห้องนิติบุคคล \n Please bring this card to claim your package",
                  fontSize: 10,
                  alignment: "center"
                }
              ]
            }
          ],
          [
            {
              border: [true, false, true, true],
              image:
                "data:image/png;base64,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",
              width: 250
            }
          ]
        ]
      },
      layout: "noBorders" //Main border
    };
  };

  /***** PRINT PARCEL TABLE => GENERATE PDF PRINOUT *****/
  Print2TablePDF = () => {

    var externalDataRetrievedFromServer3 = [];

    //LOOP PRINT
    var totalRow = this.props.printData.length;
    DEBUG && console.log("totalRow", totalRow);
    //Reverse Print order
    for (var i = 0; i < totalRow; i++) {
      externalDataRetrievedFromServer3.push({
        parcelNo: this.props.printData[i].parcelNo,
        importDate: moment(this.props.printData[i].importDate).format(
          "DD/MM/YY"
        ),
        deliveryName: this.props.printData[i].deliveryName.substring(0, 20),
        parcelType: this.props.printData[i].parcelType,
        recipientUnitNo: this.props.printData[i].recipientUnitNo,
        recipientName: this.props.printData[i].recipientName.substring(0, 20),
        trackingNo: this.props.printData[i].trackingNo
          ? this.props.printData[i].trackingNo.substring(0, 18)
          : "",
        receiverName: this.props.printData[i].receiverName
          ? this.props.printData[i].receiverName.substring(0, 18)
          : "",
        exportDate: this.props.printData[i].exportDate
          ? moment(this.props.printData[i].exportDate).format("DD/MM/YY")
          : "",
        remark: this.props.printData[i].receiverName ? "รับแล้ว" : ""
      });
      DEBUG && console.log("i", i);
    }
    DEBUG && console.log("TEST3", externalDataRetrievedFromServer3);

    function buildTableBody(data, columns) {
      var body = [];

      //HEADER ROW
      //body.push(columns);
      body.push(
        // ROW1
        [
          {
            text: "",
            style: "tableHeader",
            rowSpan: 4,
            border: [false, false, false, false]
          },
          {
            text: "",
            style: "tableHeader",
            rowSpan: 4,
            border: [false, false, false, false]
          },
          {
            text: "โครงการ: ________________________",
            fontSize: 18,
            bold: true,
            alignment: "center",
            colSpan: 6,
            rowSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          {
            text: "จัดทำเมื่อ: " + moment().format("DD/MM/YY HH:mm"),
            fontSize: 12,
            colSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" }
        ],
        // ROW2
        [
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader", colSpan: 6 },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          {
            text: "ผู้ทำรายงาน: __________________",
            fontSize: 12,
            colSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" }
        ],
        // ROW3
        [
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          {
            text: "รายงานการรับจดหมาย/พัสดุลงทะเบียน",
            fontSize: 18,
            bold: true,
            alignment: "center",
            colSpan: 6,
            rowSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          {
            text: "บริหารโดย: ___________________",
            fontSize: 12,
            colSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" }
        ],
        // ROW4
        [
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader", colSpan: 6 },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          {
            text: "หน้า: ________________________",
            fontSize: 12,
            colSpan: 2,
            border: [false, false, false, false]
          },
          { text: "", style: "tableHeader" }
        ],
        // ROW5
        [
          {
            text: "รายละเอียด",
            style: "tableHeader",
            colSpan: 7,
            alignment: "center",
            bold: true,
            fillColor: "#eeeeee"
          },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          {
            text: "รับพัสดุ",
            style: "tableHeader",
            colSpan: 3,
            alignment: "center",
            bold: true,
            fillColor: "#eeeeee"
          },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" },
          { text: "", style: "tableHeader", fillColor: "#eeeeee" }
        ],
        // ROW6
        [
          {
            text: "หมายเลขพัสดุ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "วันที่เข้าระบบ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "บริษัทขนส่ง",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "ลักษณะพัสดุ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "บ้านเลขที่",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "ชื่อผู้รับ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "รายละเอียดเพิ่มเติม",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "ลายเซ็นผู้รับ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "วันที่รับ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          },
          {
            text: "หมายเหตุ",
            alignment: "center",
            bold: true,
            style: "tableHeader",
            fillColor: "#eeeeee"
          }
        ]
      );

      data.forEach(function(row) {
        var dataRow = [];
        columns.forEach(function(column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
        table: {
          widths: [60, 58, 63, 62, 58, 100, 100, "*", 50, "*"],
          headerRows: 6,
          body: buildTableBody(data, columns)
        }
      };
    }

    // var dd = {
    //     content: [
    //         { text: 'Dynamic parts', style: 'header' },
    //         table(externalDataRetrievedFromServer3,
    //           [
    //             'importDate',
    //             'parcelAliasName',
    //             'deliveryDisplayName',
    //             'parcelType',
    //             'recipientUnitNo',
    //             'recipientName',
    //           ])
    //     ]
    // }

    //DYNAMIC PRINT PDF
    //pdfMake.createPdf(dd).open()

    var docDefinition = {
      // a string or { width: number, height: number }
      pageSize: "A4",
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: "landscape",
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 40, 20, 40],
      content: [
        table(externalDataRetrievedFromServer3.reverse(), [
          "parcelNo",
          "importDate",
          "deliveryName",
          "parcelType",
          "recipientUnitNo",
          "recipientName",
          "trackingNo",
          "receiverName",
          "exportDate",
          "remark"
        ])
      ],
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 15
      },
      styles: {
        tableHeader: {
          bold: true,
          color: "black"
        }
      }
    };

    // GENERATE PDF FILE
    if (this.state.pdfPrintType === "open") {
      //pdfMake.createPdf(docDefinition).open({}, window);
      try {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        var win = window.open("", "_blank");
        pdfDocGenerator.open({}, win);
        //Set Print Flag Async
        //this.updatePrintFlagAsync();
        setTimeout(() => {
          DEBUG && console.log("RUN updatePrintFlag() after 3 seconds");
          //this.updatePrintFlag();
        }, 3000);
      } catch (err) {
        console.log("Error", err);
      }
    } else if (this.state.pdfPrintType === "download") {
      pdfMake
        .createPdf(docDefinition)
        .download(
          "urbanice_parcelcard_" + moment().format("YYYYMMDD_HHmmss") + ".pdf",
          //this.updatePrintFlag()
        );
    }
  };

  //RENDER
  render() {
    //DEBUG && console.log("Total2Print:", this.props.printData.length);

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: 20 }}>
            <span style={{ fontSize: 30, color: "green" }}>
              <Icon type="file-pdf" />
            </span>
          </div>
          <div>
            {/* <h2>สร้างรายงาน ประจำวันที่ {this.props.date} </h2> */}
            <div style={{paddingBottom:20}} >
              <h2>
                รายการที่ต้องพิมพ์ใบรับพัสดุทั้งหมด {this.props.printData.length}{" "}
                รายการ{" "}
              </h2>
            </div>
            <div style={{paddingBottom:20}} >
              <Button
                type="primary"
                block
                icon="file-pdf"
                onClick={this.Print2PDF}
              >
                สร้างใบรับพัสดุ (PDF)
              </Button>
            </div>

            <div style={{paddingBottom:20}} >
              <Button
                type="primary"
                block
                icon="file-pdf"
                onClick={this.Print2TablePDF}
              >
                สร้างรายงานการรับจดหมาย/พัสดุลงทะเบียน (PDF)
              </Button>
            </div>
            {/* <div>
              รูปแบบการแสดงผล PDF (ปัจจุบัน):{" "}
              {this.state.pdfPrintType === "open"
                ? "แสดงเป็น Tab ใหม่"
                : "ดาวโหลดเป็นไฟล์"}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
