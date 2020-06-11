const fetch = require("node-fetch");

const CF_API_TOKEN = process.env.CF_API_TOKEN;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN;

// Gets current IP address
const getIPAddr = async () => {
  res = await fetch("https://icanhazip.com");
  body = (await res.text()).trim();

  return body;
};

// Get DNS Zone ID
async function getDNSZoneID(root_domain) {
  const params = new URLSearchParams();
  params.append("name", root_domain);

  res = await fetch("https://api.cloudflare.com/client/v4/zones?" + params, {
    headers: {
      Authorization: CF_API_TOKEN,
    },
  });
  body = await res.json();

  zone_id = body.result[0].id;

  return zone_id;
}

// Get DNS Record (currently only tests API endpoint)
async function getDNSRec(zone_id) {
  res = await fetch(
    "https://api.cloudflare.com/client/v4/zones/" + zone_id + "/dns_records",
    {
      headers: {
        Authorization: CF_API_TOKEN,
      },
    }
  );
  body = await res.json();

  dns_recs = body.result;

  return dns_recs;
}

// Prints out IP address + CF Zone ID
(async () => {
  const CUR_IP_ADDR = await getIPAddr();
  console.log("Public IP: " + CUR_IP_ADDR);

  const ZONE_ID = await getDNSZoneID(ROOT_DOMAIN);
  console.log("CF Zone ID: " + ZONE_ID);

  const DNS_RECS = await getDNSRec(ZONE_ID);
  console.log("DNS Records: " + DNS_RECS);
})();
