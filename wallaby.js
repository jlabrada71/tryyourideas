export default function () {
  return {
    files: [
      'src/**/*.js' // adjust if required
    ],

    tests: [
      'tests/**/*.spec.js' // adjust if required
    ],

    env: {
      type: 'node',
      runner: '/home/jlabrada/.nvm/versions/node/v16.20.0/bin/node',
      params: {
        runner: '--experimental-vm-modules'
      }
    }
  };
}
