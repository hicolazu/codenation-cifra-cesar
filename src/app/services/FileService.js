import path from 'path';
import jsonFile from 'jsonfile';

class FileService {
  constructor() {
    this.file_path = path.join(__dirname, '..', '..', '..', 'temp', 'answer.json');
  }

  async salvarArquivo(json) {
    return await jsonFile.writeFile(this.file_path, json)
                    .then(() => console.log('Sucesso ao criar arquivo!'))
                    .catch(err => console.log(`Erro ao criar arquivo \n Erro: ${err}`));
  }

  async lerArquivo(){
    return await jsonFile.readFile(this.file_path)
                    .then(file => {console.log('Sucesso ao ler arquivo!'); return JSON.parse(file)})
                    .catch(err => console.log(`Erro ao ler arquivo \n Erro: ${err}`));
  }
}

export default new FileService();