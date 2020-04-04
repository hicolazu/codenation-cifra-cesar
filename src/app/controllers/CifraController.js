import CifraService from '../services/CifraService';

class DecifrarController {
  async index(req, res) {
    try {
      await CifraService.main();
      res.json({sucesso: true, mensagem: 'Operação concluida com sucesso!'})
    }
    catch (err) {
      res.json({sucesso: false, mensagem: err});
    }
  }
}

export default new DecifrarController();