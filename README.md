# 🌍 simple-ddns

Automated Cloudflare DNS updates for Dynamic IPs.

simple-dns is a Node.js re-write of [DDNS-Cloudflare](https://github.com/prechuthan/DDNS-CloudFlare).

## 🐣 Dependencies

- Node.js (tested on `v14.5.0`)

## 💻 Setup

### Run `npm install` to download all node dependencies.

```
$ npm install
```

### Ensure that `.env` file is present in the same directory with the following variables:

- **CF_API_TOKEN** - Cloudflare API key required for updating Cloudflare DNS
- **ROOT_DOMAIN** - Root domain name
- **DDNS_DOMAIN** - Domain name to be updated when IP address changes

```
# Example .env file should look like this

CF_API_TOKEN="xxxx-xxxx-xxxx"
ROOT_DOMAIN="domain.com"
DDNS_DOMAIN="dynamicdns.domain.com"
```

### Setup `core.js` cron for scheduled runs

```
# Example crontab to ensure core.js is run every minute

* * * * *    /path/to/nodejs    /path/to/core.js
```

Read [this](https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/) for more info about cron.

## 💥 Known Issues

#### Version 1.0

- Unexpected behaviour if unable to get current public IP address
- Exception thrown if unable to search for _ROOT_DOMAIN_ or _DDNS_DOMAIN_ in Cloudflare

## 🎉 Contribute

Want to contribute to this project? Simply open an issue and send in a PR! 😃
