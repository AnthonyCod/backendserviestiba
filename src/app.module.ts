import { QuotationModule } from './modules/quotation/config/quotation.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/user/users.module';

@Module({
  imports: [QuotationModule, PrismaModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
