import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import {
  DEFAULT_LOG_CONTEXT,
  LOG_FORMAT,
} from 'src/common/variables/constants';

@Injectable()
export class LoggerService {
  protected context: string = DEFAULT_LOG_CONTEXT;
  protected logLevels = ['log', 'info', 'debug', 'warn', 'error'] as const;
  protected logIcons = ['📝', '✨', '🐛', '🚨', '❌'];

  log!: (...message: unknown[]) => void;
  info!: (...message: unknown[]) => void;
  debug!: (...message: unknown[]) => void;
  warn!: (...message: unknown[]) => void;
  error!: (...message: unknown[]) => void;

  constructor() {
    this.update();
  }

  setContext<T extends object | string>(context: T) {
    if (typeof context === 'string') {
      this.context = context;
    } else {
      this.context = context.constructor.name;
    }
    this.update();
  }

  update() {
    this.bindConsoleFeatures();
  }

  private bindConsoleFeatures() {
    for (const logLevel of this.logLevels) {
      Object.defineProperty(this, logLevel, {
        get: /* istanbul ignore next */ () => {
          return console[logLevel].bind(
            this,
            `[${this.context}] ${this.timestamp} `,
          ) as void;
        },
      });
    }
  }

  /* istanbul ignore next */
  private get timestamp() {
    return dayjs().format(LOG_FORMAT);
  }
}
