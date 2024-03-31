import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsOneOf(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isOneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedProperties = args.constraints;
          return relatedProperties.some(
            (prop: string) => (args.object as any)[prop] === value,
          );
        },
      },
    });
  };
}
