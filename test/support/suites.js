import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { suppressConsoleErrors, withElements } from './helpers';

import { CardElement } from '../../lib';

/**
 * Constructs a test suite for an Element class
 *
 * Asserts behaviors on behalf of the Element abstract class
 */
export function ElementSuite (ElementClass) {
  const { elementClassName } = ElementClass;

  describe(`<${elementClassName} />`, function () {
    describe('without a parent <Elements />', function () {
      suppressConsoleErrors();

      it('throws an error', function () {
        expect(() => {
          render(<ElementClass />)
        }).toThrow(`<${elementClassName}> must be within an <Elements> tree.`);
      });
    });

    describe('with a parent <Elements />', function () {
      it('does not throw an error', function () {
        expect(() => render(withElements(<ElementClass />))).not.toThrow();
      });

      it(`places a recurly.Elements#${elementClassName}`, function () {
        const subject = mount(withElements(<ElementClass />)).find(ElementClass);

        expect(subject.instance()._element).toBeInstanceOf(
          window.recurly.Elements()[elementClassName]().constructor
        );

        expect(subject.getDOMNode().querySelector('iframe')).toBe(
          subject.instance()._element.iframe
        );
      });

      describe('when unmounted', function () {
        it(`destroys the underlying recurly.Elements#${elementClassName}`, function () {
          const subject = mount(withElements(<ElementClass />));
          const spy = jest.spyOn(
            subject.find(ElementClass).instance()._element,
            'destroy'
          ).mockImplementation(() => {});

          subject.unmount();

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('[id]', function () {
      it('sets the id attribute of the wrapping HTMLDivElement', function () {
        const example = 'test-id';
        const subject = mount(withElements(<ElementClass id={example} />)).find(ElementClass);

        expect(subject.getDOMNode().getAttribute('id')).toBe(example);
      });
    });

    describe('[className]', function () {
      it('sets the class attribute of the wrapping HTMLDivElement', function () {
        const example = 'test-class-name test-class-name-2';
        const subject = mount(withElements(<ElementClass className={example} />)).find(ElementClass);

        expect(subject.getDOMNode().getAttribute('class')).toBe(example);
      });
    });

    describe('[style]', function () {
      it(`is passed on to the underlying recurly.Elements#${elementClassName}`, function () {
        const example = { arbitrary: 'style-values', fontSize: '1000000px' };
        const MockComponent = props => withElements(<ElementClass {...props} />);
        const subject = mount(<MockComponent />);
        const spy = jest.spyOn(
          subject.find(ElementClass).instance()._element,
          'configure'
        ).mockImplementation(() => {});

        subject.setProps({ style: example });

        expect(spy).toHaveBeenCalledWith({ style: example });
      });
    });

    describe('[tabIndex]', function () {
      it(`sets the tabIndex attribute of the recurly.Elements#${elementClassName}#iframe`, function () {
        const example = '999';
        const subject = mount(withElements(<ElementClass tabIndex={example} />)).find(ElementClass);

        expect(subject.getDOMNode().querySelector('iframe').getAttribute('tabIndex')).toBe(example);
      });
    });

    describe('[...props]', function () {
      it(`passes other properties on to the recurly.Elements#${elementClassName}`, function () {
        const example = { arbitrary: Infinity, values: /really/ };
        const MockComponent = props => withElements(<ElementClass {...props} />);
        const subject = mount(<MockComponent />);
        const spy = jest.spyOn(
          subject.find(ElementClass).instance()._element,
          'configure'
        ).mockImplementation(() => {});

        subject.setProps(example);

        expect(spy).toHaveBeenCalledWith({ style: {}, ...example });
      });
    });

    describe('event handlers', function () {
      const example = { arbitrary: 'values' };

      it('does nothing by default', function () {
        const fixture = mount(withElements(<ElementClass />)).find(ElementClass);
        expect(() => {
          fixture.instance()._element.emit('attach', example);
          fixture.instance()._element.emit('change', example);
          fixture.instance()._element.emit('blur', example);
          fixture.instance()._element.emit('focus', example);
          fixture.instance()._element.emit('submit', example);
        }).not.toThrow();
      });

      [
        ['onReady', 'attach'],
        ['onChange', 'change'],
        ['onBlur', 'blur'],
        ['onFocus', 'focus'],
        ['onSubmit', 'submit']
      ].forEach(([prop, event]) => {
        describe(`[${prop}]`, function () {
          it(`is called when recurly.Elements#${elementClassName} emits '${event}'`, function () {
            const subject = jest.fn();
            const fixture = mount(withElements(<ElementClass {...{[prop]: subject}} />)).find(ElementClass);
            fixture.instance()._element.emit(event, example);
            expect(subject).toHaveBeenCalledWith(example);
          });
        });
      });
    });
  });
}
