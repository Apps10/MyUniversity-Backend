import {
  ForwardReference,
  Inject,
  Injectable,
  InjectionToken,
} from '@nestjs/common'

export function InjectableCustom() {
  return Injectable()
}

export function InjectCustom(name: InjectionToken | ForwardReference) {
  return Inject(name)
}
