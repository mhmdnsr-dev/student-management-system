import { AbstractControl } from '@angular/forms';

export function passwordMatching(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('Password');
  const rePassword = c.get('rePassword');
  if (!password || !rePassword) return null;
  if (password?.value?.length < 8 || rePassword?.value?.length < 8) return null;
  if (password?.value !== rePassword?.value) {
    return { passwordMismatch: true };
  }
  return null;
}
