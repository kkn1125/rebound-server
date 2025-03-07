import { DMMF, generatorHandler } from '@prisma/generator-helper';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';

generatorHandler({
  onManifest() {
    return {
      prettyName: 'Custom Prisma Generator',
      defaultOutput: './generated-custom', // 기본 출력 폴더
    };
  },
  async onGenerate(options) {
    console.log('Custom Prisma Generator is running...');

    const outputDir = options.generator.output?.value ?? './generated-custom';
    console.log(outputDir);
    await fs.rm(outputDir, { force: true, recursive: true });

    // 예제: 모델 정보를 JSON으로 저장
    const models = options.dmmf.datamodel.models;
    // console.log(models);
    const jsonContent = JSON.stringify(models, null, 2);

    // 출력 폴더가 없으면 생성
    await fs.mkdir(outputDir, { recursive: true });
    // await fs.writeFile(path.join(outputDir, 'models.json'), jsonContent);

    for (const model of models) {
      const modelFile = useTemplate(model);
      const prettyContent = await prettier.format(modelFile, {
        parser: 'typescript',
        singleQuote: true,
        trailingComma: 'all',
      });
      await fs.writeFile(
        path.join(outputDir, model.name + '.ts'),
        prettyContent,
      );
    }

    console.log(`Generated files in ${outputDir}`);
  },
});

function useTemplate(model: DMMF.Model): string {
  let swaggerImports = new Set(['ApiProperty']);
  let relatedModels = new Set<string>();
  let classDefinition = `export class ${model.name} {\n`;

  model.fields.forEach((field) => {
    const {
      name,
      type,
      isRequired,
      isList,
      default: defaultValue,
      relationName,
    } = field;
    let propertyType = getType(type, isList);
    let propertyDefinition = '';
    let isNullable = !isRequired;
    let propertyDecorator = 'ApiProperty';
    // let decoratorOptions = '';
    let decoratorOptions = `{ type: ${getSwaggerType(type)} }`; // 기본 원시 타입 지정

    // // 관계형 모델이면 import 추가
    // if (relationName) {
    //   relatedModels.add(type);
    // }
    // 관계형 모델 처리
    if (relationName) {
      relatedModels.add(type);
      decoratorOptions = isList
        ? `{ isArray: true, type: () => ${type} }`
        : `{ type: () => ${type} }`;
    }

    // 기본값이 있는 경우
    if (defaultValue !== undefined) {
      if (
        typeof defaultValue === 'string' ||
        typeof defaultValue === 'number'
      ) {
        propertyDecorator = 'ApiPropertyOptional';
        swaggerImports.add('ApiPropertyOptional');
        propertyDefinition = `${name}: ${propertyType}${isNullable ? ' | null' : ''} = ${formatValue(defaultValue, type)};`;
      } else if (
        typeof defaultValue === 'object' &&
        'name' in defaultValue &&
        'args' in defaultValue
      ) {
        propertyDefinition = `${name}!: ${propertyType};`;
      }
    } else {
      // 기본값이 없는 경우
      propertyDefinition = isNullable
        ? `${name}!: ${propertyType} | null;`
        : `${name}!: ${propertyType};`;
    }

    // // 데코레이터 추가
    // classDefinition += `  @${propertyDecorator}()\n  ${propertyDefinition}\n\n`;

    // // 데코레이터 추가 (관계형 모델이면 옵션 포함)
    // classDefinition += decoratorOptions
    //   ? `  @${propertyDecorator}(${decoratorOptions})\n`
    //   : `  @${propertyDecorator}()\n`;
    // classDefinition += `  ${propertyDefinition}\n\n`;

    // 데코레이터 추가 (옵션 포함)
    classDefinition += `  @${propertyDecorator}(${decoratorOptions})\n`;
    classDefinition += `  ${propertyDefinition}\n\n`;
  });

  classDefinition += `}\n`;

  // Swagger import 구문 생성
  const swaggerImportStatement = `import { ${Array.from(swaggerImports).join(', ')} } from '@nestjs/swagger';`;

  // 관계형 모델 import 추가
  const relatedModelImports = Array.from(relatedModels).map(
    (relatedModel) => `import { ${relatedModel} } from './${relatedModel}';`,
  );

  return [
    [swaggerImportStatement, ...relatedModelImports].join('\n'),
    classDefinition,
  ]
    .filter(Boolean)
    .join('\n\n');
}

// ✅ 타입 매핑 함수
function getType(prismaType: string, isList: boolean): string {
  const typeMap: { [key: string]: string } = {
    String: 'string',
    Int: 'number',
    Float: 'number',
    Boolean: 'boolean',
    DateTime: 'Date',
    Bytes: 'Buffer',
  };
  const mappedType = typeMap[prismaType] || prismaType;
  return isList ? `${mappedType}[]` : mappedType;
}

// ✅ Swagger 타입 변환 (원시 타입을 대문자로)
function getSwaggerType(prismaType: string): string {
  const typeMap: { [key: string]: string } = {
    String: 'String',
    Int: 'Number',
    Float: 'Number',
    Boolean: 'Boolean',
    DateTime: 'Date',
    Bytes: 'Buffer',
  };
  return typeMap[prismaType] || prismaType;
}

// ✅ 기본값 포맷팅 함수
function formatValue(value: any, type: string): string {
  if (typeof value === 'string') return `'${value}'`;
  if (type === 'DateTime' && typeof value === 'object') return 'new Date()';
  return String(value);
}
