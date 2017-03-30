import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/documentActions';
import DocumentForm from './documentForm';

class NewDocumentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: {
                title: '',
                content: '',
                access: ''
            },
            saving: false
        };
        this.saveDoc = this.saveDoc.bind(this);
        this.updateDocState = this.updateDocState.bind(this);
    }

    updateDocState(event) {
        const field = event.target.name;
        const document = this.state.doc;
        document[field] = event.target.value;
        return this.setState({ doc: document });
    }

    saveDoc(event) {
        event.preventDefault();
        console.log(this.state.doc);
        this.props.actions.addDocuments(this.state.doc);
    }

    render() {
        return (
            <div>
                <h1>New Document</h1>
                <DocumentForm
                    doc={this.state.doc}
                    onSave={this.saveDoc}
                    onChange={this.updateDocState}
                />
            </div>
        );
    }
}

NewDocumentPage.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    if (state.docs.length > 0) {
        return {
            docs: state.docs
        };
    } else {
        return {
            docs: [{ title: '', content: '', access: '' }]
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(docActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDocumentPage);
