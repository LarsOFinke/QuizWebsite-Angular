import { testingEnvironment } from './environment.testing';
import { productionEnvironment } from './environment.prod';

const production = false;

export let currentEnvironment: {
  api_url: string;
  contactInformation: string;
};

if (production) {
  currentEnvironment = productionEnvironment;
}
if (!production) {
  currentEnvironment = testingEnvironment;
}
