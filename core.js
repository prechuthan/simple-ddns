const fetch = require("node-fetch");

// Gets current IP address
const getIPAddr = async () => {
  res = await fetch("https://icanhazip.com");
  body = (await res.text()).trim();

  return body;
};

// Get DNS Record (currently only tests API endpoint)
const getDNSRec = async () => {
  res = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
    headers: {
      Authorization: process.env.CF_API_TOKEN,
    },
  });
  body = await res.json();

  return body;
};

// Prints out IP address + DNS Record (currently only tests API endpoint)
(async () => {
  console.log(await getIPAddr());
  console.log(await getDNSRec());
})();
