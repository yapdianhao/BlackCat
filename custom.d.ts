declare module "*.svg" {
  // import React = require('react');
  // export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  // export const src: string;

  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.scss";
