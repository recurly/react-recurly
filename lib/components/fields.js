import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './context';

export const injectContextTypes = {
  getRegisteredFields: PropTypes.func.isRequired,
};

export const fieldContextTypes = {
  addFieldsLoadListener: PropTypes.func.isRequired,
  registerField: PropTypes.func.isRequired,
  unregisterField: PropTypes.func.isRequired,
};

export default class Elements extends React.Component {
  // static childContextTypes = {
  //   ...injectContextTypes,
  //   ...fieldContextTypes,
  // };
  // static contextTypes = providerContextTypes;
  static defaultProps = {
    children: null
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      registeredFields: []
    };
  }

  getChildContext () {
    return {
      // TODO: This should pass back a Fields controller of some form.
      //       For now we'll access the recurly instance directly
      addFieldsLoadListener: (listener) => {
        listener(this.context.recurly)
        // if (this._fields) {
        //   listener(this._fields);
        //   return;
        // }
        // const {children, ...options} = this.props;
        // debugger;
        // TODO: Need to access controller more gracefully
        // this._fields = this.context.recurly.hostedFields.constructor(
        //   Object.assign({}, options, { recurly: this.context.recurly })
        // );
        // listener(this._fields);
      },
      registerField: this.handleRegisterField,
      unregisterField: this.handleUnregisterField,
      getRegisteredFields: () => this.state.registeredFields,
    };
  }

  handleRegisterField (field) {
    this.setState(prevState => ({
      registeredFields: [
        ...prevState.registeredFields,
        { field },
      ],
    }));
  };

  handleUnregisterField (el) {
    this.setState(prevState => ({
      registeredFields: prevState.registeredFields.filter(({field}) => field !== el),
    }));
  };

  render () {
    return React.Children.only(this.props.children);
  }
};
