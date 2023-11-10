import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {UsersService} from "@/modules/users/services/users.service";

@WebSocketGateway({ cors: true })
export class LoginGateway {
  @WebSocketServer() private server: any;

  constructor(private usersService: UsersService) {
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    const user = await this.usersService.findOne(payload);
    this.server.emit('message', user?.name + ' has logged in');

    return 'message sent';
  }
}
