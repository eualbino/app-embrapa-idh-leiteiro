import { FormData } from '@/src/components/pages/questions/types';

export interface ValidationError {
  field: string;
  message: string;
}

export class QuestionnaireService {
  static validateCaracterizacaoForm(data: FormData): ValidationError[] {
    console.log('Dados recebidos:', data);
    
    const errors: ValidationError[] = [];

    if (!data.sistemaProducao.tipo) {
      errors.push({
        field: 'sistemaProducao.tipo',
        message: 'Sistema de Produção é obrigatório'
      });
    }

    if (
      data.sistemaProducao.tipo === "outro" &&
      !data.sistemaProducao.outroEspecificacao?.trim()
    ) {
      errors.push({
        field: 'sistemaProducao.outroEspecificacao',
        message: 'Especifique o sistema de produção quando "Outro" for selecionado'
      });
    }

    if (!data.area.propriedade) {
      errors.push({
        field: 'area.propriedade',
        message: 'Área da propriedade é obrigatória'
      });
    }

    if (!data.rebanho.vacasLactacao) {
      errors.push({
        field: 'rebanho.vacasLactacao',
        message: 'Número de vacas em lactação é obrigatório'
      });
    }

    if (!data.producaoLeiteira.litrosDiaPropriedade) {
      errors.push({
        field: 'producaoLeiteira.litrosDiaPropriedade',
        message: 'Produção de litros por dia é obrigatória'
      });
    }

    return errors;
  }

  static validateQuestionGroup(answers: { [key: string]: number | null }, questions: any[]): boolean {
    return questions.every((q) => answers[q.id] !== undefined);
  }

  static getQuestionDependencies(questionId: string | number): string[] {
    const id = String(questionId);
    
    if (id === "3" || id === "4") {
      return ["2"];
    }
    if (id === "15" || id === "16" || id === "17") {
      return ["14"];
    }
    if (id === "23" || id === "24" || id === "25") {
      return ["22"];
    }
    
    return [];
  }

  static isQuestionDisabled(questionId: string | number, answers: { [key: string]: number | null }): boolean {
    const dependencies = this.getQuestionDependencies(questionId);
    
    return dependencies.some(depId => answers[depId] === 0);
  }

  static calculateScore(answers: { [key: string]: number | null }): number {
    console.log('🧮 Calculando score do questionário...');
    console.log('📊 Respostas para cálculo:', answers);
    
    const validAnswers = Object.values(answers).filter(value => value !== null && value !== undefined);
    const totalScore = validAnswers.reduce((sum, value) => sum + (value || 0), 0);
    const maxPossibleScore = validAnswers.length;
    
    return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  }

  static getScoreLevel(score: number): { level: string; color: string; description: string } {
    if (score >= 80) {
      return {
        level: 'Excelente',
        color: '#28a745',
        description: 'Desempenho hídrico excelente'
      };
    } else if (score >= 60) {
      return {
        level: 'Bom',
        color: '#17a2b8',
        description: 'Desempenho hídrico bom'
      };
    } else if (score >= 40) {
      return {
        level: 'Regular',
        color: '#ffc107',
        description: 'Desempenho hídrico regular'
      };
    } else {
      return {
        level: 'Precisa Melhorar',
        color: '#dc3545',
        description: 'Desempenho hídrico precisa melhorar'
      };
    }
  }
}
