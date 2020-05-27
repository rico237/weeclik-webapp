import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;


class DocumentReader extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {

        const { /*pageNumber,*/ numPages } = this.state;
        const { index } = this.props.match.params;
        var doc = '/pdf/Mentions_legales_Sites_web.pdf';
        
        if (index === 'politique') {
            doc = '/pdf/CGU_Sites_web.pdf';
        }
        if (index === 'cgu') {
            doc = '/pdf/CGU_Sites_web.pdf';
        }
        if (index === 'cgv') {
            doc = '/pdf/CGV_E_commerce.pdf';
        }
        if (index === 'mentions') {
            doc = '/pdf/CGV_E_commerce.pdf';
        }
        if (index === 'cguv') {
            doc = '/pdf/NOUVEAU_CGUV_E_commerce.pdf';
        }
        if (index === 'rgpd') {
            doc = '/pdf/RGPD_Politique_de_confidentialite_des_donnees_personnelles.pdf';
        }

        return (
            <center style={{paddingTop: "65px", backgroundColor: "#FFF"}}>
                <Document
                    file={doc}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    {
                        Array(numPages).fill().map((_, i) => i+1).map(page => (
                            <div key={page}>
                                <Page width={600} pageNumber={page}/>
                            </div>
                        ))
                    }
                </Document>
                {/* <p>Page {pageNumber} of {numPages}</p> */}
            </center>
        )
    };
}

export default DocumentReader;