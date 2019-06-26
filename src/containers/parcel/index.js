import React, { Component } from "react";
import { siteConfig } from "../../settings";

import db from "./db";
import NewParcelForm from "./newParcelForm";
import ParcelList from "./parcelList";


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
      .toArray()
      .then(parcelInfo => {
        this.setState({ parcelInfo });
      });
  };

  /****** HANDLE ADD PARCEL FUNCTIONS ******/
  handleAddParcel = (parcelData) => {
    db.table("parcelInfo")
      .add(parcelData)
      .then((id) => {
        const newList = [...this.state.parcelInfo, Object.assign({},parcelData,{ id })]
        this.setState({ parcelInfo: newList });
      });
  };

  /****** HANDLE ADD PARCEL FUNCTIONS ******/
  handleDeleteParcel = id => {
    db.table('parcelInfo')
    .delete(id)
    .then(() => {
      const newList = this.state.parcelInfo.filter((parcel) => parcel.id !== id);
      this.setState({parcelInfo:newList});
    })
  };

  render() {
    return (
      <div style={{ background: "#fff", padding: 20 }}>
        <div style={{ paddingBottom: 20 }}>
          <NewParcelForm 
            handleAddParcel={this.handleAddParcel}
          />
        </div>
        <div>
          <ParcelList 
            parcelInfo={this.state.parcelInfo}
            handleDeleteParcel={this.handleDeleteParcel} 
          />
        </div>
      </div>
    );
  }
}
