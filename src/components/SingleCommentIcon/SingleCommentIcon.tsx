import React from "react";

interface SingleCommentIconProps {
  handleCommentIconClicked: any;
}

const SingleCommentIcon: React.FC<SingleCommentIconProps> = (props) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      onClick={props.handleCommentIconClicked}
    >
      <title>comment-single</title>
      <path d="M18.31,14.19A2.31,2.31,0,1,1,16,11.88,2.31,2.31,0,0,1,18.31,14.19ZM8.76,11.88a2.31,2.31,0,1,0,2.31,2.31A2.31,2.31,0,0,0,8.76,11.88Zm14.49,0a2.31,2.31,0,1,0,2.31,2.31A2.31,2.31,0,0,0,23.25,11.88ZM31,14.19c0,7.27-6.72,13.18-15,13.18-0.49,0-1,0-1.54-.08l-8,4v-7A12.55,12.55,0,0,1,1,14.19C1,6.92,7.73,1,16,1S31,6.92,31,14.19Zm-2.81,0C28.18,8.47,22.72,3.82,16,3.82S3.82,8.47,3.82,14.19A10,10,0,0,0,9,22.62l0.24,0.15V27l4.5-2.25a0.37,0.37,0,0,1,.18-0.09l0,0h0l0.22,0v0H16C22.72,24.56,28.18,19.91,28.18,14.19Z" />
    </svg>
  );
};

export default SingleCommentIcon;
