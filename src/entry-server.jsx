import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Skeleton from "./Skeleton";

export async function render(url, context) {
  return Skeleton();
}