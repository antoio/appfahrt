export const GetTrainType = (t: string, o: string = '') => {
  const type = t.toLowerCase();
  const operator = o.toLowerCase();
  switch (type) {
    case 's': {
      return 'train sbahn blue';
    }
    case 'bus': {
      return (operator === 'pag') ? 'bus yellow' : 'bus blue';
    }
    case 'nfb': {
      return 'bus blue';
    }
    case 're': {
      return 'train outlined-red';
    }
    case 'ir': {
      return 'train red';
    }
    case 'vae': {
      return 'train red';
    }
    case 'ic': {
      return 'train red';
    }
    default : return '';
  }
};
const hideNumberWhenCategory = ['re', 'ic', 'ir'];
export const GetTrainLabel = (cat: string, number: string = '') => {
  let label = cat;
  if (number !== '' && (hideNumberWhenCategory.indexOf(cat.toLowerCase()) === -1)) {
    label = cat + ' ' + number;
  }
  return label;
};
