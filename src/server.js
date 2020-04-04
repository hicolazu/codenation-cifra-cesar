import server from './app';

server.listen(3333, () => console.log('Server listening on port 3333'))
        .on('error', err => {
          console.log('Ocorreu um erro inesperado: ', err.message);
          server.listen(3000, () => console.log('Server listening on port 3000'));
        });