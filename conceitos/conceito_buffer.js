const buf = Buffer.from('Hello');
// buffer é o meio de representar o dado na memoria, essa função dentro do const ira trazer exatamente a posição de cada letra dentro da memoria
// após seu uso ela é apagada ou seja ´buffer é um armazenamento temporario muitas vezes.
console.log(buf.toJSON());
console.log(buf);
