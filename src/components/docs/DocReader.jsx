import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;


class DocReader extends Component {

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
        
        if (index === 'cgu') {
            doc = '/pdf/CGU_Sites_web.pdf';
        }
        if (index === 'cgv') {
            doc = '/pdf/CGV_E_commerce.pdf';
        }
        if (index === 'cgu_cgv') {
            doc = '/pdf/CGV_et_CGU_Applications_mobiles_avec_achats_integres_2.pdf';
        }
        if (index === 'mlam') {
            doc = '/pdf/Mentions_legales_Applications_mobiles.pdf';
        }
        if (index === 'mlsw') {
            doc = '/pdf/Mentions_legales_Sites_web.pdf';
        }
        if (index === 'newcguv') {
            doc = '/pdf/NOUVEAU_CGUV_E_commerce.pdf';
        }
        if (index === 'rgpd') {
            doc = '/pdf/RGPD_Politique_de_confidentialite_des_donnees_personnelles.pdf';
        }

        return (
            <div style={{backgroundColor: "#FFF"}}>
                <Link to={"/doc/phone/link"} className="btn-solid-lg btn-sm m-4" style={{textDecoration: "none"}}>Retour</Link>
                <center>
                    <Document
                        file={doc}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        {
                            Array(numPages).fill().map((_, i) => i+1).map(page => (
                                <div key={page}>
                                    <Page width={600} scale={1.5} pageNumber={page}/>
                                </div>
                            ))
                        }
                    </Document>
                    {/* <p>Page {pageNumber} of {numPages}</p> */}
                </center>
            </div>
        )
    };
}

export default DocReader;