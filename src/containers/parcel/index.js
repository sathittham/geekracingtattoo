import React, { Component } from "react";
import { siteConfig } from "../../settings";

import db from "./db";
import NewParcelForm from "./newParcelForm";
import ParcelList from "./parcelList";

var moment = require("moment");
require("moment/locale/th.js");

const DEBUG = siteConfig.DEBUG;

export default class index extends Component {
  constructor() {
    super();
    this.state = { parcelInfo: [] };
    this.handleAddParcel = this.handleAddParcel.bind(this);
    this.handleDeleteParcel = this.handleDeleteParcel.bind(this);
  }

  /****** COMPONENT DID MOUNT FUNCTIONS ******/
  componentDidMount() {
    DEBUG && console.log('componentDiMount');
    //Get Data from DB
    this.getDataFromDB();
    // db.table("parcelInfo")
    //   .toArray()
    //   .then(parcelInfo => {
    //     this.setState({ parcelInfo });
    //   });
  }

  /****** GET LOCAL DATABASE INFO FUNCTIONS ******/
  getDataFromDB = () => {
    DEBUG && console.log('getDataFromDB');
    db.table("parcelInfo")
      .filter((parcel) => parcel.deleteFlag === false && moment(parcel.importDate).format('YYMM') === moment().format('YYMM'))
      .toArray()
      .then(parcelInfo => {
        this.setState({ parcelInfo, });
      });
  };

  /****** HANDLE ADD PARCEL FUNCTIONS ******/
  handleAddParcel = (parcelData) => {
    db.table("parcelInfo")
      .add(parcelData)
      .then((id) => {
        const newList = [Object.assign({},parcelData,{ id }),...this.state.parcelInfo]
        this.setState({ parcelInfo: newList.reverse() });
      });
  };

  /****** HANDLE ADD PARCEL FUNCTIONS ******/
  // handleDeleteParcel = id => {
  //   db.table('parcelInfo')
  //   .delete(id)
  //   .then(() => {
  //     const newList = this.state.parcelInfo.filter((parcel) => parcel.id !== id);
  //     this.setState({parcelInfo:newList});
  //   })    
  // };

   /****** HANDLE DELETE PARCEL FUNCTIONS ******/
  handleDeleteParcel(id, deleteFlag) { 
    db.table('parcelInfo')
      .update(id, { deleteFlag })
      .then(() => {
        //const parcelInfoUpdate = this.state.parcelInfo.find((parcel) => parcel.id ===id);
        const newList = [
          ...this.state.parcelInfo.filter((parcel) => parcel.id !== id)
          // ...this.state.parcelInfo.filter((parcel) => parcel.id !==id),
          // Object.assign({},parcelInfoUpdate, { deleteFlag })
        ];
        this.setState({ parcelInfo: newList});
      });
  }

   /****** HANDLE DELETE PARCEL FUNCTIONS ******/
   handleClearTable() { 
    db.table('parcelInfo')
      .clear()
      .then(() => {
        DEBUG && console.log('handleClearTable');
        //const parcelInfoUpdate = this.state.parcelInfo.find((parcel) => parcel.id ===id);
        // const newList = [
        //   ...this.state.parcelInfo.filter((parcel) => parcel.id !== id)
        //   // ...this.state.parcelInfo.filter((parcel) => parcel.id !==id),
        //   // Object.assign({},parcelInfoUpdate, { deleteFlag })
        // ];
        // this.setState({ parcelInfo: newList});
      });
  }

  render() {
    return (
      <div style={{ background: "#fff", padding: 20 }}>
        <div style={{ paddingBottom: 20 }}>
          <NewParcelForm 
            handleAddParcel={this.handleAddParcel}
            handleClearTable={this.handleClearTable}
          />
        </div>
        <div>
          <ParcelList 
            parcelInfo={this.state.parcelInfo.reverse()}
            handleDeleteParcel={this.handleDeleteParcel} 
            handleClearTable={this.handleClearTable}
          />
        </div>
      </div>
    );
  }
}
