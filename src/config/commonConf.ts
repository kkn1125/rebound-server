import { VERSION } from '@common/variables/constants';
import {
  EXTERNAL_URL,
  HOST,
  PORT,
  SERVER_URL,
} from '@common/variables/environments';
import { registerAs } from '@nestjs/config';

const commonConf = {
  host: HOST,
  port: PORT,
  version: VERSION,
  serverUrl: SERVER_URL,
  externalUrl: EXTERNAL_URL,
};

export default registerAs('common', () => commonConf);

export type CommonConf = (...args: any) => typeof commonConf;
