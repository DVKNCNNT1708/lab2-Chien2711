const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios');
const path = require('path');

// 1. Cấu hình Pact (Định nghĩa ai gọi ai)
const provider = new PactV3({
  consumer: 'iot-service',
  provider: 'core-service',
  dir: path.resolve(process.cwd(), '../pacts') // File JSON sinh ra sẽ lưu ở folder 'pacts' bên ngoài
});

describe('IoT to Core Contract', () => {
  it('sends sensor data successfully', () => {
    
    // 2. Định nghĩa hợp đồng đàm phán
    provider
      .uponReceiving('a request to save sensor data')
      .withRequest({
        method: 'POST',
        path: '/api/data',
        headers: { 'Content-Type': 'application/json' },
        body: { deviceId: 'sensor-01', temp: 25 }
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: MatchersV3.like('Data received successfully') }
      });

    // 3. Chạy test giả lập
    return provider.executeTest(async (mockServer) => {
      const response = await axios.post(`${mockServer.url}/api/data`, {
        deviceId: 'sensor-01',
        temp: 25
      });
      expect(response.data.message).toEqual('Data received successfully');
    });
  });
});