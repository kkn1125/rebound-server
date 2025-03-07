import * as dotenv from 'dotenv';
import * as path from 'path';

export const MODE = process.env.NODE_ENV ?? 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
dotenv.config({
  path: path.join(path.resolve(), `.env.${MODE}`),
});

export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = +(process.env.PORT || 8080);
export const PROTOCOL = PORT === 443 ? 'https://' : 'http://';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY as string;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;
export const SERVER_URL = `${PROTOCOL}${HOST}${[80, 443].includes(PORT) ? '' : `:${PORT}`}`;
export const EXTERNAL_URL = process.env.EXTERNAL_URL ?? 'http://localhost:8080';
