import React from 'react';

import {injectContextTypes} from './fields';
import {providerContextTypes} from './provider';

const inject = (WrappedComponent, componentOptions = {}) => {
  const { withRef = false } = componentOptions;

  return class extends React.Component {
    static contextTypes = {
      ...providerContextTypes,
      ...injectContextTypes,
    };
    static displayName = `InjectRecurly(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    constructor (props, context) {
      if (!context || !context.getRegisteredFields) {
        throw new Error(
          `It looks like you are trying to inject a Recurly context outside of a Fields context.
           Please be sure the component that calls 'token' is within a <Fields> component.`
        );
      }

      super(props, context);

      this.state = {
        recurly: this.recurlyProps(this.context.recurly),
      };
    }

    componentDidMount () {
    }

    getWrappedInstance () {
      if (!withRef) {
        throw new Error(
          `To access the wrapped instance, the \`{ withRef: true }\` option
           must be set when calling \`injectRecurly()\``
        );
      }
      return this.wrappedInstance;
    }

    recurlyProps (recurly) {
      return {
        ...recurly,
        token: this.wrappedToken(recurly),
      };
    }

    // TODO
    // - Should this
    //   - not exist? Force the developer to provide a field reference directly
    //   - only be utilized when a direct reference is not passed directly?
    //   - look for a variety of field types within the context?
    //     i.e. card, number, bank info? when given a string type
    findTokenizingField () {
      // Filter out fields which cannot tokenize
      const tokenizingFields = this.context.getRegisteredFields().filter(e => e.token);

      if (tokenizingFields.length === 1) {
        return tokenizingFields[0].field;
      } else if (tokenizingFields.length === 0) {
        throw new Error(
          `There appear to be no tokenizable Fields within this context. Please ensure that
           one is present.`
        );
      } else if (tokenizingFields.length > 1) {
        throw new Error(
          `Since there are multiple tokenizable Fields within this context,
           we could not infer which Field you want to use for this operation.
           Please pass a specific reference to the field you wish to tokenize.`
        );
      }
    };

    // Wraps createToken in order to infer the Field that is being tokenized.
    wrappedToken = (recurly) => (options = {}) => {
      if (typeof options !== 'object') {
        throw new Error(
          `Invalid options passed to \`token\`. Expected an object, got ${typeof options}.`
        );
      }

      // TODO: accept a direct field reference within `options`; otherwise, use findTokenizingField
      //       Need to determine this method's signature first
      //
      // const field = options.field ? options.field : this.findTokenizingField();
      const field = this.findTokenizingField();
      return recurly.token(field, options);
    };

    render () {
      return (
        <WrappedComponent
          {...this.props}
          recurly={this.state.recurly}
          ref={withRef ? (c => { this.wrappedInstance = c; }) : null}
        />
      );
    }
  };
};

export default inject;
