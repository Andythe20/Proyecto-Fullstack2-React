export type PasswordStrength =
  | "Muy Débil"
  | "Débil"
  | "Regular"
  | "Fuerte"
  | "Muy Fuerte";

export interface PasswordValidationResult {
  strength: PasswordStrength;
  score: number;
  maxScore: number;
  feedback: string[];
  meetsMinimum: boolean;
  isValid?: boolean;
}

class PasswordValidator {
  // Criterios de validación
  private readonly criteria = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  public validatePassword(password: string): PasswordValidationResult {
    const feedback: string[] = [];
    let score = 0;
    const maxScore = 100;

    // Verificar longitud
    score += this.checkLength(password, feedback);
    score += this.checkUppercase(password, feedback);
    score += this.checkLowercase(password, feedback);
    score += this.checkNumbers(password, feedback);
    score += this.checkSpecialChars(password, feedback);

    this.checkCommonPatterns(password, feedback);

    const strength = this.determineStrength(score);
    const meetsMinimum = this.checkMinimumRequirements(password);

    return {
      strength,
      score,
      maxScore,
      feedback,
      meetsMinimum,
      isValid: meetsMinimum,
    };
  }

  private checkLength(password: string, feedback: string[]): number {
    const length = password.length;
    if (length >= 12) return 25;
    if (length >= 8) {
      feedback.push("Considera usar una contraseña más larga (12+ caracteres)");
      return 20;
    }
    if (length >= 6) {
      feedback.push(
        "La contraseña es demasiado corta. Mínimo 8 caracteres recomendados"
      );
      return 10;
    }
    feedback.push("La contraseña es muy corta. Mínimo 8 caracteres requeridos");
    return 0;
  }

  private checkUppercase(password: string, feedback: string[]): number {
    if (/[A-Z]/.test(password)) return 15;
    feedback.push("Agrega al menos una letra mayúscula");
    return 0;
  }

  private checkLowercase(password: string, feedback: string[]): number {
    if (/[a-z]/.test(password)) return 15;
    feedback.push("Agrega al menos una letra minúscula");
    return 0;
  }

  private checkNumbers(password: string, feedback: string[]): number {
    if (/[0-9]/.test(password)) return 15;
    feedback.push("Agrega al menos un número");
    return 0;
  }

  private checkSpecialChars(password: string, feedback: string[]): number {
    const specialCharsRegex = new RegExp(
      `[${this.escapeRegExp(this.criteria.specialChars)}]`
    );
    if (specialCharsRegex.test(password)) return 20;
    feedback.push("Agrega al menos un carácter especial (!@#$%^&* etc.)");
    return 0;
  }

  private checkCommonPatterns(password: string, feedback: string[]): void {
    const commonPatterns = [
      {
        pattern: /^123456789$/,
        message: "Evita secuencias numéricas consecutivas",
      },
      { pattern: /^[a-z]+$/, message: "Evita usar solo letras minúsculas" },
      { pattern: /^[A-Z]+$/, message: "Evita usar solo letras mayúsculas" },
      { pattern: /^[0-9]+$/, message: "Evita usar solo números" },
      {
        pattern: /(.)\1{2,}/,
        message: "Evita caracteres repetidos consecutivos",
      },
      {
        pattern: /password|123456|admin|qwerty/i,
        message: "Evita contraseñas comunes y fáciles de adivinar",
      },
    ];

    commonPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(password)) feedback.push(message);
    });
  }

  private checkMinimumRequirements(password: string): boolean {
    return (
      password.length >= this.criteria.minLength &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      new RegExp(`[${this.escapeRegExp(this.criteria.specialChars)}]`).test(
        password
      )
    );
  }

  private determineStrength(score: number): PasswordStrength {
    if (score >= 90) return "Muy Fuerte";
    if (score >= 75) return "Fuerte";
    if (score >= 50) return "Regular";
    if (score >= 25) return "Débil";
    return "Muy Débil";
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

export const passwordValidator = new PasswordValidator();
