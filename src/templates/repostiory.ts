export const createRepositoryTemplate = (
    entityName: string,
    entityFullPath: string
) => `
import { ${entityName} } from '${entityFullPath}';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ${entityName}Repository extends Repository<${entityName}> {
  constructor(dataSource: DataSource) {
    super(${entityName}, dataSource.createEntityManager());
  }
}
`;
