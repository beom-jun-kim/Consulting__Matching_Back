import {
  ArgumentMetadata,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  PipeTransform,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BuildupService } from '../service/buildup.service';
import { ApiOperation } from '@nestjs/swagger';
import { SaveBuildUpBmdsDto } from '../dtos/saveBuildUpBmds.dto';
import { BuildUpBmds } from '../entities/buildUpBmds.entity';
import { SaveBuildStep11Dto } from '../dtos/saveBuildStep11.dto';
import { BuildStep11 } from '../entities/buildStep11.entity';
import { SaveBuildStep12Dto } from '../dtos/saveBuildStep12.dto';
import { BuildStep12 } from '../entities/buildStep12.entity';
import { SaveBuildStep13Dto } from '../dtos/saveBuildStep13.dto';
import { SaveBuildStep14Dto } from '../dtos/saveBuildStep14.dto';
import { SaveBuildStep15Dto } from '../dtos/saveBuildStep15.dto';
import { SaveBuildStep21Dto } from '../dtos/saveBuildStep21.dto';
import { SaveBuildStep22Dto } from '../dtos/saveBuildStep22.dto';
import { SaveBuildStep23Dto } from '../dtos/saveBuildStep23.dto';
import { SaveBuildStep24Dto } from '../dtos/saveBuildStep24.dto';
import { SaveBuildStep25Dto } from '../dtos/saveBuildStep25.dto';
import { SaveBuildStep31Dto } from '../dtos/saveBuildStep31.dto';
import { SaveBuildStep32Dto } from '../dtos/saveBuildStep32.dto';
import { SaveBuildStep33Dto } from '../dtos/saveBuildStep33.dto';
import { SaveBuildStep34Dto } from '../dtos/saveBuildStep34.dto';
import { BuildStep13 } from '../entities/buildStep13.entity';
import { BuildStep14 } from '../entities/buildStep14.entity';
import { BuildStep15 } from '../entities/buildStep15.entity';
import { BuildStep21 } from '../entities/buildStep21.entity';
import { BuildStep22 } from '../entities/buildStep22.entity';
import { BuildStep23 } from '../entities/buildStep23.entity';
import { BuildStep24 } from '../entities/buildStep24.entity';
import { BuildStep25 } from '../entities/buildStep25.entity';
import { BuildStep31 } from '../entities/buildStep31.entity';
import { BuildStep32 } from '../entities/buildStep32.entity';
import { BuildStep33 } from '../entities/buildStep33.entity';
import { BuildStep34 } from '../entities/buildStep34.entity';
import { SaveBuildStep36Dto } from '../dtos/SaveBuildStep36.dto';
import { BuildStep36 } from '../entities/buildStep36.entity';
import { BuildStep35 } from '../entities/buildStep35.entity';
import { SaveBuildStep35Dto } from '../dtos/saveBuildStep35.dto';
import { SaveBuildStep37Dto } from '../dtos/saveBuildStep37.dto';
import { BuildStep37 } from '../entities/buildStep37.entity';
import { SaveBuildStep41Dto } from '../dtos/saveBuildStep41.dto';
import { BuildStep41 } from '../entities/buildStep41.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { BuildStep42 } from '../entities/buildStep42.entity';
import { SaveBuildStep43Dto } from '../dtos/saveBuildStep43.dto';
import { SaveBuildStep44Dto } from '../dtos/saveBuildStep44.dto';
import { SaveBuildStep51Dto } from '../dtos/saveBuildStep51.dto';
import { BuildStep43 } from '../entities/buildStep43.entity';
import { BuildStep44 } from '../entities/buildStep44.entity';
import { BuildStep51 } from '../entities/buildStep51.entity';
import { SaveBuildStep52Dto } from '../dtos/saveBuildStep52.dto';
import { BuildStep52 } from '../entities/buildStep52.entity';
import { SaveBuildStep53Dto } from '../dtos/saveBuildStep53.dto';
import { SaveBuildStep54Dto } from '../dtos/saveBuildStep54.dto';
import { BuildStep53 } from '../entities/buildStep53.entity';
import { BuildStep54 } from '../entities/buildStep54.entity';
import { SaveBuildStep55Dto } from '../dtos/saveBuildStep55.dto';
import { SaveBuildStep56Dto } from '../dtos/saveBuildStep56.dto';
import { SaveBuildStep57Dto } from '../dtos/saveBuildstep57.dto';

