import React, { Component } from 'react';
import { Table, Button,Avatar } from "antd";
import html2canvas from 'html2canvas';
import { siteConfig } from "../../settings";
import './index.css'

var moment = require("moment");
require("moment/locale/th.js");
require("moment-duration-format");

const DEBUG = siteConfig.DEBUG


class previewTattoo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'small', //default, middle, small
            userText: '',
            userDistance: '',
            userTime: '',
            userColorTheme: '',
            timeSplit: [],
            pace: null,
        }
    }

    /****** COMPONENT DID MOUNT FUNCTIONS ******/
    componentDidMount() {
        DEBUG && console.log("componentDidMount");
        DEBUG && console.log(`Props_Title: ${this.props.formData.getFieldValue("userText")}`);
        DEBUG && console.log(`Props_Distance: ${this.props.formData.getFieldValue("userDistance")}`);
        DEBUG && console.log(`Props_Time: ${this.props.formData.getFieldValue("userTime")}`);
        DEBUG && console.log(`Props_Color: ${this.props.formData.getFieldValue("userColorTheme")}`);
    }

    /****** COMPONENT DID UPDATE FUNCTIONS ******/
    componentDidUpdate(prevProps, prevState) {
        DEBUG && console.log("componentDidUpdate");
        DEBUG && console.log(`prevProps_Distance: ${prevProps.formData.getFieldValue("userDistance")}`);
        DEBUG && console.log(`prevState_Distance: ${prevState.userDistance}`);
        if (prevProps.formData.getFieldValue("userDistance") !== prevState.userDistance || prevProps.formData.getFieldValue("userTime") !== prevState.userTime || prevProps.formData.getFieldValue("userColorTheme") !== prevState.userColorTheme) {
            this.setState({
                timeSplit: []
            }, () => {
                this.calculateSplits(prevProps.formData.getFieldValue("userDistance"), prevProps.formData.getFieldValue("userTime"), prevProps.formData.getFieldValue("userColorTheme"));
                this.calculatePace(prevProps.formData.getFieldValue("userDistance"), prevProps.formData.getFieldValue("userTime"), prevProps.formData.getFieldValue("userColorTheme"));
            })
        }
    }

    /****** GET DERIVED STATE FROM PROPS FUNCTIONS ******/
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            userText: nextProps.formData.getFieldValue("userText"),
            userDistance: nextProps.formData.getFieldValue("userDistance"),
            userTime: nextProps.formData.getFieldValue("userTime"),
            userColorTheme: nextProps.formData.getFieldValue("userColorTheme"),
        };
    }

    /****** CALCULATE SPLITS FUNCTIONS ******/
    calculateSplits(currentDistance, currentTime,currentColor) {
        DEBUG && console.log("calculateSplits");
        DEBUG && console.log(`calculateSplits_currentDistance: ${parseFloat(currentDistance)}`);
        DEBUG && console.log(`calculateSplits_currentTime: ${moment(currentTime).format('HH:mm:ss')}`);
        DEBUG && console.log(`calculateSplits_currentTime_sec: ${moment(currentTime, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds')}`);
        // DEBUG && console.log(`calculateSplits_currentTime_sec: ${moment.duration(currentTime).asSeconds()}`);
        DEBUG && console.log(`calculateSplits_currentTime_hhmmss: ${moment.duration(123, "seconds").format("hh:mm:ss")}`);

        //let currentDistance = parseInt(distance)

        if (parseFloat(currentDistance) > 0 && currentDistance !== undefined) {


            switch (parseInt(currentDistance)) {
                case 5:
                    DEBUG && console.log(`5`);
                    for (let i = 0; i < parseInt(currentDistance); i++) {
                        DEBUG && console.log(`i:${i + 1}`);
                        let currentSplitSect = (moment(currentTime, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds') / currentDistance) * (i + 1);
                        let currentSplit = moment.duration(currentSplitSect, "seconds").format("hh:mm:ss");
                        DEBUG && console.log(`Time_Split:${currentSplit}`);
                        let currentRow = {
                            id: i + 1,
                            km: i + 1,
                            time: currentSplit,
                            color: i % 2 ? '#fff' : currentColor,
                            fontColor: i % 2 ? 'black' : (currentColor === '#7FFFD4' || currentColor ==='#E6E6FA' || currentColor ==='#FEDD30' ? 'black': 'white'),
                        }
                        DEBUG && console.log(`timeSplit:${JSON.stringify(currentRow)}`);
                        this.state.timeSplit.push(currentRow)
                    }
                    break;
                case 10:
                    DEBUG && console.log(`10`);
                    for (let i = 0; i < parseInt(currentDistance); i++) {
                        DEBUG && console.log(`i:${i + 1}`);
                        let currentSplitSect = (moment(currentTime, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds') / currentDistance) * (i + 1);
                        let currentSplit = moment.duration(currentSplitSect, "seconds").format("hh:mm:ss");
                        DEBUG && console.log(`Time_Split:${currentSplit}`);
                        let currentRow = {
                            id: i + 1,
                            km: i + 1,
                            time: currentSplit,
                            color: i % 2 ? '#fff' : currentColor,
                            fontColor: i % 2 ? 'black' : (currentColor === '#7FFFD4' || currentColor ==='#E6E6FA' || currentColor ==='#FEDD30' ? 'black': 'white'),
                        }
                        DEBUG && console.log(`timeSplit:${JSON.stringify(currentRow)}`);
                        this.state.timeSplit.push(currentRow)
                    }
                    break;
                case 21:
                    DEBUG && console.log(`21.10`);
                    for (let i = 0; i < parseInt(currentDistance / 2); i++) {
                        DEBUG && console.log(`i:${i + 1}`);
                        let currentSplitSect = (moment(currentTime, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds') / currentDistance) * (i + 1) * 2;
                        let currentSplit = moment.duration(currentSplitSect, "seconds").format("hh:mm:ss");
                        DEBUG && console.log(`Time_Split:${currentSplit}`);
                        let currentRow = {
                            id: i + 1,
                            km: (i + 1) * 2,
                            time: currentSplit,
                            color: i % 2 ? '#fff' : currentColor,
                            fontColor: i % 2 ? 'black' : (currentColor === '#7FFFD4' || currentColor ==='#E6E6FA' || currentColor ==='#FEDD30' ? 'black': 'white'),
                        }
                        DEBUG && console.log(`timeSplit:${JSON.stringify(currentRow)}`);
                        //DEBUG && console.log(`timeSplit_RowID:${JSON.stringify(currentRow.id)}`);
                        // if(currentRow.id%2 ===0){
                        this.state.timeSplit.push(currentRow)
                        // }
                    }
                    break;
                case 42:
                    DEBUG && console.log(`42.20`);
                    for (let i = 0; i < parseInt(currentDistance / 3); i++) {
                        DEBUG && console.log(`i:${i + 1}`);
                        let currentSplitSect = (moment(currentTime, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds') / currentDistance) * (i + 1) * 3;
                        let currentSplit = moment.duration(currentSplitSect, "seconds").format("hh:mm:ss");
                        DEBUG && console.log(`Time_Split:${currentSplit}`);
                        let currentRow = {
                            id: i + 1,
                            km: (i + 1) * 3 === 21 ? 'HALF' : (i + 1) * 3,
                            time: currentSplit,
                            // color: (i + 1) * 3 === 21 ? '#ddd' : (i % 2 ? '#fff' : currentColor), //opacity: 0.5
                            color: (i + 1) * 3 === 21 ? currentColor : (i % 2 ? '#fff' : currentColor), //opacity: 0.5
                            fontColor: i % 2 ? 'black' : (currentColor === '#7FFFD4' || currentColor ==='#E6E6FA' || currentColor ==='#FEDD30' ? 'black': 'white'),
                        }
                        DEBUG && console.log(`timeSplit:${JSON.stringify(currentRow)}`);
                        this.state.timeSplit.push(currentRow)
                    }
                    break;
                default:
                    DEBUG && console.log(`Default`);
                    break;
            }
        }
    }


    /****** CALCULATE PACE FUNCTIONS ******/
    calculatePace(distance, time,color) {
        DEBUG && console.log("calculatePace");
        DEBUG && console.log(`calculatePace_currentDistance: ${parseFloat(distance)}`);
        DEBUG && console.log(`calculatePace_currentTime: ${moment(time).format('HH:mm:ss')}`);
        DEBUG && console.log(`calculatePace_currentTime_sec: ${moment(time, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'seconds')}`);
        DEBUG && console.log(`calculatePace_PACE: ${(moment(time, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'minutes')) / distance}`);

        let calPace_raw = (moment(time, 'HH:mm:ss').diff(moment('00:00:00', 'HH:mm:ss'), 'minutes')) / distance;
        let paceSplit = calPace_raw.toString().split('.')
        DEBUG && console.log(`calculatePace_PACE[0]: ${paceSplit[0]}`);
        DEBUG && console.log(`calculatePace_PACE[1]: ${paceSplit[1]}`);

        let lastDigit = Math.round((paceSplit[1] * 60) / 100)
        DEBUG && console.log(`calculatePace_LastDigit: ${lastDigit}`);
        // DEBUG && console.log(`calculatePace_PACE: ${paceSplit[0]}.${lastDigit}`);
        let calPaceStr = paceSplit[0] + '.' + lastDigit
        let calPaceFloat = parseFloat(calPaceStr).toFixed(2);
        let calPace = calPaceFloat.toString().replace(".", ":");

        DEBUG && console.log(`calculatePace_PACE: ${calPace}`);

        this.setState({
            pace: calPace,
        })
    }

    /****** GEN SCREENSHOT FUNCTIONS ******/
    genScreenshot() {
        html2canvas(document.querySelector("#tattooBox")).then(canvas => {
            document.body.appendChild(canvas)
        });
    }

    /****** RENDER FUNCTIONS ******/
    render() {
        const { size, userText, userTime, timeSplit,userColorTheme, pace } = this.state;

        const columns = [
            {
                title: 'KM',
                dataIndex: 'km',
                key: 'km',
                width: 50,
                render(text, record) {
                    return {
                        props: {
                            style: { background: record.color, color:record.fontColor }, //color:record.fontColor
                        },
                        children: <div style={{ textAlign: "center", fontSize: 16,fontWeight:'bold' }}>{text}</div>,
                    };
                },
            },
            {
                title: 'Splits',
                dataIndex: 'time',
                key: 'time',
                width: 50,
                render(text, record) {
                    return {
                        props: {
                            style: { background: record.color, color:record.fontColor}, // color:record.fontColor
                        },
                        children: <div style={{ textAlign: "center", fontSize: 16, fontWeight:'bold' }}>{text}</div>,
                    };
                },
            }
        ]
        return (
            <div>
                <div id="tattooBox" style={{ borderColor: userColorTheme, borderStyle:'solid', borderWidth:'2px'}} >
                    <Table
                        className="table-striped-rows"
                        columns={columns}
                        dataSource={timeSplit ? timeSplit : null}
                        rowKey={record => record.id}
                        // bordered
                        title={() =>
                            <div style={{ textAlign: "center", fontFamily: 'Kanit', fontSize: 18, paddingTop: 10 }}>
                                <span style={{ fontSize: 22, color: 'black'}}>
                                    {userText ? userText : 'My Title'}
                                </span>
                                <br />
                                <span style={{ fontSize: 14, color:userColorTheme === '#7FFFD4' || userColorTheme ==='#E6E6FA' || userColorTheme ==='#FEDD30' ? 'black': userColorTheme }}>
                                    {moment(userTime) ? (moment(userTime).format('H') === '0' ? '' : moment(userTime).format('H') + ' hr ') + moment(userTime).format('mm') + ' min' : 'My Finish Time'}
                                </span>
                                <br />
                                <span style={{ fontSize: 32 ,color:userColorTheme === '#7FFFD4' || userColorTheme ==='#E6E6FA' || userColorTheme ==='#FEDD30' ? 'black': userColorTheme }}>
                                    {pace ? pace : "0:00"}
                                </span>

                            </div>
                        }
                        footer={() =>
                            <div style={{ textAlign: "center", fontSize: 16, backgroundColor: userColorTheme, borderColor: userColorTheme }}>
                                
                                <span style={{ fontSize: 18, fontWeight: 'bold',color:userColorTheme === '#7FFFD4' || userColorTheme ==='#E6E6FA' || userColorTheme ==='#FEDD30' ? 'black': 'white' }}>
                                    {moment(userTime).format('HH:mm:ss') ? moment(userTime).format('HH:mm:ss') : 'My Finish Time'}
                                </span>
                                <br />
                                <span style={{ fontSize: 12 ,color:userColorTheme === '#7FFFD4' || userColorTheme ==='#E6E6FA' || userColorTheme ==='#FEDD30' ? 'black': 'white'}}>
                                    By GeekRunners.com
                            </span>
                            </div>
                        }
                        showHeader={true}
                        pagination={false}
                        size={size}
                    />
                </div>
                {/* <br />
                <Button
                    //block
                    type="primary"
                    onClick={this.genScreenshot}
                >
                    SCREENSHOT
                </Button> */}
            </div>
        );
    }
}

export default previewTattoo;