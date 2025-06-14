import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@users/profiles/entities/profile.entity';
import { isNil } from '@util/isNil';
import { Response } from 'express';
import sharp from 'sharp';
import { Repository } from 'typeorm';
import { QueryGetProfileImageDto } from './dto/query-get-profile-image.dto';

@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOneByFilename(
    res: Response,
    query: QueryGetProfileImageDto,
    profileFilename: string,
  ) {
    const { type, quality, dimension, responseType } = query;

    const profile = await this.profileRepository.findOne({
      where: { filename: profileFilename },
    });

    if (isNil(profile)) {
      throw new NotFoundException('profile');
    }

    const { originalname, mimetype, buffer, width, height } = profile;

    if (
      !isNil(dimension) &&
      (dimension.width > width || dimension.height > height)
    ) {
      throw new BadRequestException('size over');
    }

    const contentType = type === 'p' ? mimetype : 'application/octet-stream';

    let sharpData = sharp(buffer)
      .withMetadata()
      .toFormat(responseType, { quality });

    sharpData = sharpData.resize(
      dimension?.width ?? width,
      dimension?.height ?? height,
      {
        fit: 'contain',
        withoutEnlargement: true,
      },
    );
    console.log('🚀 ~ StaticService ~ dimension:', dimension);

    res.setHeader('content-type', contentType);
    res.setHeader('content-disposition', `inline; filename="${originalname}"`);

    const touchedBuffer = await sharpData.toBuffer();
    return touchedBuffer;
  }
}
