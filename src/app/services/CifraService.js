import axios from "axios";
import FileService from './FileService';
import sha1 from 'sha1';
import path from 'path';
import fs from 'fs';

class CifraService {
  constructor() {
    this.token = '51a355603265d46ae0892ff9287bb86a717a3cb7';
    this.url_consulta = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${this.token}`;
    this.url_submissao = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${this.token}`;
    this.file_path = path.join(__dirname, '..', '..', '..', 'temp', 'answer.json');
  }

  async main(){
    await this.salvarRespostaApi()
    let {numero_casas, token, cifrado, decifrado, resumo_criptografico} = await FileService.lerArquivo();

    await this.decifrarCifra(numero_casas, cifrado).then(result => {
      decifrado = result;
      resumo_criptografico = this.gerarResumoCriptografico(result);
    });
      
    const result = {
      numero_casas,
      token,
      cifrado,
      decifrado,
      resumo_criptografico
    }

    await FileService.salvarArquivo(JSON.stringify(result));
    
    console.log(await FileService.lerArquivo());
    //this.enviarArquivo();
  }

  decifrarCifra(numero_casas, cifrado) {
    cifrado = cifrado.toLowerCase();
    const codigoAsc_a = 97; 
    const tamanho_alfabeto = 26;
    let result = '';
    for (let posicao = 0; posicao < cifrado.length; posicao++){
      const codigoAsc = cifrado.charCodeAt(i);
      let char = String.fromCharCode(codigoAsc);

      if (codigoAsc >= 44 && codigoAsc <= 59 || codigoAsc === 32)
        result += char;
      else {
        char = String.fromCharCode(((codigoAsc - codigoAsc_a + numero_casas) % tamanho_alfabeto) + codigoAsc_a); 
        result += char;
      }
    }
    console.log(result);
    return new Promise(resolve => resolve(result));
  }

  gerarResumoCriptografico(decifrado) {
    return sha1(decifrado);
  }

  async enviarArquivo() {
    const answerFile = await fs.createReadStream(file_path);
    const formData = new FormData();
    formData.append("answer", answerFile);

    const { data } = await axios({
        method: 'POST',
        url: this.url_submissao,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }})
  }

  async consultarApi() {
    return await axios.get(this.url_consulta);
  }

  async salvarRespostaApi(){
    const response = await this.consultarApi();
    return await FileService.salvarArquivo(JSON.stringify(response.data));
  }
}

export default new CifraService();