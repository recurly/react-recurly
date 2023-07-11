import React from 'react';
import { render } from '@testing-library/react';
import { suppressConsoleErrors, withElements } from './helpers';

/**
 * Constructs a test suite for an Element class
 *
 * Asserts behaviors on behalf of the Element abstract class
 */
export function ElementSuite (ElementClass) {
  const { elementClassName } = ElementClass;
  const getElementInstanceFor = ({ _element }) => _element;

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
        let subject;

        render(withElements(<ElementClass ref={ref => subject = ref} />));

        expect(getElementInstanceFor(subject)).toBeInstanceOf(
          window.recurly.Elements()[elementClassName]().constructor
        );

        expect(subject._container.current.querySelector('iframe')).toBe(getElementInstanceFor(subject).iframe);
      });

      describe('when unmounted', function () {
        it(`destroys the underlying recurly.Elements#${elementClassName}`, function () {
          let subject;

          const renderedSubject = render(withElements(<ElementClass ref={ref => subject = ref} />));

          const spy = jest.spyOn(
            getElementInstanceFor(subject),
            'destroy'
          ).mockImplementation(() => {});

          renderedSubject.unmount();

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    describe('[id]', function () {
      it('sets the id attribute of the wrapping HTMLDivElement', function () {
        const example = 'test-id';
        const subject = render(withElements(<ElementClass id={example} />)).container.firstChild;

        expect(subject.getAttribute('id')).toBe(example);
      });
    });

    describe('[className]', function () {
      it('sets the class attribute of the wrapping HTMLDivElement', function () {
        const example = 'test-class-name test-class-name-2';
        const subject = render(withElements(<ElementClass className={example} />)).container.firstChild;

        expect(subject.getAttribute('class')).toBe(example);
      });
    });

    describe('[style]', function () {
      it(`is passed on to the underlying recurly.Elements#${elementClassName}`, function () {
        let subject;
        const example = { arbitrary: 'style-values', fontSize: '1000000px' };
        const MockComponent = props => withElements(<ElementClass {...props} ref={ref => subject = ref} />);
        const { rerender } = render(<MockComponent />);

        const spy = jest.spyOn(
          getElementInstanceFor(subject),
          'configure'
        ).mockImplementation(() => {});

        rerender(<MockComponent style={example} />);

        expect(spy).toHaveBeenCalledWith({ style: example });
      });
    });

    describe('[tabIndex]', function () {
      it(`sets the tabIndex attribute of the recurly.Elements#${elementClassName}#iframe`, function () {
        const example = '999';
        const subject = render(withElements(<ElementClass tabIndex={example} />)).container.querySelector('iframe');

        expect(subject.getAttribute('tabIndex')).toBe(example);
      });
    });

    describe('[...props]', function () {
      it(`passes other properties on to the recurly.Elements#${elementClassName}`, function () {
        let subject;
        const MockComponent = props => withElements(<ElementClass {...props} ref={ref => subject = ref} />);
        const { rerender } = render(<MockComponent />);

        const spy = jest.spyOn(
          getElementInstanceFor(subject),
          'configure'
        ).mockImplementation(() => {});

        rerender(<MockComponent arbitrary={Infinity} values={/really/} />);

        expect(spy).toHaveBeenCalledWith({ style: {}, arbitrary: Infinity, values: /really/ });
      });
    });

    describe('event handlers', function () {
      const example = { arbitrary: 'values' };

      it('does nothing by default', function () {
        let fixture;

        render(withElements(<ElementClass ref={ref => fixture = ref} />));

        expect(() => {
          getElementInstanceFor(fixture).emit('attach', example);
          getElementInstanceFor(fixture).emit('change', example);
          getElementInstanceFor(fixture).emit('blur', example);
          getElementInstanceFor(fixture).emit('focus', example);
          getElementInstanceFor(fixture).emit('submit', example);
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
            let fixture;

            render(withElements(<ElementClass {...{[prop]: subject}} ref={ref => fixture = ref} />));

            getElementInstanceFor(fixture).emit(event, example);
            expect(subject).toHaveBeenCalledWith(example);
          });
        });
      });
    });
  });
}
