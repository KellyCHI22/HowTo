import { useEffect } from 'react';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  rows: number
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = `${40 + 24 * (rows - 1)}px`;
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
