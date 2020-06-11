const fetch = require("node-fetch");

// Gets current IP address
const getIPAddr = async () => {
  res = await fetch("https://icanhazip.com");
  body = (await res.text()).trim();

  return body;
};

// Get DNS Zone ID
const getDNSZoneID = async () => {
  const params = new URLSearchParams();
  params.append("name", process.env.ROOT_DOMAIN);

  res = await fetch("https://api.cloudflare.com/client/v4/zones?" + params, {
    headers: {
      Authorization: process.env.CF_API_TOKEN,
    },
  });
  body = await res.json();

  zone_id = body.result[0].id;

  return zone_id;
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

// Prints out IP address + CF Zone ID
(async () => {
  console.log("Public IP: " + (await getIPAddr()));
  console.log("CF Zone ID: " + (await getDNSZoneID()));
  // console.log(await getDNSRec());
})();
