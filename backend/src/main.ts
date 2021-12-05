import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from '@nestjs/platform-socket.io'
import * as dotenv from 'dotenv'
import { AllExceptionsFilter } from './exceptions/all.exceptions.filter'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalFilters(new AllExceptionsFilter())

  app.useWebSocketAdapter(new IoAdapter(app))

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
