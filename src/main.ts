/* Copyright (C) 2009-2020, Nick Galko. All rights reserved.
*
* This file is part of the Nick Galko source-code
* (http://https://galek.github.io/portfolio/).
*
* Your use and or redistribution of this software in source and / or
* binary form, with or without modification, is subject to: (i) your
* ongoing acceptance of and compliance with the terms and conditions of
* the Nick Galko License Agreement; and (ii) your inclusion of this notice
* in any version of this software that you use or redistribute.
* A copy of the NGTech License Agreement is available by contacting
* Nick Galko. at http://https://galek.github.io/portfolio/
*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
