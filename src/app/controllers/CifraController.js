import CifraService from '../services/CifraService';

class DecifrarController {
  async index(req, res) {
    try {
      await CifraService.main();
      res.json({sucesso: true, mensagem: 'Operação realizada com sucesso!'});
    }
    catch (err) {
      res.json({sucesso: false, mensagem: err.message});
    }
  }
}

export default new DecifrarController();