import { getData, editItem } from '../store/table.actions';
import axios from 'axios';
jest.mock('axios');

describe('getData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',

          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});

describe('200 test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return data if status code equals 200', async () => {
    const mRes = { status: 200, data: 'fake data' };
    axios.mockResolvedValueOnce(mRes);
  });
});
