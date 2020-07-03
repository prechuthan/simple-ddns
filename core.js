const fetch = require("node-fetch");

const ENV_VARS = new Map([
  ["CF_API_TOKEN", process.env.CF_API_TOKEN],
  ["ROOT_DOMAIN", process.env.ROOT_DOMAIN],
  ["DDNS_DOMAIN", process.env.DDNS_DOMAIN],
]);

// Check if env vars are present
function checkEnvVars(ENV_VARS) {
  let validated = true;

  for (const [env_var, value] of ENV_VARS) {
    if (!value) {
      console.log(
        `[!] Environment variable ${env_var} is not set, current value is ${value}.`
      );
      validated = false;
    }
  }

  if (!validated) {
    console.log("[X] Please ensure environment variables are set.");
    process.exit(9);
  }
}

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
      Authorization: ENV_VARS.get(CF_API_TOKEN),
    },
  });
  body = await res.json();

  zone_id = body.result[0].id;

  return zone_id;
}

// Get DNS Records for a given zone_id
async function getDNSRecs(zone_id) {
  res = await fetch(
    "https://api.cloudflare.com/client/v4/zones/" + zone_id + "/dns_records",
    {
      headers: {
        Authorization: ENV_VARS.get(CF_API_TOKEN),
      },
    }
  );
  body = await res.json();

  dns_recs = body.result;

  return dns_recs;
}

// Get DNS Record ID from array of JSON dns records
async function getDNSRecObj(ddns_domain, dns_recs) {
  for (let i = 0; i < dns_recs.length; i++) {
    if (dns_recs[i].name === ddns_domain) {
      return dns_recs[i];
    }
  }

  return null;
}

// Prints out IP address + CF Zone ID + DNS Recs + DNS Rec ID
(async () => {
  checkEnvVars(ENV_VARS);

  const curIPAddr = await getIPAddr();
  console.log(`Public IP: ${curIPAddr}`);

  const zoneID = await getDNSZoneID(ENV_VARS.get(ROOT_DOMAIN));
  console.log(`CF Zone ID: ${zoneID}`);

  const dnsRecs = await getDNSRecs(zoneID);
  console.log(`DNS Records: ${dnsRecs}`);

  const dnsRecID = await getDNSRecObj(ENV_VARS.get(DDNS_DOMAIN), dnsRecs);
  console.log(`Record ID: ${dnsRecID}`);
})();