import { SaveBuildStep59Dto } from '../dtos/saveBuildStep59.dto';
import { SaveBuildStep58Dto } from '../dtos/saveBuildstep58.dto';
import { BuildStep55 } from '../entities/buildStep55.entity';
import { BuildStep56 } from '../entities/buildStep56.entity';
import { BuildStep57 } from '../entities/buildStep57.entity';
import { BuildStep58 } from '../entities/buildStep58.entity';
import { BuildStep59 } from '../entities/buildStep59.entity';
import { BuildStep60 } from '../entities/buildStep60.entity';
import { SaveBuildStep61Dto } from '../dtos/saveBuildStep61.dto';
import { BuildStep61 } from '../entities/buildStep61.entity';
import { SaveBuildStep62Dto } from '../dtos/saveBuildStep62.dto';
import { BuildStep62 } from '../entities/buildStep62.entity';
import { SaveBuildStep63Dto } from '../dtos/saveBuildStep63.dto';
import { SaveBuildStep71Dto } from '../dtos/saveBuildStep71.dto';
import { SaveBuildStep72Dto } from '../dtos/saveBuildStep72.dto';
import { SaveBuildStep73Dto } from '../dtos/saveBuildStep73.dto';
import { SaveBuildStep74Dto } from '../dtos/saveBuildStep74.dto';
import { BuildStep63 } from '../entities/buildStep63.entity';
import { BuildStep71 } from '../entities/buildStep71.entity';
import { BuildStep72 } from '../entities/buildStep72.entity';
import { BuildStep73 } from '../entities/buildStep73.entity';
import { BuildStep74 } from '../entities/buildStep74.entity';
import { SaveBuildStep34_2Dto } from '../dtos/saveBuildStep34_2.dto';
import { BuildStep34_2 } from '../entities/buildStep34_2.entity';
import { SaveBuildStep35OneDto } from '../dtos/saveBuildStep35One.dto';
import { BuildStep35One } from '../entities/buildStep35One.entity';
import { BuildUpReview } from '../entities/buildReview.entity';
import { SaveReviewDto } from '../dtos/saveReview.dto';
import { SaveBuildStep42Dto } from '../dtos/saveBuildStep42.dto';
import { SaveBuildStep60Dto } from '../dtos/saveBuildStep60.dto';

class OptionalParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value === undefined ? value : parseInt(value, 10);
  }
}

@Controller('api/buildup')
export class BuildupController {
  constructor(private readonly buildupService: BuildupService) {}

  @ApiOperation({ summary: 'Create BuildUpBmds' })
  @Post('/bmds/create/:id')
  @UsePipes(new ValidationPipe())
  async createBuildUpBmds(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildUpBmdsDto,
  ): Promise<BuildUpBmds> {
    return await this.buildupService.createBuildUpBmds(id, dto);
  }

  @ApiOperation({ summary: 'Update BuildUpBmds' })
  @Put('/bmds/update/:id')
  @UsePipes(new ValidationPipe())
  async updateBuildUpBmds(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildUpBmdsDto,
  ): Promise<BuildUpBmds> {
    console.log('updateBuildUpBmds', id, dto);
    return await this.buildupService.updateBuildUpBmds(id, dto);
  }

  @ApiOperation({ summary: 'Delete BuildUpBmds' })
  @Delete('/bmds/delete/:id')
  async deleteBuildUpBmds(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.buildupService.deleteBuildUpBmds(id);
  }

