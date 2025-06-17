import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroOnboarding',
    standalone: true
})
export class FiltroOnboardingPipe implements PipeTransform {
    transform(colaboradores: any[], tipo: string, valor: string): any[] {
        return colaboradores.filter(colab => {
            let pasaTipo = true;
            let pasaValor = true;

            if (tipo && valor) {
                pasaTipo = String(colab[tipo]) === valor;
            } else if (tipo) {
                pasaTipo = colab[tipo] === true || colab[tipo] === false;
            } else if (valor) {
                pasaTipo = String(colab.onboardingGeneral) === valor || String(colab.onboardingTecnico) === valor;
            }

            return pasaTipo && pasaValor;
        });
    }
}