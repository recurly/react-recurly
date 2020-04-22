// Need to import 'regenerator-runtime/runtime' here instead of in
// jest.setup.js, otherwise, import 'recurly.js/test/server' fails because
// it uses async/await.
require('regenerator-runtime/runtime');
require('recurly.js/test/server');
export default async function () {}
