const emailValid = [
    (v) => !!v || 'E-mail é obrigatório',
    (v) =>
      !v ||
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      'E-mail inválido'
  ]
  const celphoneValid = [
    (v) => !!v || 'Celular é obrigatório',
    (v) => v?.length > 18 || 'Celular deve conter 11 dígitos',
    (v) =>
      /^.(\d{2}) \(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/.test(v) ||
      'Celular inválido'
  ]
  const cpfValid = [
    (v) => !!v || 'CPF é obrigatório',
    (v) => v?.length > 11 || 'CPF deve conter 14 dígitos'
  ]
  const nameValid = [(v) => (!!v && v.length >= 4) || 'Insira seu nome completo']
  const districtValid = [(v) => (!!v && v.length >= 2) || 'Coloque o nome do bairro']
  const stateValid = [(v) => (!!v && v.length >= 2) || 'Insira somente a sigla do estado']
  const numberAddressValid = [(v) => (!!v && v.length >= 2) || 'Insira o número da residência']
  const creditCardNumberValid = [(v) => (!!v && v.length >= 16) || 'Insira o número do cartão de crédito']
  const cvcCardValid = [(v) => (!!v && v.length >= 3) || 'Insira o número do CVC']
  const yearCardValid = [(v) => (!!v && v.length === 4) || 'Insira o ano de vencimento do cartão']
  const monthCardValid = [(v) => (!!v && v.length === 2) || 'Insira o mês de vencimento do cartão']

  export {
    emailValid,
    celphoneValid,
    nameValid,
    districtValid,
    stateValid,
    numberAddressValid,
    creditCardNumberValid,
    cvcCardValid,
    yearCardValid,
    monthCardValid,
    cpfValid
}
  