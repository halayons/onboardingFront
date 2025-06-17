export interface Colaborador {
    id?: number;
    nombre: string;
    email: string;
    fechaIngreso: string;
    onboardingGeneral: boolean;
    onboardingTecnico: boolean;
    fechaOnboardingTecnico?: string;
}
