const mockAxios = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;

// export default {
//   get: jest.fn(() => Promise.resolve({ data: {} })),
//   put: jest.fn(() => Promise.resolve({ data: {} })),
//   post: jest.fn(() => Promise.resolve({ data: {} })),
//   delete: jest.fn(() => Promise.resolve({ data: {} })),
//   defaults: { headers: { common: {} } },
// };
