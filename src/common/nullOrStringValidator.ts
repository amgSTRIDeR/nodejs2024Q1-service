import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNullOrString', async: false })
export class IsStringOrNullConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' || value === null;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) must be a string or null!';
  }
}

export function IsNullOrString(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsNullOrString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsStringOrNullConstraint,
    });
  };
}