  @ApiOperation({ summary: 'Save BuildStep11' })
  @Post('/bmds/11/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep11(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep11Dto,
  ): Promise<BuildStep11> {
    return await this.buildupService.saveBuildStep11(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep12' })
  @Post('/bmds/12/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep12(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep12Dto,
  ): Promise<BuildStep12> {
    return await this.buildupService.saveBuildStep12(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep13' })
  @Post('/bmds/13/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep13(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep13Dto,
  ): Promise<BuildStep13> {
    return await this.buildupService.saveBuildStep13(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep14' })
  @Post('/bmds/14/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep14(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep14Dto,
  ): Promise<BuildStep14> {
    return await this.buildupService.saveBuildStep14(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep15' })
  @Post('/bmds/15/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep15(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep15Dto,
  ): Promise<BuildStep15> {
    return await this.buildupService.saveBuildStep15(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep21' })
  @Post('/bmds/21/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep21(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep21Dto,
  ): Promise<BuildStep21> {
    return await this.buildupService.saveBuildStep21(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep22' })
  @Post('/bmds/22/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep22(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep22Dto,
  ): Promise<BuildStep22> {
    return await this.buildupService.saveBuildStep22(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep23' })
  @Post('/bmds/23/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep23(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep23Dto,
  ): Promise<BuildStep23> {
    return await this.buildupService.saveBuildStep23(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep24' })
  @Post('/bmds/24/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep24(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep24Dto,
  ): Promise<BuildStep24> {
    return await this.buildupService.saveBuildStep24(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep25' })
  @Post('/bmds/25/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep25(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep25Dto,
  ): Promise<BuildStep25> {
    return await this.buildupService.saveBuildStep25(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep31' })
  @Post('/bmds/31/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep31(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep31Dto,
  ): Promise<BuildStep31> {
    return await this.buildupService.saveBuildStep31(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep32' })
  @Post('/bmds/32/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep32(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep32Dto,
  ): Promise<BuildStep32> {
    return await this.buildupService.saveBuildStep32(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep33' })
  @Post('/bmds/33/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep33(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep33Dto,
  ): Promise<BuildStep33> {
    return await this.buildupService.saveBuildStep33(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep34' })
  @Post('/bmds/34/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep34(
    @Param('id', ParseIntPipe) id: number,
    @Body() dtos: SaveBuildStep34Dto[],
  ): Promise<BuildStep34[]> {
    return await this.buildupService.saveBuildStep34(dtos, id);
  }

  @ApiOperation({ summary: 'Save BuildStep34_2' })
  @Post('/bmds/34_2/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep34_2(
    @Param('id', ParseIntPipe) id: number,
    @Body() dtos: SaveBuildStep34_2Dto[],
  ): Promise<BuildStep34_2[]> {
    return await this.buildupService.saveBuildStep34_2(dtos, id);
  }

  @ApiOperation({ summary: 'Save BuildStep35' })
  @Post('/bmds/35/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep35(
    @Param('id', ParseIntPipe) id: number,
    @Body() dtos: SaveBuildStep35Dto[],
  ): Promise<BuildStep35[]> {
    return await this.buildupService.saveBuildStep35(dtos, id);
  }

  @ApiOperation({ summary: 'Save BuildStep35One' })
  @Post('/bmds/35one/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep35One(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep35OneDto,
  ): Promise<BuildStep35One> {
    return await this.buildupService.saveBuildStep35One(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep36' })
  @Post('/bmds/36/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep36(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep36Dto,
  ): Promise<BuildStep36> {
    return await this.buildupService.saveBuildStep36(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep37' })
  @Post('/bmds/37/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep37(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep37Dto,
  ): Promise<BuildStep37> {
    return await this.buildupService.saveBuildStep37(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep41' })
  @Post('/bmds/41/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep41(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep41Dto,
  ): Promise<BuildStep41> {
    return await this.buildupService.saveBuildStep41(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep42' })
  @Post('/bmds/42/save/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async saveBuildStep42(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BuildStep42> {
    return await this.buildupService.saveBuildStep42(file, id);
  }

  @ApiOperation({ summary: 'Save BuildStep42 Memo' })
  @Post('/bmds/42/memo/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep42Memo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep42Dto,
  ): Promise<void> {
    return await this.buildupService.saveBuildStep42Memo(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep43' })
  @Post('/bmds/43/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep43(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep43Dto,
  ): Promise<BuildStep43> {
    return await this.buildupService.saveBuildStep43(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep44' })
  @Post('/bmds/44/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep44(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep44Dto,
  ): Promise<BuildStep44> {
    return await this.buildupService.saveBuildStep44(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep51' })
  @Post('/bmds/51/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep51(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep51Dto,
  ): Promise<BuildStep51> {
    return await this.buildupService.saveBuildStep51(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep52' })
  @Post('/bmds/52/save/:id')
  @UseInterceptors(FileInterceptor('file'))
  async saveBuildStep52(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: SaveBuildStep52Dto,
  ): Promise<BuildStep52> {
    return await this.buildupService.saveBuildStep52(file, id, dto);
  }
  @ApiOperation({ summary: 'Save BuildStep52 Memo' })
  @Post('/bmds/52/memo/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep52Memo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep52Dto,
  ): Promise<void> {
    return await this.buildupService.saveBuildStep52Memo(dto, id);
  }
  @ApiOperation({ summary: 'Save BuildStep53' })
  @Post('/bmds/53/save/:id')
  @UseInterceptors(FileInterceptor('file'))
  async saveBuildStep53(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: SaveBuildStep53Dto,
  ): Promise<BuildStep53> {
    console.log('dto', dto);

    return await this.buildupService.saveBuildStep53(file, id, dto);
  }
  @ApiOperation({ summary: 'Save BuildStep53 Memo' })
  @Post('/bmds/53/memo/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep53Memo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep53Dto,
  ): Promise<void> {
    return await this.buildupService.saveBuildStep53Memo(dto, id);
  }
  @ApiOperation({ summary: 'Save BuildStep54' })
  @Post('/bmds/54/save/:id')
  @UseInterceptors(FileInterceptor('file'))
  async saveBuildStep54(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: SaveBuildStep54Dto,
  ): Promise<BuildStep54> {
    return await this.buildupService.saveBuildStep54(file, id, dto);
  }
  @ApiOperation({ summary: 'Save BuildStep54 Memo' })
  @Post('/bmds/54/memo/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep54Memo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep54Dto,
  ): Promise<void> {
    return await this.buildupService.saveBuildStep54Memo(dto, id);
  }
  @ApiOperation({ summary: 'Save BuildStep55' })
  @Post('/bmds/55/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep55(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep55Dto,
  ): Promise<BuildStep55> {
    return await this.buildupService.saveBuildStep55(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep56' })
  @Post('/bmds/56/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep56(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep56Dto,
  ): Promise<BuildStep56> {
    return await this.buildupService.saveBuildStep56(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep57' })
  @Post('/bmds/57/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep57(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep57Dto,
  ): Promise<BuildStep57> {
    return await this.buildupService.saveBuildStep57(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep58' })
  @Post('/bmds/58/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep58(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep58Dto,
  ): Promise<BuildStep58> {
    return await this.buildupService.saveBuildStep58(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep59' })
  @Post('/bmds/59/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep59(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep59Dto,
  ): Promise<BuildStep59> {
    return await this.buildupService.saveBuildStep59(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep60' })
  @Post('/bmds/60/save/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async saveBuildStep60(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BuildStep60> {
    return await this.buildupService.saveBuildStep60(file, id);
  }
  @ApiOperation({ summary: 'Save BuildStep60 Memo' })
  @Post('/bmds/60/memo/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep60Memo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep60Dto,
  ): Promise<void> {
    return await this.buildupService.saveBuildStep60Memo(dto, id);
  }
  @ApiOperation({ summary: 'Save BuildStep61' })
  @Post('/bmds/61/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep61(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep61Dto,
  ): Promise<BuildStep61> {
    return await this.buildupService.saveBuildStep61(dto, id);
  }

  // @ApiOperation({ summary: 'Save BuildStep62' })
  // @Post('/bmds/62/save/:id')
  // @UseInterceptors(
  //   FilesInterceptor('files', 8, {
  //     fileFilter: (req, file, callback) => {
  //       if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //         return callback(new Error('Only image files are allowed!'), false);
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  // async saveBuildStep62(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: SaveBuildStep62Dto,
  // ): Promise<BuildStep62> {
  //   return this.buildupService.saveBuildStep62(files, id, dto);
  // }

  @ApiOperation({ summary: 'Save BuildStep62' })
  @Post('/bmds/62/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep62(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep62Dto,
  ): Promise<BuildStep62> {
    return await this.buildupService.saveBuildStep62(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep62_1' })
  @Post('/bmds/62/1/save/:id')
  @UseInterceptors(FileInterceptor('file'))
  async saveBuildStep62_1(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BuildStep62> {
    return await this.buildupService.saveBuildStep62_1(file, id);
  }

  @ApiOperation({ summary: 'Save BuildStep63' })
  @Post('/bmds/63/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep63(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep63Dto,
  ): Promise<BuildStep63> {
    return await this.buildupService.saveBuildStep63(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep71' })
  @Post('/bmds/71/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep71(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep71Dto,
  ): Promise<BuildStep71> {
    return await this.buildupService.saveBuildStep71(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep72' })
  @Post('/bmds/72/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep72(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep72Dto,
  ): Promise<BuildStep72> {
    return await this.buildupService.saveBuildStep72(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep73' })
  @Post('/bmds/73/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep73(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep73Dto,
  ): Promise<BuildStep73> {
    return await this.buildupService.saveBuildStep73(dto, id);
  }

  @ApiOperation({ summary: 'Save BuildStep74' })
  @Post('/bmds/74/save/:id')
  @UsePipes(new ValidationPipe())
  async saveBuildStep74(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveBuildStep74Dto,
  ): Promise<BuildStep74> {
    return await this.buildupService.saveBuildStep74(dto, id);
  }

  @ApiOperation({ summary: 'Get BuildUpBmds' })
  @Get('/bmds/get/:id')
  async getBuildUpBmds(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: BuildUpBmds[]; bmCreationNum: number }> {
    return await this.buildupService.getBuildUpBmds(id);
  }

  @ApiOperation({ summary: 'Get BuildUpBmds by id' })
  @Get('/bmds/getById/:id')
  async getBuildUpBmdsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildUpBmds> {
    return await this.buildupService.getBuildUpBmdsById(id);
  }

  @ApiOperation({ summary: 'Get BuildStep11' })
  @Get('/bmds/11/get/:id')
  async getBuildStep11(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep11> {
    return await this.buildupService.getBuildStep11(id);
  }

  @ApiOperation({ summary: 'Get BuildStep12' })
  @Get('/bmds/12/get/:id')
  async getBuildStep12(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep12> {
    return await this.buildupService.getBuildStep12(id);
  }

  @ApiOperation({ summary: 'Get BuildStep13' })
  @Get('/bmds/13/get/:id')
  async getBuildStep13(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep13> {
    return await this.buildupService.getBuildStep13(id);
  }

  @ApiOperation({ summary: 'Get BuildStep14' })
  @Get('/bmds/14/get/:id')
  async getBuildStep14(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep14> {
    return await this.buildupService.getBuildStep14(id);
  }

  @ApiOperation({ summary: 'Get BuildStep15' })
  @Get('/bmds/15/get/:id')
  async getBuildStep15(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep15> {
    return await this.buildupService.getBuildStep15(id);
  }

  @ApiOperation({ summary: 'Get BuildStep21' })
  @Get('/bmds/21/get/:id')
  async getBuildStep21(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep21> {
    return await this.buildupService.getBuildStep21(id);
  }

  @ApiOperation({ summary: 'Get BuildStep22' })
  @Get('/bmds/22/get/:id')
  async getBuildStep22(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep22> {
    return await this.buildupService.getBuildStep22(id);
  }

  @ApiOperation({ summary: 'Get BuildStep23' })
  @Get('/bmds/23/get/:id')
  async getBuildStep23(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep23> {
    return await this.buildupService.getBuildStep23(id);
  }

  @ApiOperation({ summary: 'Get BuildStep24' })
  @Get('/bmds/24/get/:id')
  async getBuildStep24(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep24> {
    return await this.buildupService.getBuildStep24(id);
  }

  @ApiOperation({ summary: 'Get BuildStep25' })
  @Get('/bmds/25/get/:id')
  async getBuildStep25(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep25> {
    return await this.buildupService.getBuildStep25(id);
  }

  @ApiOperation({ summary: 'Get BuildStep31' })
  @Get('/bmds/31/get/:id')
  async getBuildStep31(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep31> {
    return await this.buildupService.getBuildStep31(id);
  }

  @ApiOperation({ summary: 'Get BuildStep32' })
  @Get('/bmds/32/get/:id')
  async getBuildStep32(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep32> {
    return await this.buildupService.getBuildStep32(id);
  }

  @ApiOperation({ summary: 'Get BuildStep33' })
  @Get('/bmds/33/get/:id')
  async getBuildStep33(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep33> {
    return await this.buildupService.getBuildStep33(id);
  }

  @ApiOperation({ summary: 'Get BuildStep34' })
  @Get('/bmds/34/get/:id')
  async getBuildStep34(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep34[]> {
    return await this.buildupService.getBuildStep34(id);
  }

  @ApiOperation({ summary: 'Get BuildStep34_2' })
  @Get('/bmds/34_2/get/:id')
  async getBuildStep34_2(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep34_2[]> {
    return await this.buildupService.getBuildStep34_2(id);
  }

  @ApiOperation({ summary: 'Get BuildStep35' })
  @Get('/bmds/35/get/:id')
  async getBuildStep35(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep35[]> {
    return await this.buildupService.getBuildStep35(id);
  }

  @ApiOperation({ summary: 'Get BuildStep35One' })
  @Get('/bmds/35one/get/:id')
  async getBuildStep35One(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep35One> {
    return await this.buildupService.getBuildStep35One(id);
  }

  @ApiOperation({ summary: 'Get BuildStep36' })
  @Get('/bmds/36/get/:id')
  async getBuildStep36(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep36> {
    return await this.buildupService.getBuildStep36(id);
  }

  @ApiOperation({ summary: 'Get BuildStep37' })
  @Get('/bmds/37/get/:id')
  async getBuildStep37(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep37> {
    return await this.buildupService.getBuildStep37(id);
  }

  @ApiOperation({ summary: 'Get BuildStep41' })
  @Get('/bmds/41/get/:id')
  async getBuildStep41(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep41> {
    return await this.buildupService.getBuildStep41(id);
  }

  @ApiOperation({ summary: 'Get BuildStep42' })
  @Get('/bmds/42/get/:id')
  async getBuildStep42(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep42> {
    return await this.buildupService.getBuildStep42(id);
  }

  @ApiOperation({ summary: 'Get BuildStep43' })
  @Get('/bmds/43/get/:id')
  async getBuildStep43(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep43> {
    return await this.buildupService.getBuildStep43(id);
  }

  @ApiOperation({ summary: 'Get BuildStep44' })
  @Get('/bmds/44/get/:id')
  async getBuildStep44(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep44> {
    return await this.buildupService.getBuildStep44(id);
  }

  @ApiOperation({ summary: 'Get BuildStep51' })
  @Get('/bmds/51/get/:id')
  async getBuildStep51(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep51> {
    return await this.buildupService.getBuildStep51(id);
  }

  @ApiOperation({ summary: 'Get BuildStep52' })
  @Get('/bmds/52/get/:id')
  async getBuildStep52(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep52> {
    return await this.buildupService.getBuildStep52(id);
  }

  @ApiOperation({ summary: 'Get BuildStep53' })
  @Get('/bmds/53/get/:id')
  async getBuildStep53(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep53> {
    return await this.buildupService.getBuildStep53(id);
  }

  @ApiOperation({ summary: 'Get BuildStep54' })
  @Get('/bmds/54/get/:id')
  async getBuildStep54(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep54> {
    return await this.buildupService.getBuildStep54(id);
  }

  @ApiOperation({ summary: 'Get BuildStep55' })
  @Get('/bmds/55/get/:id')
  async getBuildStep55(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep55> {
    return await this.buildupService.getBuildStep55(id);
  }

  @ApiOperation({ summary: 'Get BuildStep56' })
  @Get('/bmds/56/get/:id')
  async getBuildStep56(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep56> {
    return await this.buildupService.getBuildStep56(id);
  }

  @ApiOperation({ summary: 'Get BuildStep57' })
  @Get('/bmds/57/get/:id')
  async getBuildStep57(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep57> {
    return await this.buildupService.getBuildStep57(id);
  }

  @ApiOperation({ summary: 'Get BuildStep58' })
  @Get('/bmds/58/get/:id')
  async getBuildStep58(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep58> {
    return await this.buildupService.getBuildStep58(id);
  }

  @ApiOperation({ summary: 'Get BuildStep59' })
  @Get('/bmds/59/get/:id')
  async getBuildStep59(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep59> {
    return await this.buildupService.getBuildStep59(id);
  }

  @ApiOperation({ summary: 'Get BuildStep60' })
  @Get('/bmds/60/get/:id')
  async getBuildStep60(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep60> {
    return await this.buildupService.getBuildStep60(id);
  }

  @ApiOperation({ summary: 'Get BuildStep61' })
  @Get('/bmds/61/get/:id')
  async getBuildStep61(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep61> {
    return await this.buildupService.getBuildStep61(id);
  }

  @ApiOperation({ summary: 'Get BuildStep62' })
  @Get('/bmds/62/get/:id')
  async getBuildStep62(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep62> {
    return await this.buildupService.getBuildStep62(id);
  }

  @ApiOperation({ summary: 'Get BuildStep63' })
  @Get('/bmds/63/get/:id')
  async getBuildStep63(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep63> {
    return await this.buildupService.getBuildStep63(id);
  }

  @ApiOperation({ summary: 'Get BuildStep71' })
  @Get('/bmds/71/get/:id')
  async getBuildStep71(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep71> {
    return await this.buildupService.getBuildStep71(id);
  }

  @ApiOperation({ summary: 'Get BuildStep72' })
  @Get('/bmds/72/get/:id')
  async getBuildStep72(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep72> {
    return await this.buildupService.getBuildStep72(id);
  }

  @ApiOperation({ summary: 'Get BuildStep73' })
  @Get('/bmds/73/get/:id')
  async getBuildStep73(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep73> {
    return await this.buildupService.getBuildStep73(id);
  }

  @ApiOperation({ summary: 'Get BuildStep74' })
  @Get('/bmds/74/get/:id')
  async getBuildStep74(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildStep74> {
    return await this.buildupService.getBuildStep74(id);
  }

  @ApiOperation({ summary: '리뷰 전체 조회' })
  @Get('/review')
  async getReview(): Promise<BuildUpReview[]> {
    return await this.buildupService.getReview();
  }

  @ApiOperation({ summary: '리뷰 개별 조회' })
  @Get('/review/:id')
  async getOneReview(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildUpReview> {
    return await this.buildupService.getOneReview(id);
  }

  @ApiOperation({ summary: '리뷰 save' })
  @Post('/review/:id')
  async saveReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SaveReviewDto,
  ): Promise<BuildUpReview> {
    return await this.buildupService.saveReview(id, dto);
  }

  @ApiOperation({ summary: 'supervisor 소속그룹 전체 bmds 리스트 조회' })
  @Get('/list/supervisor/:userId/:currentPage?/:page?')
  async getSupervisorList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('currentPage', OptionalParseIntPipe) currentPage = 1,
    @Param('page', OptionalParseIntPipe) page = 10,
  ): Promise<{ data: BuildUpBmds[]; count: number }> {
    return await this.buildupService.getBuildUpBmdsListBySupervisor(
      userId,
      currentPage,
      page,
    );
  }

  // @Get('/bmds/download/:id')
  // async downloadFile(@Param('id') id: number, @Res() res: Response) {
  //   const fileData = await this.buildupService.getBuildStep62(id);
  //   if (!fileData) throw new NotFoundException('File not found');

  //   const headers = {
  //     'Content-Type': 'application/octet-stream',
  //     'Content-Disposition': `attachment; filename="${encodeURIComponent(
  //       fileData.fileName62,
  //     )}"`,
  //   };

  //   res.set(headers);

  //   const fileBuffer = await this.buildupService.downloadFileFromS3(
  //     fileData.fileKey,
  //     'dev.new.bmds',
  //   );
  //   console.log(fileData.fileKey);

  //   res.end(fileBuffer);
  //   console.log(res.getHeaders());
  // }
}
