import React, { Component } from 'react';
import html2canvas from 'html2canvas';

class tattooCanvas extends Component {

    genScreenshort(){
        html2canvas(document.querySelector("#capture")).then(canvas => {
            document.body.appendChild(canvas)
        });
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default tattooCanvas;