// src/middlewares/validateDto.ts
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoInstance);
    console.log('5678987654567898765456787654')
    if (errors.length > 0) {
      const message = errors
        .map((error) => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      res.status(400).json({ message });
    } else {
      next();
    }
  };
};
