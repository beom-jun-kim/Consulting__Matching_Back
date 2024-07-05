// module.exports = {
//   apps: [
//     {
//       name: 'app',
//       script: './dist/main.js',
//       instance: 3,
//       exec_mode: 'cluster',
//       merge_logs: true,
//       autorestart: true,
//       wait_ready: true,
//       listen_timeout: 50000,
//       kill_timeout: 5000,
//       env_production: {},
//     },
//   ],
// };
module.exports = {
  apps: [
    {
      name: 'app-blue',
      script: './dist/main.js',
      instance: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000, // 블루 인스턴스 포트
      },
      // 기타 설정...
    },
    {
      name: 'app-green',
      script: './dist/main.js',
      instance: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001, // 그린 인스턴스 포트
      },
      // 기타 설정...
    },
  ],
};
