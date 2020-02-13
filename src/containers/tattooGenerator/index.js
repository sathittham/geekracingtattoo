import React, { Component } from 'react';
import WrappedGeneratorForm from './generatorForm';
import { siteConfig } from "../../settings";

var moment = require("moment");
require("moment/locale/th.js");

class index extends Component {
    constructor() {
        super();
        this.state = {
        }
    
      }

      
    render() {
        return (
            <div>
                <WrappedGeneratorForm />
            </div>
        );
    }
}

export default index;