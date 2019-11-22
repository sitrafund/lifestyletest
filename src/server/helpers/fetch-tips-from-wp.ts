import * as dotenv from 'dotenv';
import * as request from 'request';
import Tip from '../models/tip';

dotenv.config({ path: '.env' });

const wpUrl =
  process.env.WP_URL ||
  // tslint:disable-next-line: max-line-length
  'http://sitra.fi/wp/wp-admin/admin-ajax.php?action=get_all_posters_by_post_type&post_type=cases&show_taxonomies=case_types&tax_query_taxonomy=case_types&tax_query_term_ids=5255';
// tslint:disable-next-line: max-line-length
// "https://www.sitra.fi/wp/wp-admin/admin-ajax.php?action=get_all_posters_by_post_type&post_type=cases&show_taxonomies=case_types,environment_effect&tax_query_taxonomy=case_types&tax_query_term_ids=5255"

export async function fetchTips(): Promise<any> {
  return new Promise((resolve, reject) => {
    request(wpUrl, (error, response, body) => {
      if (error) {
        console.error(error);
        reject();
        return;
      }
      const tips = JSON.parse(body).posts.map(rawTip => {
        if (
          rawTip.fi &&
          rawTip.en &&
          rawTip.fi.ID &&
          rawTip.fi.portrait_image &&
          rawTip.fi.title &&
          rawTip.en.title &&
          rawTip.sv.title &&
          rawTip.fi.vinjetti &&
          rawTip.en.vinjetti &&
          rawTip.sv.vinjetti &&
          rawTip.fi.url &&
          rawTip.en.url &&
          rawTip.sv.url &&
          rawTip.fi.environment_effect &&
          rawTip.en.environment_effect &&
          rawTip.sv.environment_effect
        ) {
          return {
            wpId: rawTip.fi.ID,
            images: rawTip.fi.portrait_image.urls.full,
            title: {
              fi: rawTip.fi.title,
              en: rawTip.en.title,
              se: rawTip.sv.title,
            },
            tag: {
              fi: rawTip.fi.vinjetti.label,
              en: rawTip.en.vinjetti.label,
              se: rawTip.sv.vinjetti.label,
            },
            url: {
              fi: rawTip.fi.url,
              en: rawTip.en.url,
              se: rawTip.sv.url,
            },
            environmentEffect: {
              fi: rawTip.fi.environment_effect,
              en: rawTip.en.environment_effect,
              se: rawTip.sv.environment_effect,
            },
          };
        } else {
          throw new Error('Parameters not matching. Tips not fetched.');
        }
      });
      resolve(tips);
    });
  });
}
