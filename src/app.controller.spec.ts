import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let catsController: AppController;
  let catsService: AppService;

  beforeEach(() => {
    catsService = new AppService();
    catsController = new AppController(catsService);
  });

  describe('healthCheck', () => {
    it('should return true', async () => {
      const result = true;
      jest.spyOn(catsService, 'healthCheck').mockImplementation(() => result);

      expect(await catsController.healthCheck()).toBe(result);
    });
  });
});
