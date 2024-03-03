import { Injectable } from '@nestjs/common';
import { Document, VectorStoreIndex } from 'llamaindex';
import { config } from 'dotenv';

@Injectable()
export class AppService {
  async performLLMSearch(file: Express.Multer.File, query: string): Promise<any> {
    config();

    const document = new Document({ text: file.buffer.toString(), id_: file.path });

    const index = await VectorStoreIndex.fromDocuments([document]);

    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({
      query: query,
    });

    // Output response
    return response.toString();
  }
}
