import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer"> 
                    {/* © {new Date().getFullYear()}  Veltrix <span className="d-none d-sm-inline-block"> - Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</span>. */}
                    <p>© {new Date().getFullYear()}  <span className="d-none d-sm-inline-block">  powered <i className="mdi mdi-heart text-danger"></i>  by Trim.</span>.</p>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;






