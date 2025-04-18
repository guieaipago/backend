import fs from 'fs';
import path from 'path';
import { compressAndSave } from '@/services/imageService';


describe('imageService', () => {
  it('should compress and save an image', async () => {
    // Caminho para a imagem dentro da pasta assets
    const filePath = path.join(__dirname, '../assets/sample.png');
    
    // Lê a imagem do disco
    const buffer = fs.readFileSync(filePath);

    // Cria um mock do arquivo que será passado para a função
    const mockImage = {
      originalname: 'sample.png',
      mimetype: 'image/png',
      buffer,
    } as any;

    // Chama a função que está sendo testada
    const filename = await compressAndSave(mockImage);

    // Verifica se o resultado foi o esperado (nome do arquivo)
    expect(typeof filename).toBe('string');
  });
});
