import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './context';

export const RecurlyElementsContext = React.createContext();

const { Provider, Consumer } = RecurlyElementsContext;

// export const fieldContextTypes = {
//   addFieldsLoadListener: PropTypes.func.isRequired,
//   registerField: PropTypes.func.isRequired,
//   unregisterField: PropTypes.func.isRequired,
// };

export default class Elements extends React.Component {
  static defaultProps = {
    children: null
  };

  static contextType = RecurlyContext;

  constructor (props, context) {
    super(props, context);
    this.state = {
      // registeredElements: []
    };

    // debugger;

    this._elements = this.context.recurly.Elements();
  }

  // getChildContext () {
  //   return {
  //     // TODO: This should pass back a Fields controller of some form.
  //     //       For now we'll access the recurly instance directly
  //     addFieldsLoadListener: (listener) => {
  //       listener(this.context.recurly)
  //       // if (this._fields) {
  //       //   listener(this._fields);
  //       //   return;
  //       // }
  //       // const {children, ...options} = this.props;
  //       // debugger;
  //       // TODO: Need to access controller more gracefully
  //       // this._fields = this.context.recurly.hostedFields.constructor(
  //       //   Object.assign({}, options, { recurly: this.context.recurly })
  //       // );
  //       // listener(this._fields);
  //     },
  //     registerField: this.handleRegisterField,
  //     unregisterField: this.handleUnregisterField,
  //     getRegisteredElements: () => this.state.registeredElements,
  //   };
  // }

  // handleRegisterElement (element) {
  //   this.setState(prevState => ({
  //     registeredElements: [
  //       ...prevState.registeredElements,
  //       { element },
  //     ],
  //   }));
  // };

  // handleUnregisterElement (el) {
  //   this.setState(prevState => ({
  //     registeredElements: prevState.registeredElements.filter(({ element }) => element !== el)
  //   }));
  // };

  render () {
    const elements = this._elements;
    return (
      <Provider value={{ elements }}>{this.props.children}</Provider>
    );
  }
};
