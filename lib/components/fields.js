import React from 'react';
import PropTypes from 'prop-types';
import {providerContextTypes} from './provider';

export const injectContextTypes = {
  getRegisteredFields: PropTypes.func.isRequired,
};

export const fieldContextTypes = {
  addFieldsLoadListener: PropTypes.func.isRequired,
  registerField: PropTypes.func.isRequired,
  unregisterField: PropTypes.func.isRequired,
};

export default class Fields extends React.Component {
  static childContextTypes = {
    ...injectContextTypes,
    ...fieldContextTypes,
  };
  static contextTypes = providerContextTypes;
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
      addFieldsLoadListener: (listener) => {
        if (this._fields) {
          listener(this._fields);
          return;
        }
        const {children, ...options} = this.props;
        this._fields = this.context.recurly.Field(options);
        listener(this._fields);
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
