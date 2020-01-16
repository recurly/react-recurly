/**
 * This method deactivates the virtual console error method.
 * Useful when we expect a test to produce errors.
 */

export function suppressConsoleErrors () {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });
}
