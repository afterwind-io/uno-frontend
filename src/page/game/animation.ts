import Anime from 'animejs';

export function takeCard(): Promise<void> {
  return Anime({
    targets: '#spirit-last-deal',
    scale: [
      { value: 1, duration: 0 },
      { value: 0, duration: 1500 },
    ],
    translateY: [
      { value: '40vh', duration: 0 },
      { value: 0, duration: 1500 },
    ],
    opacity: [
      { value: 1, duration: 0 },
      { value: 0, duration: 1500 },
    ],
    elasticity: 0,
  }).finished;
}

export function dealCard(): Promise<void> {
  return Anime({
    targets: '#spirit-last-deal',
    scale: [
      { value: 0, duration: 0 },
      { value: 1, duration: 1500 },
    ],
    translateY: [
      { value: 0, duration: 0 },
      { value: '40vh', duration: 1500 },
    ],
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 1500 },
    ],
    elasticity: 0,
  }).finished;
}
