import { dimensions } from './constants';

export const getDimensionValue = (value) => Math.round(value / dimensions.unit);
export const getDimensionValueXY = ({ x, y }) => ({
  x: getDimensionValue(x),
  y: getDimensionValue(y),
});

export const getPixelValue = (value) => value * dimensions.unit;
export const getPixelValueXY = ({ x, y }) => ({
  x: getPixelValue(x),
  y: getPixelValue(y),
});
