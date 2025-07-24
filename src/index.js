const { By, Builder, Key, until } = require('selenium-webdriver');
const requerenteRepository = require('./database/requerenteRepository');
require('dotenv').config({ path: '../.env' });

async function buscarDados() {
  const results = await requerenteRepository.buscarNumeroPrecatorio();
  return results;
}

async function extrairNomeRequerente(driver) {
  try {
    const xpathRequerentes = "//div[contains(@class, 'text-gray-600') and contains(., 'Requerente') and contains(., 'Polo Ativo')]/parent::a/div[contains(@class, 'text-gray-800')]";

    const requerenteElements = await driver.wait(until.elementsLocated(By.xpath(xpathRequerentes)), 5000);
    const nomesRequerentes = [];

    for (const el of requerenteElements) {
      const nome = (await el.getText()).trim();
      if (nome) {
        nomesRequerentes.push(nome);
      }
    }

    const nomesConcatenados = nomesRequerentes.join('; ');
    console.log("Requerentes:", nomesRequerentes);
    console.log("Concatenado:", nomesConcatenados);

    return nomesConcatenados;

  } catch (err) {
    console.error("Erro ao extrair nomes:", err.message);
    return null;
  }
}

async function Main() {
  let driver;
  try {
    
    const numerosPrecatorios = await buscarDados();

    driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://www.escavador.com/login')

    const inputEmail = await driver.findElement(By.id('email'))
    inputEmail.sendKeys(process.env.INPUT_EMAIL)

    const inputSenha = await driver.findElement(By.id('senha'))
    inputSenha.sendKeys(process.env.INPUT_PASSWORD)

    const buttonEntrar = await driver.findElement(By.xpath('//*[@id="__layout"]/main/div[1]/section/div/div[2]/div/div[1]/div/form/div[4]/button'))
    await buttonEntrar.click();

    await driver.sleep(30000);

    for (const numero of numerosPrecatorios) {
      const url = `https://www.escavador.com/busca?qo=t&q=${numero.numero_do_precatorio}`;
      await driver.get(url);
      await driver.sleep(3000);

      const link = await driver.findElement(By.className('link -dark -color'))
      await link.click();
      await driver.sleep(3000);

      const nome = await extrairNomeRequerente(driver);

      if (nome) {
        await requerenteRepository.marcarAchado(numero.numero_do_precatorio, nome);
      }

    }

  } catch (error) {
    console.error(`Erro no processo:`, error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

Main();