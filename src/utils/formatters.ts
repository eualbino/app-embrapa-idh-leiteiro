export function formatCPF(cpf: string | undefined | null): string {
  if (!cpf) return "";

  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) {
    return cpf;
  }

  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Formata um CPF progressivamente durante a digitação
 * Útil para inputs onde o usuário está digitando o CPF
 * @param cpf - CPF parcial ou completo
 * @returns CPF formatado progressivamente
 */
export function formatCPFInput(cpf: string): string {
  const numbers = cpf.replace(/\D/g, "");

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  } else {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }
}

/**
 * Remove a formatação do CPF, deixando apenas os números
 * @param cpf - CPF formatado
 * @returns CPF apenas com números
 */
export function unformatCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return "";

  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}

export function formatCurrency(value: number, currency: string = "R$"): string {
  return `${currency} ${value
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCEP(cep: string | undefined | null): string {
  if (!cep) return "";

  const cleanCEP = cep.replace(/\D/g, "");

  if (cleanCEP.length !== 8) {
    return cep;
  }

  return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
}
