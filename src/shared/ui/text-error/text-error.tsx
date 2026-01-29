'use client';

interface TextErrorProps {
  text: string;
}

export const TextError = ({ text }: TextErrorProps) => {
  return <p className="text-error px-4 py-8 text-center text-4xl">{text}</p>;
};
