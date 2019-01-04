export const GetTrainType = (t: string) => {
  const type = t.toLowerCase();
  switch (type) {
    case 's': {
      return 'train sbahn blue';
    }
    case 'bus': {
      return 'bus blue';
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
export const GetTrainLabel = (l: string) => {
  let label = l;
  // Remove contet after whitespace
  label = label.substr(0, label.indexOf(' '));
  return label;
};
