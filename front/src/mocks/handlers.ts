import interest_answer from './handlers/interest_answer';
import interest_question from './handlers/interest_question';
import festival_list from './handlers/festival_list';
import festival_recomm_restaurant from './handlers/festival_recomm_restaurant';
import festival_item from './handlers/festival_item';
import search_news from './handlers/search_news';
import weather from './handlers/weather';

import festival_recomm_lodge from './handlers/festival_recomm_lodge';
import festival_request_list from './handlers/festival_request_list';
import festival_recomm_shopping from './handlers/festival_recomm_shopping';
import festival_recomm_culture from './handlers/festival_recomm_culture';
import festival_recomm_leisure from './handlers/festival_recomm_leisure';
import festival_recomm_landmark from './handlers/festival_recomm_landmark';

export const handlers = [
  interest_question,
  interest_answer,
  festival_list,
  festival_recomm_restaurant,
  festival_recomm_lodge,
  festival_recomm_shopping,
  festival_recomm_culture,
  festival_recomm_leisure,
  festival_recomm_landmark,
  festival_item,
  search_news,
  weather,
  festival_request_list,
];
