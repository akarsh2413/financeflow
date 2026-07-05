const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-5 text-slate-600 font-medium">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;