import { Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

const options = {
  path: '/sessionws',
  cors: true,
}

@WebSocketGateway(options)
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  private logger: Logger = new Logger('SessionGateway')

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Message from client: ${client.id}`, payload)
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: string): void {
    this.logger.log(`Client ${client.id} trying to join room with ${payload} id`)
    client.join(payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  @OnEvent('match')
  handleMatches(data: any) {
    const { restaurantId, sessionId } = data
    this.logger.log(`Match happened in ${sessionId} for ${restaurantId}`)
    this.server.to(sessionId).emit('match', { restaurantId: restaurantId })
  }
}
