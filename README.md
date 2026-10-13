# Customer Service in Digital Channels

Angular frontend and NestJS services for authentication, AI-assisted responses, email notifications, queries and tickets. Data is stored in MongoDB.

## Local development

1. Configure each `backend/ms-*/.env` using the keys read in that service's module and `main.ts`. Supply your own MongoDB, JWT, OpenAI, Google OAuth/SMTP and social-network credentials; do not commit credentials.
2. For Compose, use `mongodb://mongodb:27017/digital-channel` and service names for inter-service hosts. Match the TCP ports in the environment files. HTTP mappings are auth 8080, AI 8081, queries 8083; notifications uses TCP on 8082.
3. Run `docker compose -f docker-compose-dev.yaml up --build`. Stop with `docker compose -f docker-compose-dev.yaml down`.
4. The frontend is not enabled in Compose. Set `authUrl` and `ticketUrl` in `frontend/src/environments/environment.ts` to your local HTTP services, then run `npm ci` and `npm start` from `frontend/`. Open http://localhost:4200.

## Checks

In each backend service: `npm ci`, `npm run build`, `npm test -- --runInBand`; integration checks use `npm run test:e2e` and require the service configuration/dependencies.
In `frontend/`: `npm run build`, `npm test -- --watch=false --browsers=ChromeHeadless` (Chrome required). No e2e runner is configured.
Production container definitions are in `docker-compose-prod.yaml`; configure their environment before use.

Backend packages are UNLICENSED; Nest itself is MIT licensed.
