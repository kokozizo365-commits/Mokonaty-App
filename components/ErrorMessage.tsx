import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border-r-4 border-red-500 text-red-800 p-4 rounded-lg my-4" role="alert">
      <p className="font-bold">حدث خطأ</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;