import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';

const options = {
  path: '/session',
  cors: true
};

@WebSocketGateway(options)
export class SessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  private logger: Logger = new Logger('SessionGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Message from client: ${client.id}`);
    this.logger.log(payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @OnEvent('match')
  handleMatches(data: any) {
    this.server.emit('msgToClient', { event: 'match',  data });
    this.logger.log(data);
  }
}
