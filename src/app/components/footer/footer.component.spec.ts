import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(() => {
    component = new FooterComponent();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el año actual', () => {
    const currentYear = new Date().getFullYear();
    expect(component.year).toBe(currentYear);
  });
});