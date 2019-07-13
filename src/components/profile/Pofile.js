import React, { Component } from 'react';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canModify: false,
            isModify: false
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleClick = this.handleClick.bind(this);
        this.handleModifyProfile = this.handleModifyProfile.bind(this);

    }

    handleClick() {
        this.setState(state => ({
            canModify: !state.canModify
        }));
    }

    handleModifyProfile() {
        this.setState(state => ({
            canModify: !state.canModify,
            isModify: !state.isModify
        }));
    }

    render() {

        const fakeImg = {
            height: "200",
            background: "#aaa"
        }

        if (this.state.canModify) {
            return (
                <div>
                    <h2>About Me</h2>
                    <h5>Photo of me:</h5>
                    <img src="fakeImg" className="rounded" alt="Fake Image"/>
                    <p>Some text about me in culpa qui officia deserunt mollit anim...</p>
                    <h3>Coordonnées</h3>
                    <p>Lorem ipsum dolor sit ame.</p>

                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="emailInput">Mail</label>
                                <input type="email" id="emailInput" className="form-control" placeholder="grace@gmail.com"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobileInput">Telephone</label>
                                <input type="text" id="mobileInput" className="form-control" placeholder="0123456789"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="addrInput">Address</label>
                                <input type="text" id="addrInput" className="form-control" placeholder="1234 Main St"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </fieldset>
                    </form>
                    <hr className="d-sm-none"></hr>
                    <button className="btn btn-primary btn-sm" onClick={this.handleClick}>Modifier le profile</button>
                </div>
            )
        }

        return (
            <div>
                <h2>About Me</h2>
                <h5>Photo of me:</h5>
                <img src="fakeImg" className="rounded" alt="Fake Image"/>
                <p>Some text about me in culpa qui officia deserunt mollit anim...</p>
                <h3>Coordonnées</h3>
                <p>Lorem ipsum dolor sit ame.</p>

                <form>
                    <fieldset disabled>
                        <div className="form-group">
                            <label htmlFor="emailInput">Mail</label>
                            <input type="email" id="emailInput" className="form-control" placeholder="grace@gmail.com"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileInput">Telephone</label>
                            <input type="text" id="mobileInput" className="form-control" placeholder="0123456789"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="addrInput">Address</label>
                            <input type="text" id="addrInput" className="form-control" placeholder="1234 Main St"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
                <hr className="d-sm-none"></hr>
                <button className="btn btn-primary btn-sm" onClick={this.handleClick}>Modifier le profile</button>
            </div>
        )
    }
}

export default Login;