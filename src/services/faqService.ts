import { Injectable } from '@angular/core';

@Injectable()
export class FaqService {
  faq = [
    {'question': "Conceitos e Benefícios", 'answer': `O que é Nota Fiscal Cidadã?• É um programa de estimulo a cidadania fiscal e tributária do Estado de Alagoas que tem por objetivo estimular os consumidores a exigirem a entrega do documento fiscal na hora da compra, bem como conscientizá-los sobre a importância social do tributo. Além disso, visam gerar benefícios aos consumidores, a sociedade e as empresas do Estado.
Quais os benefícios para os estabelecimentos comerciais?• Redução do comércio informal e de produtos ilegais;
• Dispensa de AIDF-Autorização para Impressão de Documentos Fiscais no caso de emissão exclusiva de Nota Fiscal On-line;
• Maior isonomia e justiça fiscal, com diminuição da concorrência desleal.
• Benefícios para quem receber uma Nota Fiscal emitida ou registrada no Sistema da Nota Cidadã.
Quais os benefícios para o consumidor?
• Maior segurança em suas compras por optar por estabelecimentos regularizados;
• Facilidade na identificação de seus documentos fiscais pela disponibilização de extrato eletrônico de suas compras;
• Participação em sorteio de prêmios;
• Maior compreensão da função social do tributo;
• Opção de contribuir com as entidades soiais indicando o CNPJ destes no momento de suas compras;
• Participação cidadã na construção de um Estado comprometido com a prestação de serviços públicos qualificados.`},
    {'question': "Participantes do Programa", 'answer': `Quais empresas estão obrigadas a participar?
Todas as empresas que trabalham com o varejo, contribuintes do ICMS, deverão se integrar à nova sistemática, conforme o cronograma de implantação do programa.
Existe idade mínima para participar do programa?
Não. O Programa da Nota da Gente não restringe a participação do cidadão. Qualquer pessoa que possuir um CPF pode se cadastrar, independentemente de sua de sua idade. O cidadão absoluta ou relativamente incapaz poderá desde que possua CPF, participar do Programa, devendo, na prática dos atos em que sua natureza exija, ser representado ou assistido.`},
    
    {'question': "Cadastro", 'answer': `É necessário me cadastrar no programa? (consumidor)
Sim. Além de informar o seu CPF ou CNPJ no ato da compra. Para consultar os documentos fiscais registrados com seu CPF/CNPJ, como também para consultar os cupons gerados para participação no sorteio, o consumidor deverá acessar o Sistema da Nota Fiscal Cidadã
Como realizar o cadastro?
Para obter o login e a senha do sistema, o consumidor deverá acessar o sistema da Nota Fiscal Cidadã, selecionar na opção "Não tem senha?", se é "pessoa física" ou "pessoa jurídica", informar alguns dados e sua senha para ter acesso às funcionalidades do sistema. Depois de informados todos os dados, o acesso é liberado imediatamente pelo portal.
Como devo proceder para desbloquear a senha?
CONSUMIDOR = caso bloqueei a senha ou deseje refazê-la, deve selecionar a opção "Consumidor", digitar o CPF (pessoa física) ou CNPJ (pessoa jurídica) e clicar na opção "Redefinir minha senha", na página de acesso do sistema. O Usuário terá duas opções para resgatar sua senha.
• Envio de frase para lembrar a senha: ao clicar em "Enviar", você receberá no email informado no cadastro a frase escolhida para lembrar sua senha.
• Envio de endereço da página de cadastramento de nova senha: caso você não se lembre da senha mesmo vendo frase, clique em "Enviar". Você receberá no email informado um link que o(a) direcionará para a página de cadastramento de nova senha, conforme abaixo.
CONTRIBUINTE/CONTABILISTA= o contribuinte/contabilista terá que comparecer ao CEAC para desbloqueá-la, seguindo procedimento utilizado para desbloqueio de senha do Sistema Fazendário.
O consumidor residente em outro estado poderá participar do programa?
Sim. O consumidor residente em outro Estado também poderá participar do Programa Nota da Gente e ter o direito de participar dos sorteios, mas para isso deve adquirir mercadorias dentro do Estado de Alagoas.`},
    {'question': "Condomínios Residenciais e Comerciais", 'answer': ` Como o condomínio pode ser beneficiado pela Nota da Gente?
Para ser beneficiada pelo programa da Nota da Gente, o condomínio deve se cadastrar no site http://nfcidada.sefaz.al.gov.br/ selecionando a opção "Condomínio", informar os dados.
Após preenchidos os dados, o usuário deve clicar em "Solicitar Cadastramento". O sistema informará que para o deferimento do cadastro, será necessário que o consumidor assine o requerimento que consta no link e encaminhe juntamente com a documentação comprobatória ao Central de Atendimento ao Contribuinte – CEAC mais próximo.
Os condomínios devem entregar ou encaminhar ao CEAC a seguinte documentação: 
- Requerimento preenchido e assinado – com firma reconhecida;
- Cópia simples do CNPJ;
- Procuração com firma reconhecida, quando o signatário do requerimento atuar na condição de procurador do respectivo consumidor interessado; 
- Cópia autenticada do instrumento de constituição da pessoa jurídica, e eventuais alterações, registrado no órgão competente;
- Cópia do Documento de Identificação do Representante legal da pessoa jurídica.
Depois de analisada a documentação do condomínio e autorizado o acesso por um servidor fazendário, o usuário pode acessar o sistema Nota Fiscal Cidadã como Consumidor e digitar o CNPJ do condomínio, a senha e o código de acesso.`}
  ]
  constructor() {

  }

  request(): any {
    return this.faq;
  }
}
