import { List as IList, Map as IMap, OrderedSet as IOrderedSet, Set as ISet } from 'immutable';

import Config from '../../config/Config';

const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

function sheetNamesUrl() {
  return `${apiUrl}${Config.get('spreadSheetId')}/sheets?key=${Config.get('googleApiKey')}`;
}

function sheetValuesUrl(sheetNames) {
  const ranges = sheetNames.map(n => `${n}!B2:K`).join('&ranges=');
  return `${apiUrl}${Config.get('spreadSheetId')}/values:batchGet?key=${Config.get('googleApiKey')}&ranges=${ranges}`;
}

function parseSheetNames(result) {
  return IList().withMutations(collection => {
    if (result && result.sheets) {
      result.sheets.forEach(sheet => {
        if (sheet.properties && sheet.properties.title) {
          collection.push(sheet.properties.title);
        }
      });
    }
  });
}

function parseEntry(entry) {
  const trimmedEntry = entry.trim();
  if (trimmedEntry.length > 0) {
    const desc = trimmedEntry.split(':');
    if (desc.length > 0) {
      const value = parseFloat(desc[0]);
      const title = desc.length > 1 ? desc[1] : 'Untitled';
      const model = desc.length > 2 ? desc[2] : 'box';
      const color = desc.length > 3 ? desc[3] : 'tomato';
      return {
        color,
        model,
        title,
        value,
      };
    }
  }
  return null;
}

function parseSheetsData(result) {
  return IList().withMutations(collection => {
    const valueRanges = result.valueRanges;
    if (valueRanges && valueRanges.length > 0) {
      const maxlen = valueRanges.length;
      valueRanges[0].values.forEach((row, z) => {
        row.forEach((entry, x) => {
          const first = parseEntry(entry);
          if (first) {
            let element = IMap({
              colors: IList([first.color]),
              models: IList([first.model]),
              titles: IList([first.title]),
              values: IList([first.value]),
              x,
              z,
            });
            for (let i = 1; i < maxlen; ++i) {
              const vals = valueRanges[i].values;
              if (vals[z] && vals[z][x]) {
                const ent = parseEntry(vals[z][x]);
                if (ent) {
                  element = element.withMutations(el => {
                    el.update('colors', c => c.push(ent.color));
                    el.update('models', m => m.push(ent.model));
                    el.update('titles', t => t.push(ent.title));
                    el.update('values', v => v.push(ent.value));
                  });
                }
              }
            }
            collection.push(element);
          }
        });
      });
    }
  });
}

export default function (resCb) {
  gapi.load('client', () => {  // eslint-disable-line no-undef
    gapi.client.setApiKey(Config.get('googleApiKey')); // eslint-disable-line no-undef
    gapi.client.load('sheets', 'v4').then(() => { // eslint-disable-line no-undef
      gapi.client.sheets.spreadsheets.get({ // eslint-disable-line no-undef
        spreadsheetId: Config.get('spreadSheetId'),
      }).then(resp => {
        console.log('resp', resp);
        const sheetNames = parseSheetNames(resp.result);
        // const ranges = sheetNames.map(n => `${n}!B2:K`).join('&ranges=');
        const ranges = sheetNames.map(n => `${n}!B2:K`);
        gapi.client.sheets.spreadsheets.values.batchGet({ // eslint-disable-line no-undef
          spreadsheetId: Config.get('spreadSheetId'),
          ranges: ranges.toJS(),
        }).then(valResp => {
          console.log('valResp', valResp);
          const sheetsData = parseSheetsData(valResp.result);
          resCb(sheetsData);
        }, err => {
          console.error(err); // eslint-disable-line no-console
        });
      }, err => {
        console.error(err); // eslint-disable-line no-console
      });
    });
  });
}
