import React from 'react';
import PropTypes from 'prop-types';
import { RecurlyContext } from './provider';

export const RecurlyElementsContext = React.createContext();

const { Provider } = RecurlyElementsContext;

export default class Elements extends React.Component {
  static propTypes = {
    /**
     * Called when a user presses the <kbd>enter</kbd> key while
     * focused on any descendant `*Element`.
     */
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {}
  };

  static contextType = RecurlyContext;

  constructor (props, context) {
    super(props, context);

    if (!context || !context.recurly) {
      throw new Error('<Elements> must be within a <RecurlyProvider> tree.');
    }

    this._elements = this.context.recurly.Elements();
    this._elements.on('submit', el => this.props.onSubmit(el));
  }

  render () {
    const elements = this._elements;
    return (
      <Provider value={{ elements }}>{this.props.children}</Provider>
    );
  }
};
