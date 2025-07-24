/* eslint-disable camelcase */
const db = require('./db');

async function buscarNumeroPrecatorio() {
  const query = `
    SELECT 
      numero_do_precatorio
    FROM precatorios_orcamentarios_trf2
    WHERE marcado = ''
  `;

  const rows = await db.query(query);
  return rows;
}


async function marcarAchado(numeroPrecatorio, nome) {
  const query = `
    UPDATE precatorios_orcamentarios_trf2
    SET marcado = 'X', nome_requerente = ?
    WHERE numero_do_precatorio = ?
  `;

  await db.query(query, [nome, numeroPrecatorio]);
}



module.exports = {
  buscarNumeroPrecatorio,
  marcarAchado
};
