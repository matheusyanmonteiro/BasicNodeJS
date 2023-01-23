import { Readable, Writable, Transform } from 'node:stream';

// construindo stream do zero uma readable stream
class OneToHundredStream extends Readable {
  index = 1;
  //sempre tem um metodo obrigatorio que é o _read() sempre vai enviar dados
  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null); //metodo que fornece uma informação para a stream
    } else {
      const buf = Buffer.from(String(i)); // conversor de primitivo para buffer. Lembrando que o buffer não aceita primitivos numericos só Strings.
      this.push(buf);
    }
  }
}
//obs: dentro de stream não podemos trabalhar com tipos primitivos. vamos trabalhar sempre com buffers
//new OneToHundredStream().pipe(process.stdout); // ler a stream e printar no terminal

// construindo stream do zero uma readable stream
class OneToHundredStreamWithSetTimeout extends Readable {
  index = 1;
  //sempre tem um metodo obrigatorio que é o _read() sempre vai enviar dados
  _read() {
    const i = this.index++;

    setTimeout(() => {
      // isso fara com que o a leitura seja mais lenta
      if (i > 100) {
        this.push(null); //metodo que fornece uma informação para a stream
      } else {
        const buf = Buffer.from(String(i)); // conversor de primitivo para buffer. Lembrando que o buffer não aceita primitivos numericos só Strings.
        this.push(buf);
      }
    }, 1000);
  }
}
//obs: dentro de stream não podemos trabalhar com tipos primitivos. vamos trabalhar sempre com buffers

class InverseNumberStream extends Transform {
  //stream de transformação ela é o intermedio entre uma leitura e uma escrita o papel dela é transformar aquele dado que está sendo lido antes do dado de escrita fazer as alterações
  _transform(chunk, encoding, callback) {
    const transform = Number(chunk.toString() * -1);

    callback(null, Buffer.from(String(transform)));
  }
}

class MultiplyByTenStream extends Writable {
  // stream de criação tem como o objetivo de trabalhar com os dados de leitura enquanto eles ainda estão sendo lidos
  _write(chunk, encoding, callback) {
    // chunk é o buffer que vem geralmente da stream de leitura, callback é a saida de toda operação.
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStreamWithSetTimeout()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
