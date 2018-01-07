const websocket = {
  develop: 'localhost:13001',
  product: '',
};

export const host = websocket[ENV];
