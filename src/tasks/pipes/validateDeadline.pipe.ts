import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import * as momenttz from 'moment-timezone';

const TIMEZONE = 'America/Buenos_Aires';

@Injectable()
export class ValidateDeadline implements PipeTransform {
  transform(task: CreateTaskDto, metadata: ArgumentMetadata) {
    const { deadline } = task;
    const now = momenttz.tz(TIMEZONE);

    const deadlineMoment = this.convertDeadline(deadline);

    if (deadlineMoment.isBefore(now)) {
      throw new BadRequestException('Deadline cannot be before current datetime');
    }

    return task;
  }

  /**
   * This method ensures that the date submitted by the user is not
   * modified by momentjs.
   * Since deadline field comes as UTC, we want to assume that
   * users can send datetime without having to specify their
   * timezone, so we don't want momentjs to subtract hours from
   * the date that the user is currently sending.
   * @param deadline: date ISO8601 
   * @returns Moment
   */
  convertDeadline(deadline: string) {
    let deadlineMoment = momenttz(deadline, TIMEZONE);
    const utcOffset = deadlineMoment.utcOffset();

    if (utcOffset < 0) {
      deadlineMoment = deadlineMoment.subtract(utcOffset, 'minutes')
    } else {
      deadlineMoment = deadlineMoment.add(utcOffset, 'minutes');
    }

    return deadlineMoment;
  }
}
