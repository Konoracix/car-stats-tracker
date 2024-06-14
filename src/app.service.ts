import { Injectable } from '@nestjs/common';
import db from 'db/db';

@Injectable()
export class AppService {
  getHello(): string {
    db;
    return 'Hello World!';
  }
}
