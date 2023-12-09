import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService : UserService){}

  async getMain(userID: number){
    const user = await this.userService.getUserById(userID,{
      orders:{
        select:{
          items: true,
        }
      }
    })

    
    return[
      {
        name:'Total users',
        value: user._count
      },
      {
        name:'Orders',
        value: user.orders.length
      }
    ]

  }
}
