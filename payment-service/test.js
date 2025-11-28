const request = require('supertest');
const app = require('./src/app');
request(app).get('/health').expect(200).end((err,res)=>{
  if(err){ console.error(err); process.exit(1); }
  console.log('payment-service health OK');
  process.exit(0);
});
