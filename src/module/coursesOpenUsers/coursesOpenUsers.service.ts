import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CourseEntity } from 'src/entities/course.entity';
import { CoursesOpenUsers } from 'src/entities/course_open_users.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserTakeWorkbook } from 'src/entities/user_take_workbook.entity';
import { Workbook } from 'src/entities/workbook.entity';
import { CreateCourseOpenDto } from './dto/create-course-open-users.dto';

@Injectable()
export class CoursesOpenService {

   async create(createCourseopenUser: CreateCourseOpenDto) {
     
    
    const user: UserEntity = await UserEntity.findOne({
      where: {
        user_id: createCourseopenUser.userId
      }
    }).catch((e) => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if(!user){
      return new HttpException('User not found' , HttpStatus.NOT_FOUND)
    }



    const course: CourseEntity = await CourseEntity.findOne({
      where: {
       course_id : createCourseopenUser.courseId
      }
    }).catch((e) => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if(!course){
      return new HttpException('Course not found' , HttpStatus.NOT_FOUND)
    }


    const userbyCourse = CoursesOpenUsers.findOne({
      where:{  
        user_id:{
          user_id: user.user_id
        },
        course_id: {
          course_id : course.course_id
        }
      }
      
    })
    if(userbyCourse){
      return 'User alredy buy course' 
    }

    if(user && course ){

      const workbook : Workbook[]  = await Workbook.find({
        where : {
          workbook_course: {
            course_id: course.course_id
          }
        },
        relations : {
          workbook_course : true
        },
        select : {
          workbook_course: {
            course_id: true
          }
        }
        
      }).catch((e) => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });

      
      const CoursesOpenUser  = await CoursesOpenUsers
    .createQueryBuilder()
    .insert()
    .into(CoursesOpenUsers)
    .values({
      user_id: user,
      course_id:course
    })
    .returning('*')
    .execute()
    .catch((e) => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });
    
    workbook.map(async e => {
      await  UserTakeWorkbook
      .createQueryBuilder()
      .insert()
      .into(UserTakeWorkbook)
      .values({
        utw_connection: CoursesOpenUser.raw[0].create_data,
        utw_active: true,
        workbook_id: e.workbook_id as any,
        user_id: user
      })
      .execute().catch((e) => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
    })
    
    return 'The user has purchased a course'
  } else {
    return new HttpException('User or Course not found' , HttpStatus.NOT_FOUND)
  }
    
  }
  
  async findAll() {
    const users =await CoursesOpenUsers.find({
      relations: {
        user_id:true ,
        course_id:true
      }
    })

    console.log(await users[0].create_data);
    
    return users
  }



}
