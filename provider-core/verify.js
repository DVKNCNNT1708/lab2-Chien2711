const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
require('./server'); // Khởi động server API

const opts = {
  providerBaseUrl: 'http://localhost:8080',
  // Chỉ đường dẫn tới file hợp đồng đã sinh ra ở Bước 1
  pactUrls: [path.resolve(process.cwd(), '../pacts/iot-service-core-service.json')],
  provider: 'core-service'
};

console.log('Đang verify hợp đồng...');

new Verifier(opts).verifyProvider()
  .then(() => {
    console.log('✅ Verify THÀNH CÔNG! Core API đã tuân thủ đúng hợp đồng.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ Verify THẤT BẠI!');
    console.error(error);
    process.exit(1);
  });