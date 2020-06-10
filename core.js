const fetch = require("node-fetch");

// Gets current IP address
const getIPAddr = async () => {
  res = await fetch("http://icanhazip.com");
  body = (await res.text()).trim();

  return body;
};

// Prints out IP address
(async () => {
  console.log(await getIPAddr());
})();
